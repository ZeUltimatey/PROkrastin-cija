<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LocationController extends Controller
{
    
    private array $validationRules = [
        'city' => 'required|string|max:255',
        'street' => 'required|string|max:255',
        'apartment_number' => 'nullable|string|max:255',
        'locationName' => 'nullable|string|max:255',
        'zip_code' => 'required|string|max:255'
    ];

    /**
     * Show all locations.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index_all(): JsonResponse
    {
        // Fetch all locations
        $locations = Location::all();

        return response()->json($locations);
    }

    /**
     * Show all locations for the user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        // Get the ID of the authenticated user
        $userId = Auth::user()->id;

        // Fetch all locations that belong to the authenticated user
        $location = Location::where('creator_id', $userId)->get();
        $location->makeHidden(['creator_id']);

        // Return the filtered records as a JSON response
        return response()->json($location);
    }

    /**
     * Show one location.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        // Find location information by id
        $location = Location::find($id);

        if (!$location) { return response()->json(null, 404); } // Not found
        $location->makeHidden(['creator_id']);

        // Check if the user owns the location
        $userId = Auth::user()->id;
        if ($location->creator_id != $userId) { return response()->json(null, 403); } // Forbidden

        if ($location) { return response()->json($location, 200); } // OK
        else { return response()->json(null, 404); } // Not found
    }

    /**
     * Store a new location.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validator for checking filled information
        $validator = Validator::make($request->all(), $this->validationRules);

        // Return an error if the information is not valid fr
        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422); // Unprocessable entity
        }

        // Append the current user id
        $userId = Auth::user()->id;
        $info = $validator->validated();
        $info["creator_id"] = $userId;

        // Create location record if everything is correct
        $location = Location::create($info);
        return response()->json($location, 201); // Content created
    }

    /**
     * Update the information of a location.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        // Validator for checking filled information
        $validator = Validator::make($request->all(), $this->validationRules);

        // Return an error if the information is not valid fr
        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422); // Unprocessable entity
        }

        // Update and return location if everything is correct
        $location = Location::findOrFail($id);

        // Check if the user owns the location
        $userId = Auth::user()->id;
        if ($location->creator_id != $userId) { return response()->json(null, 403); } // Forbidden

        $location->update($validator->validated());
        $location->makeHidden(['creator_id']);
        return response()->json($location, 202); // Request accepted
    }

    /**
     * Remove location.
     *
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        // Find and delete location by id
        $location = Location::findOrFail($id);
        $location->delete();
        return response()->json(true, 202); // Request accepted
    }
}
