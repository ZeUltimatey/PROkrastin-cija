<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocationRequest;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use App\Services\ValidationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LocationController extends Controller
{
    /**
     * Show all locations.
     */
    public function index_all()
    {
        // Fetch all locations
        $location_models = Location::all();
        return LocationResource::collection($location_models)->each(function ($location) {
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
     */
    public function show(int $id)
    {
        // Find location information by id
        $location = LocationResource::find($id);
        if ($location->resource == null) { return response()->json(null, 404); } // Not found

        // Check if the user owns the location
        $user_id = Auth::user()->id;
        if ($location->creator_id != $user_id) { return response()->json(null, 403); } // Forbidden

        // Return the location
        return $location;
    }

    /**
     * Store a new location for yourself.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function store(LocationRequest $request)
    {
        // Get the location data
        $location_data = $request->all();

        // Append the creator id
        $user_id = Auth::user()->id;
        $location_data["creator_id"] = $user_id;

        // Create location record if everything is correct
        Location::create($location_data);
        return response()->json(null, 201); // Created
    }

    /**
     * Update the information of a location.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     */
    public function update(LocationRequest $request, int $id)
    {
        // Update and return location if everything is correct
        $location_model = Location::find($id);
        if ($location_model == null) { return response()->json(null, 404); } // Not found

        // Check if the user owns the location
        $user_id = Auth::user()->id;
        if ($location_model->creator_id != $user_id) { return response()->json(null, 403); } // Forbidden

        // Update the location
        $location_model->update($request->all());
        return response()->json(null); // OK
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
        $location_model = Location::find($id);
        if ($location_model == null) { return response()->json(null, 404); } // Not found

        // Delete the location
        $location_model->delete();
        return response()->json(null, 204); // No content
    }
}
