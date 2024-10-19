<?php

namespace App\Http\Controllers;

use App\Models\Cat;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;

class CatController extends Controller
{
    private array $validationRules = [
        'product_type'     => 'required|in:Unlisted,Cat,Accessory,Food,Furniture',
        'display_name'     => 'required|string|max:255',
        'description'      => 'required|string',
        'pricing'          => 'required|numeric|min:0',
        'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
        'stock'            => 'required|integer|min:0',
        'breed_id'         => 'required|exists:cat_breeds,id',
        'birthdate'        => 'required|date|before:today',
        'color'            => 'required|string|max:255',
    ];

    /**
     * Show all cats.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(Cat::all());
    }

    /**
     * Show a singular cat.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        // Find the cat by id
        $cat = Cat::find($id);

        if ($cat) { return response()->json($cat, 200); }
        else { return response()->json(null, 404); }
    }

    /**
     * Store a new cat.
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

        // Create product if everything is correct
        $cat = Cat::create($validator->validated());
        return response()->json($cat, 201);
    }

    /**
     * Update the information of a cat.
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

        // Update and return product if everything is correct
        $cat = Cat::findOrFail($id);
        $cat->update($validator->validated());
        return response()->json($cat, 201);
    }

    /**
     * Remove a cat.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        // Find and delete product by id
        $cat = Cat::findOrFail($id);
        $cat->delete();
        return response()->json(true, 200);
    }
}
