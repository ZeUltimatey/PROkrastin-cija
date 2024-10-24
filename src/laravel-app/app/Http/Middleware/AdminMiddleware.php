<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated and has the role of 'Admin'
        if (Auth::check() && Auth::user()->user_role === 'Admin') {
            return $next($request); // Allow the request to proceed
        }

        // Return a forbidden response if the user is not an admin
        return response()->json(['error' => 'Administrators only'], 403);
    }
}
