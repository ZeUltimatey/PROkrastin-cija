<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(Request $request, $id, $hash)
    {
        // Verify the email address
        $user = User::find($id);
        if ($user->markEmailAsVerified()) {
            // Email verified successfully
            return redirect()->route('home')->with('success', 'Email verified successfully!');
        } else {
            // Email verification failed
            return redirect()->route('home')->with('error', 'Email verification failed!');
        }
    }
}
