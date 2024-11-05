<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    /**
     * 
     * 
     * 
     * USER FUNCTIONS FOR ADMINS
     * 
     * 
     * 
     */

    
     /**
     * Update user information as admin.
     */
    public function update(Request $request, int $id)
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

        return response()->json(['message' => "User successfully updated"], 200);
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

}
