<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Resources\UserResource;
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
            $search_deactivated = $request->deactivated === 'true';
            $query->where('deactivated', $search_deactivated);
        }

        // Filter by keyword in display_name or description (if provided)
        if ($request->has('keyword')) {
            $keyword = strtolower(str_replace(' ', '', $request->keyword)); // Convert keyword to lowercase and remove spaces

            $query->where(function($q) use ($keyword) {
                $q->whereRaw("LOWER(REPLACE(REPLACE(display_name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(name, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(surname, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"])
                    ->orWhereRaw("LOWER(REPLACE(REPLACE(email, ' ', ''), '.', '')) LIKE ?", ["%$keyword%"]);
            });
        }

        // Set the default number of records per page to 12 if not provided
        $perPage = $request->get('per_page', 12);  // Default to 12 records per page

        // Get paginated results
        $products = $query->paginate($perPage);

        // Append current request parameters to pagination links
        $products->appends($request->except('page'));

        // Return paginated products as a resource collection
        return UserResource::collection($products);
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
            'email'             => $user_data['email'],
            'password'          => Hash::make($user_data['password']),
            'display_name'      => $user_data['display_name'],
            'name'              => $user_data['name'],
            'surname'           => $user_data['surname'],
            'phone_number'      => $user_data['phone_number'] ?? null,
            'user_role'         => $user_data['user_role'] ?? 'User',
            'deactivated'       => false,
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
        if (!$success) { return response()->json(['error' => 'Invalid credentials'], 401); } // Unauthorized

        // Check if the user is banned
        $user_model = Auth::user();
        $user = new UserResource($user_model);
        if ($user['deactivated']) { return response()->json(['error' => 'Jūsu profils ir bloķēts, ja uzskatāt, ka tā ir kļūda, sazinieties ar administratoru!'], 403); } // Forbidden

        // Create token on successful login
        $token = $user_model->createToken('auth_token', expiresAt:now()->addDay())->plainTextToken;

        // Return user and token
        $user = new UserResource($user_model);
        $user->with_extra_information();
        return response()->json(['user' => $user, 'token' => $token], 200); // OK
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(null, 200); // OK
    }

    /**
     * Show a single user.
     */
    public function show(int $id) {
        // Find the user by id
        $user = UserResource::find($id, true);
        if ($user->resource == null) { return response()->json(null, 404); } // Not found

        // Return the user
        return $user;
    }

    /**
     * Update other user information.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        if ($request->input('display_name') === $user->display_name) {
            $request->request->remove('display_name');
        }
        if ($request->input('email') === $user->email) {
            $request->request->remove('email');
        }
        $validator = Validator::make($request->all(), [
            'email'                 => 'sometimes|string|email|unique:users|max:255',
            'password'              => 'nullable|string|min:8|confirmed',
            'password_confirmation' => 'nullable|same:password',
            'display_name'          => 'sometimes|string|unique:users|max:255',
            'name'                  => 'nullable|string|max:255',
            'surname'               => 'nullable|string|max:255',
            'phone_number'          => 'nullable|string|max:15',
            'user_role'             => 'nullable|in:User,Admin',
            'deactivated'           => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user->update($validator->validated());

        return response()->json(['message' => "User successfully updated"], 202);
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
        if ($user_model == null) { return response()->json(null, 401); } // Unauthorized

        // Delete the token on the way out
        Auth::user()->tokens()->delete();

        // Delete the user
        $user_model->delete();
        return response()->json(null, 204); // No content
    }

    /**
     * Change own user information.
     */
    public function change(Request $request)
    {
        //
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

    public function removeProfilePicture(){
        $user = Auth::user();
        $oldImagePath = str_replace('/storage/', '', $user->image_url);
        Storage::disk('public')->delete($oldImagePath);
        $user->image_url = '';
        return response()->json(true, 204);

    }


    public function basketPayment (Request $request) {
        $user = Auth::user();
        // $stripePriceId = 'price_1QJk5qG6wIBbt2iyeYY9aBEV';
        // $quantity = 1;
        $basketProducts = SelectedProducts::where('user_id', $user->id)->get();

        $order = array();
        foreach ($basketProducts as $basketProduct) {
            $order[$basketProduct->product->price_id] = $basketProduct->amount;
        }

        $session = $user->checkout($order, [
            'success_url' => route('checkout-success'),
            'cancel_url' => route('checkout-cancel'),
            'metadata' => ['user_id' => $user->id],
        ]);
        $user = Auth::user();
        $basketProducts = SelectedProducts::where('user_id', $user->id)->get();
    foreach ($basketProducts as $basketProduct) {
        $basketProduct->product->stock -= $basketProduct->amount;
        $basketProduct->product->save(); //TODO add this to transaction history before deleting
        $basketProduct->delete();
    }

        return  response()->json(['url' => $session->url], 200);
    }


    public function tt (Request $request) {
        $user = Auth::user();
        $basketProducts = SelectedProducts::where('user_id', $user->id)->get();
        foreach ($basketProducts as $basketProduct) {
            $basketProduct->product->stock -= $basketProduct->amount;
            $basketProduct->product->save();

            $basketProduct->delete();
            dd($basketProducts);
        }

    }
    public function successPaid (Request $request) {
        $sessionId = $request->get('session_id');
        if ($sessionId === null) {
        //     $user = Auth::user();
        //     $basketProducts = SelectedProducts::where('user_id', $user->id)->get();
        // foreach ($basketProducts as $basketProduct) {
        //     $basketProduct->product->stock -= $basketProduct->amount;
        //     $basketProduct->product->save(); //TODO add this to transaction history before deleting
        //     $basketProduct->delete();
        // }
        //return redirect()->to(env('FRONTEND_URL'))->with('run_route', 'clear-basket-after-payment');
            return redirect()->to(env('FRONTEND_URL'));
        }

        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

        if ($session->payment_status !== 'paid') {

            return redirect()->to(env('FRONTEND_URL'));
        }

        $orderId = $session['metadata']['order_id'] ?? null;

        $order = Order::findOrFail($orderId);

        $order->update(['status' => 'completed']);

        $basketProducts = SelectedProducts::where('user_id', $user->id)->get();
        foreach ($basketProducts as $basketProduct) {
            $basketProduct->product->stock -= $basketProduct->amount;
            $basketProduct->product->save(); //TODO add this to transaction history before deleting
            $basketProduct->delete();
        }

        return redirect()->to(env('FRONTEND_URL'));
    }

    public function failedPaid (Request $request) {
        $sessionId = $request->get('session_id');
        if ($sessionId === null) {
            return redirect()->to(env('FRONTEND_URL'));
        }

        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

        if ($session->payment_status !== 'paid') {
            return redirect()->to(env('FRONTEND_URL'));        }

        $orderId = $session['metadata']['order_id'] ?? null;

        $order = Order::findOrFail($orderId);

        $order->update(['status' => 'cancelled']);

        return redirect()->to(env('FRONTEND_URL'));    // redirect uz failed
    }
}
