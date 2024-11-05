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
            $user = Auth::user();
            if ($user->deactivated) {
                return response()->json(['error' => 'Jūsu profils ir bloķēts, ja uzskatāt, ka tā ir kļūda, sazinieties ar administratoru!'], 401); // If $user->deactivated {
            }
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
    // Display a single user
    public function show(int $id){
        
        $user = User::find($id);

        if ($user) { return response()->json($user); } // OK
        else { return response()->json(null, 404); } // Not found
    }

    /**
     * Update user information.
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

        return response()->json(['message' => "User successfully updated"], 200);
    }


    /**
     * Delete a user.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();
        Auth::user()->tokens()->delete();
        if ($user) {
            $user->delete();
            return response()->json(['message' => "User successfully deleted"], 200);
        } else {
            return response()->json(null, 404);
        }
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
