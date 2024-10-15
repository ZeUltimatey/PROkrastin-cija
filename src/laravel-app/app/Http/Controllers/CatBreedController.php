<?php

namespace App\Http\Controllers;

use App\Models\CatBreed;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;

class CatBreedController extends Controller
{
    private array $validationRules = [
        'attachments_id'    => 'nullable|integer|exists:attachment_groups,id',
        'display_name'      => 'required|string|max:255',
        'breed_information' => 'required|text',
    ];

    /**
     * Show all cat breeds.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(Catbreed::all());
    }

    /**
     * Show a singular cat breed.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        // Find the cat breed by id
        $cat_breed = CatBreed::find($id);

        if ($cat_breed) { return response()->json($cat_breed, 200); }
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
        return response()->json('Cat breed deleted successfully', 200);
    }
}
