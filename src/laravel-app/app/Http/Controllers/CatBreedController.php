<?php

namespace App\Http\Controllers;

use App\Http\Resources\CatBreedResource;
use App\Models\Cat;
use App\Models\CatBreed;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;

class CatBreedController extends Controller
{
    private array $validationRules = [
        'display_name'      => 'required|string|max:255',
        'feeding_info'      => 'required|string|max:65535',
        'personality_info'  => 'required|string|max:65535',
        'environment_info'  => 'required|string|max:65535',
        'tips_info'         => 'required|string|max:65535',
    ];

    /**
     * Show all cat breeds.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return CatBreedResource::collection(CatBreed::all());
    }

    /**
     * Show a singular cat breed.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        // Find the cat breed by id
        $cat_breed = CatBreed::find($id);

        if ($cat_breed) { return new CatBreedResource($cat_breed); }
        else { return response()->json(null, 404); }
    }

    /**
     * Store a new cat breed.
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
            return response()->json($errors, 422);
        }

        // Create cat breed if everything is correct
        $cat_breed = CatBreed::create($validator->validated());
        return response()->json($cat_breed, 201);
    }

    /**
     * Update the information of a cat breed.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        // Validator for checking filled information
        $validator = Validator::make($request->all(), $this->validationRules);

        // Return an error if the information is not valid fr
        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422);
        }

        // Update and return cat breed if everything is correct
        $cat_breed = CatBreed::findOrFail($id);
        $cat_breed->update($validator->validated());
        return response()->json($cat_breed, 201);
    }

    /**
     * Remove a cat breed.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        // Find and delete cat breed by id
        $cat_breed = CatBreed::findOrFail($id);
        $cat_breed->delete();
        return response()->json(true, 200);
    }
}
