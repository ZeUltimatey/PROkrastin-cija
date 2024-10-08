<?php

namespace App\Http\Controllers;

use App\Models\User;
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
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a new user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        // Create a validator instance
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

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); // Unprocessable Entity
        }

        // Proceed with user creation if validation passes
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

        // Create a token for the user
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


        /**
        * $existingToken = DB::table('personal_access_tokens') // TODO: cannot find personal_access_tokens??
        *     ->where('tokenable_id', $user->id)
        *     ->where('name', 'funny_token_hihi_haha')
        *     ->first();
        *
        * if ($existingToken) {
        *     // If the token exists, return it
        *     $token = $existingToken->plainTextToken;
        * } else {
        *     // If the token does not exist, create a new one
        *     $token = $user->createToken($tokenName)->plainTextToken;
        * }
        */


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
