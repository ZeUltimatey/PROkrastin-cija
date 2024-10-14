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
use Psy\Util\Json;

class UserController extends Controller
{
    /**
     * Show all user.s
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
            'profilepicture_id' => 'nullable|exists:images,image_id',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|same:password',
            'display_name' => 'required|string|max:255',
            'name' => 'required|string|max:255', // added name and surrname because frontend
            'surname' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:15', // temp nullable because frontend
            'user_role' => 'nullable|in:User,Admin',
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
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'display_name' => $request->display_name,
            'name' => $request->name,
            'surname' => $request->surname,
            'phone_number' => $request->phone_number,
            'user_role' => $request->user_role ?? 'User',
            'deactivated' => false,
        ]);

        // Create an authentification token for the user
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

        // $user = User::where('email', $validatedData['email'])->first();

        /**
        * if (!$user || !Hash::check($validatedData['password'], $user->password)) {
        *    return response()->json(['error' => 'Invalid credentials'], 401);
        * }
        */
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

    public function add_to_basket(int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        return response()->json($user->add_to_basket(), 200);
    }

    public function get_basket(int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        return response()->json($user->get_basket(), 200);
    }
}
