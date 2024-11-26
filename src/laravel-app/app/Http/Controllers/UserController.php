<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Requests\TransactionRequest;
use App\Http\Requests\UserPreferencesRequest;
use App\Http\Resources\UserResource;
use App\Models\BoughtProduct;
use App\Models\Transaction;
use App\Services\PaginateService;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\SelectedProductController;
use App\Models\SelectedProduct;
use App\Models\Product;
use Laravel\Cashier\Cashier;
use App\Models\SelectedProducts;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use App\Jobs\SendEmailVerification;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\Http\Controllers\AuthenticatedSessionController;

class UserController extends Controller
{
    /**
     * Show all users.
     */
    public function index(Request $request)
    {
        // Initialize a query builder for the Product model
        $query = User::query();
        $query->where('user_role', 'LIKE', 'User');

        if ($request->has('deactivated')) {
            $query->where('deactivated', $request->deactivated === 'true');
        }

        if ($request->has('deleted')) {
            $query->where('deleted', $request->deleted === 'true');
        }

        // Filter by keyword in display_name or description (if provided)
        if ($request->has('keyword')) {
            $keyword = strtolower(str_replace(' ', '', $request->keyword)); // Convert keyword to lowercase and remove spaces

            $query->where(function ($q) use ($keyword) {
                $q->whereRaw("LOWER(REPLACE(REPLACE(display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(surname, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(email, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"]);
            });
        }

        $user_models = $query->get();
        $users = UserResource::collection($user_models)->each(function ($user) {
            $user->with_extra_information();
        });

        $paginate = new PaginateService($request, [$users]);
        $per_page = $request->get('per_page', 12);
        $page = $request->get('page', 1);

        return $paginate->get_page($page, $per_page);
    }

    /**
     * Register and store a new user.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function register(RegisterUserRequest $request)
    {
        // Sense
        $user_data = $request->all();

        // Create the new user  //TODO user request
        $new_user_model = User::create([
            'email' => $user_data['email'],
            'password' => Hash::make($user_data['password']),
            'display_name' => $user_data['display_name'],
            'name' => $user_data['name'],
            'surname' => $user_data['surname'],
            'phone_number' => $user_data['phone_number'] ?? null,
            'user_role' => $user_data['user_role'] ?? 'User'
        ]);

        // Return response with user data and token
        $new_user = new UserResource($new_user_model);
        $new_user->with_extra_information();

        // Email verification
        dispatch(new SendEmailVerification($new_user_model));

        // Return new user
        return $new_user;
    }

    /**
     * Login an existing user.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function login(LoginUserRequest $request)
    {
        // Sense
        $login_credentials = $request->all();

        // Attempt to login
        $success = Auth::attempt($login_credentials);
        if (!$success) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        } // Unauthorized

        // Check if the user has verified the email and is not deactivated or deleted
        $user_model = Auth::user();
        $user = new UserResource($user_model);
        if ($user['email_verified_at'] === null) {
            dispatch(new SendEmailVerification($user_model));
            return response()->json(['error' => 'E-pasts nav verificēts, lūdzu verificējiet savu e-pastu, tad mēģiniet vēlreiz!'], 403);
        } // Forbidden
        if ($user['deleted']) {
            return response()->json(['error' => 'Dzēsts profils'], 403);
        } // Forbidden
        if ($user['deactivated']) {
            return response()->json(['error' => 'Jūsu profils ir bloķēts, ja uzskatāt, ka tā ir kļūda, sazinieties ar administratoru!'], 403);
        } // Forbidden

        // Create token on successful login
        $token = $user_model->createToken('auth_token', expiresAt: now()->addDay())->plainTextToken;

        // Return user and token
        $user = new UserResource($user_model);
        $user->with_extra_information();
        return response()->json(['user' => $user, 'token' => $token], 200); // OK
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(null, 200); // OK
    }

    /**
     * Show a single user.
     */
    public function show(int $id)
    {
        // Find the user by id
        $user = UserResource::find($id, true);
        if ($user->resource == null) {
            return response()->json(null, 404);
        } // Not found

        // Return the user
        return $user;
    }

    /**
     * Update other user information.
     */
    public function update(Request $request) // paroli te nevar mainīt, ja epastu maina parbaudīt paroli
    {
        $user = Auth::user();
        if ($request->input('display_name') === $user->display_name) {
            $request->request->remove('display_name');
        }
        if ($request->input('email') === $user->email) {
            $request->request->remove('email');
        }
        $validator = Validator::make($request->all(), [
            'email' => 'sometimes|string|email|unique:users|max:255',
            'display_name' => 'sometimes|string|unique:users|max:255',
            'name' => 'nullable|string|max:255',
            'surname' => 'nullable|string|max:255',
            'phone_number' => 'nullable|string|max:15',
            'user_role' => 'nullable|in:User,Admin',
            'deactivated' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $validatedData = $validator->validated();
        // send verify if email was changed
        if (isset($validatedData['email'])) {
            if (Hash::check($request->password, $user->password)) {
                $user->update($validator->validated());
                $user->update(['email_verified_at' => null]);
                dispatch(new SendEmailVerification($user));
                return response()->json(['message' => "Lietotājs veiksmīgi atjaunots, lūdzu verificējiet savu e-pastu!"], 202);
            } else { // if password is wrong
                return response()->json(['message' => 'Ievadītā parole nav pareiza'], 422);
            }
        } else {
            $user->update($validator->validated());
        }

        return response()->json(['message' => "Lietotājs veiksmīgi atjaunots!"], 202);
    }

    public function resend_verification(Request $request)
    {
        $user = Auth::user();
        dispatch(new SendEmailVerification($user));
        return response()->json(['message' => "Verifikācijas e-pasts nosūtīts!"], 202);
    }

    public function change_password(ChangePasswordRequest $request)
    {
        $user_model = Auth::user();
        $user = new UserResource($user_model);
        if (!Hash::check($request->old_password, $user->password))
            return response()->json(['error' => 'Old password is wrong.'], 422);
        if (Hash::check($request->new_password, $user->password))
            return response()->json(['error' => 'New password is the same as the old password.'], 422);
        $user->update(['password' => $request->new_password]);
        return response()->json(null, 202); // Request accepted
    }

    /**
     * Get own user.
     */
    public function get()
    {
        // Get logged in user
        $user = new UserResource(Auth::user());
        $user->with_extra_information();

        // Return the user
        return $user;
    }

    /**
     * Delete a user.
     */
    public function destroy()
    {
        // Check if we're logged in
        $user_model = Auth::user();
        if ($user_model == null) {
            return response()->json(null, 401);
        } // Unauthorized

        // Delete the token on the way out
        Auth::user()->tokens()->delete();

        // Delete the user
        $user_model->update(['deleted' => true]);
        return response()->json(null, 204); // No content
    }

    public function preferences(UserPreferencesRequest $request)
    {
        $user_model = Auth::user();

        $update_preferences = [];
        $keys = ['display_lowest_price',
            'display_only_available',
            'recieve_notifications'];

        foreach ($keys as $key)
            if (array_key_exists($key, $request->all()) && $request[$key] !== null)
                $update_preferences[$key] = $request[$key];

        $user_model->update($update_preferences);
        $user = new UserResource(Auth::user());
        $user->with_extra_information();
        $current_preferences = [
            (bool)$user->display_lowest_price,
            (bool)$user->display_only_available,
            (bool)$user->recieve_notifications
        ];
        return response()->json($current_preferences, 200); // OK
    }

    public function addProfilePicture(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $user = Auth::user();
        $oldImagePath = str_replace('/storage/', '', $user->image_url);
        Storage::disk('public')->delete($oldImagePath);
        $path = $request->file('image')->store('images/profile', 'public');
        $user->image_url = Storage::url($path);
        $user->save();

        return $user;

    }

    public function removeProfilePicture()
    {
        $user = Auth::user();
        $user->image_url = null;
        $user->save();
        $oldImagePath = str_replace('/storage/', '', $user->image_url);
        Storage::disk('public')->delete($oldImagePath);
        $user->image_url = '';
        return response()->json(true, 204);
    }

    public function basketPayment(Request $request)
    {
        $user = Auth::user();
        // $stripePriceId = 'price_1QJk5qG6wIBbt2iyeYY9aBEV';
        // $quantity = 1;
        $basketProducts = SelectedProducts::where('user_id', $user->id)->get();

        $order = array();
        foreach ($basketProducts as $basketProduct)
            $order[$basketProduct->product->price_id] = $basketProduct->amount;

        $session = $user->checkout($order, [
            'success_url' => route('checkout-success') . '?session_id={CHECKOUT_SESSION_ID}' . '&user_id=' . $user->id,
            'cancel_url' => route('checkout-cancel'),
            'metadata' => ['user_id' => $user->id],
        ]);

        return response()->json(['url' => $session->url], 200);
    }


    public function tt(Request $request)
    {
        $user = Auth::user();
        $basketProducts = SelectedProducts::where('user_id', $user->id)->get();
        foreach ($basketProducts as $basketProduct) {
            $basketProduct->product->stock -= $basketProduct->amount;
            $basketProduct->product->save();

            $basketProduct->delete();
            dd($basketProducts);
        }

    }

    public function successPaid(TransactionRequest $request)
    { // TODO: ^ TransactionRequest ^ does not have complete validation for session id and user id
        // Sense
        $user_id = (int)$request->get('user_id');
        $location_id = $request->get('location_id') !== null ?
            (int)$request->get('location_id') : null;

        // Get user
        $user = User::find($user_id);

        // Check for a valid session
        $sessionId = $request->get('session_id');
        if ($sessionId === null)
            return redirect()->to(env('FRONTEND_URL'));

        // Check if the payment has been completed
        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);
        if ($session->payment_status !== 'paid')
            return redirect()->to(env('FRONTEND_URL'));

        // Get transaction summary
        $basket_item_models = SelectedProducts::with('product')
            ->where('user_id', $user_id)
            ->get();
        $transaction_total_sum = 0;
        $cache_basket_items = []; // id, item_price, total_for_current_item (required when creating BoughtProduct model)
        foreach ($basket_item_models as $basket_item) {
            // Sense the price to pay and total
            $item_price = $basket_item->product->discount_pricing !== null ?
                $basket_item->product->discount_pricing : $basket_item->product->pricing;
            $total_price_for_current_item = $item_price * $basket_item->amount;

            // Summarize
            $transaction_total_sum += $total_price_for_current_item;
            $cache_basket_items[$basket_item->id] = [
                'item_price' => $item_price,
                'total_for_current_item' => $total_price_for_current_item
            ];
        }

        // Create a transaction before proceeding with handout
        $transaction_model = Transaction::create([
            'transactor_id' => $user_id,
            'location_id'   => $location_id,
            'total_pricing' => $transaction_total_sum,
            'check_content' => 'Thank you for shopping at Murrātava!' //
        ]);
        $transaction_id = $transaction_model->id;

        // Update history and stock based on basket items
        $basket_item_models = SelectedProducts::with('product')
            ->where('user_id', $user->id)
            ->get();
        foreach ($basket_item_models as $basket_item) {
            // Get the previously calculated prices for each basket item
            $item_price =                   $cache_basket_items[$basket_item->id]['item_price'];
            $total_price_for_current_item = $cache_basket_items[$basket_item->id]['total_for_current_item'];

            // After transaction has been created we can finally save bought products to the database w/transaction_id
            BoughtProduct::create([
                'product_id'        => $basket_item->product_id,
                'transaction_id'    => $transaction_id,
                'display_name'      => $basket_item->product->display_name,
                'amount'            => $basket_item->amount,
                'price_per_product' => $item_price,
                'total_price'       => $total_price_for_current_item
            ]);

            // Update stock and clear basket items
            $basket_item->product->stock -= $basket_item->amount;
            $basket_item->product->save();
            $basket_item->delete();
        }

        return redirect()->to(env('FRONTEND_URL'));
    }

    public function failedPaid(Request $request)
    {
        $sessionId = $request->get('session_id');
        if ($sessionId === null) {
            return redirect()->to(env('FRONTEND_URL'));
        }

        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

        if ($session->payment_status !== 'paid') {
            return redirect()->to(env('FRONTEND_URL'));
        }

        $orderId = $session['metadata']['order_id'] ?? null;

        $order = Order::findOrFail($orderId);

        $order->update(['status' => 'cancelled']);

        return redirect()->to(env('FRONTEND_URL'));    // redirect uz failed
    }
}
