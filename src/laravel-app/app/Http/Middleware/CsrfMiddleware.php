<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CustomCsrfMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the request method is POST, PUT, PATCH, or DELETE
        if ($request->isMethod('post') || $request->isMethod('put') || $request->isMethod('patch') || $request->isMethod('delete')) {
            // Check for the CSRF token in the request
            $token = $request->input('_token') ?: $request->header('X-CSRF-TOKEN');

            // Validate the CSRF token
            if (!$token || $token !== Session::token()) {
                return response()->json(['error' => 'CSRF token mismatch.'], 403);
            }
        }

        // Proceed to the next middleware or the request handler
        return $next($request);
    }
}
