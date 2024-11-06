<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Http\Resources\UserResource;
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
     */
    public function register(RegisterUserRequest $request)
    {
        // Sense
        $user_data = $request->all();

        // Create the new user
        $new_user_model = User::create([
            'email'             => $user_data['email'],
            'password'          => Hash::make($user_data['password']),
            'display_name'      => $user_data['display_name'],
            'name'              => $user_data['name'],
            'surname'           => $user_data['surname'],
            'phone_number'      => $user_data['phone_number'],
            'user_role'         => $user_data['user_role'] ?? 'User',
            'deactivated'       => false,
        ]);

        // Return response with user data and token
        $new_user = new UserResource($new_user_model);
        $new_user->with_extra_information();

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

        // Create a token for the user
        $user_model = Auth::user();
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
        $cUser = Auth::user();
        if ($request->input('display_name') === $cUser->display_name) {
            $request->request->remove('display_name');
        }
        if ($request->input('email') === $cUser->email) {
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

        $user = User::find($request->user()->id);

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

    /**
     * Ban or unban an user.
     */
    public function deactivate(Request $request, int $id)
    {
        // Find the user by id
        $user = User::find($id);

        // Check if the user exists
        if (!$user) {
            return response()->json(['error' => 'User not found.'], 404); // Not found
        }

        // Prevent deactivating Admin users
        if ($user->user_role === 'Admin') {
            return response()->json(['deactivated' => false], 403); // Forbidden
        }

        // Validate the request to ensure 'deactivate' is a boolean
        $request->validate([
            'deactivate' => 'required|boolean',
        ]);

        // Set the 'deactivated' field based on the 'deactivate' request
        $user->deactivated = $request->input('deactivate');

        // Save the updated user model
        $user->save();

        // Return the updated user state
        return response()->json(['deactivated' => $user->deactivated], 200); // OK
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
