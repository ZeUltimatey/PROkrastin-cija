<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;

class ProductController extends Controller
{
    private array $validationRules = [
        'product_type'     => 'required|in:UNLISTED,CATS,FOOD,CARE,TOYS,FURNITURE,ACCESSORIES',
        'display_name'     => 'required|string|max:255',
        'description'      => 'required|string',
        'pricing'          => 'required|numeric|min:0',
        'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
        'stock'            => 'required|integer|min:0',
    ];

    /**
     * Show all products.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(Product::all());
    }

    /**
     * Show a singular product.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        // Find the product by id
        $product = Product::find($id);

        if ($product) { return response()->json($product, 200); }
        else { return response()->json(null, 404); }
    }

    /**
     * Store a new product.
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
        $product = Product::create($validator->validated());
        return response()->json($product, 201);
    }

    /**
     * Update the information of a product.
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
        $product = Product::findOrFail($id);
        $product->update($validator->validated());
        return response()->json($product, 201);
    }

    /**
     * Remove a product.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        // Find and delete product by id
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json('Product deleted successfully', 200);
    }
}
