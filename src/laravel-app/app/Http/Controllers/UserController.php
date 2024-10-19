<?php

namespace App\Http\Controllers;

use App\Models\SelectedProducts;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
    public function index()
    {
        return response()->json(User::all());
    }

    /**
     * Register and store a new user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        // Validator for checking filled information
        $validator = Validator::make($request->all(), [
            'profilepicture_id'     => 'nullable|exists:images,id',
            'email'                 => 'required|string|email|max:255|unique:users',
            'password'              => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|same:password',
            'display_name'          => 'required|string|max:255',
            'name'                  => 'required|string|max:255', // added name and surname because frontend
            'surname'               => 'required|string|max:255',
            'phone_number'          => 'nullable|string|max:15', // temp nullable because frontend
            'user_role'             => 'nullable|in:User,Admin',
        ]);

        // Check if the data is valid fr
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); // Unprocessable Entity
        }

        // Proceed with user creation if information is valid fr
        $user = User::create([
            'profilepicture_id' => $request->profilepicture_id,
            'email'             => $request->email,
            'password'          => Hash::make($request->password),
            'display_name'      => $request->display_name,
            'name'              => $request->name,
            'surname'           => $request->surname,
            'phone_number'      => $request->phone_number,
            'user_role'         => $request->user_role ?? 'User',
            'deactivated'       => false,
        ]);

        // Create an authentication token for the user
        $token = $user->createToken('auth_token', expiresAt:now()->addDay())->plainTextToken;

        // Return response with user data and token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201); // HTTP status code 201 indicates resource creation
    }

    /**
     * Login an existing user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Check if entered information is valid
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);
        if (!Auth::attempt($validatedData)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        } else {
            // gonna change this
            $user = Auth::user();
            $token = $user->createToken('auth_token', expiresAt:now()->addDay())->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 200);
        }
    }

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(200);
    }

    /**
     * Show a singular user.
     */
    public function show(int $id)
    {
        //
    }

    /**
     * Update user information.
     */
    public function update(Request $request, int $id)
    {
        //
    }

    /**
     * Delete a user.
     */
    public function destroy(int $id)
    {
        //
    }

    public function update_basket_item(Request $request): JsonResponse
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|int|exists:products,id',
            'amount' => 'required|int|min:0',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); // Unprocessable Entity
        }

        // Get the authenticated user
        $user = Auth::user();

        // Update basket
        $updated = $user->update_basket_item($request->product_id, (int)$request->amount);
        if ($updated) { return response()->json($updated, 200); } // OK
        else { return response()->json(null, 422); } // Unprocessable entity
    }

    public function get_basket(): JsonResponse
    {
        // Get the authenticated user
        $user = Auth::user();

        return response()->json($user->get_basket(), 200); // OK
    }

    public function clear_basket(): JsonResponse
    {
        // Get the authenticated user
        $user = Auth::user();

        return response()->json($user->clear_basket(), 202); // Request accepted
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
}
