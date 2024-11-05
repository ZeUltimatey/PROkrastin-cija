<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationResource;
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
        'location_name' => 'nullable|string|max:255',
        'zip_code' => 'required|string|max:255'
    ];

    /**
     * Show all locations.
     */
    public function index_all()
    {
        // Fetch all locations
        return LocationResource::collection(Location::all())->each(function ($location) {
            $location->with_creator();
        });
    }

    /**
     * Show all locations for the user.
     */
    public function index()
    {
        // Get the ID of the authenticated user
        $userId = Auth::user()->id;

        // Fetch all locations that belong to the authenticated user
        $locations = Location::where('creator_id', $userId)->get();
        return LocationResource::collection($locations);
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

        if (!$location) {
            return response()->json(null, 404);
        } // Not found
        $location->makeHidden(['creator_id']);

        // Check if the user owns the location
        $userId = Auth::user()->id;
        if ($location->creator_id != $userId) {
            return response()->json(null, 403);
        } // Forbidden

        if ($location) {
            return response()->json($location, 200);
        } // OK
        else {
            return response()->json(null, 404);
        } // Not found
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
        if ($location->creator_id != $userId) {
            return response()->json(null, 403);
        } // Forbidden

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
