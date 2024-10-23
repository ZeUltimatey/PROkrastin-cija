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
        // Fetch all products where product_type is 'CATS', including related Cat and CatBreed
        $catProducts = Product::where('product_type', 'CATS')
            ->with(['cat', 'cat.cat_breed']) // Load the Cat relation and its CatBreed relation
            ->get();

        // Hide 'updated_at' for Product, and 'id', 'updated_at' for Cat and timestamps for CatBreed
        $catProducts->each(function ($product) {
            if ($product->cat) {
                $product->cat->makeHidden(['id', 'created_at', 'updated_at']); // Hide id and updated_at in Cat
                if ($product->cat->cat_breed) {
                    $product->cat->cat_breed->makeHidden(['created_at', 'updated_at']);
                }
            }
        });

        // Return the list of products with their associated Cat and CatBreed
        return response()->json($catProducts, 200); // OK
    }

//    /**
//     * Show a singular cat.
//     *
//     * @param int $id
//     * @return \Illuminate\Http\JsonResponse
//     */
//    public function show(int $id): JsonResponse
//    {
//        // Find the cat by id
//        $cat = Cat::find($id);
//
//        if ($cat) { return response()->json($cat, 200); }
//        else { return response()->json(null, 404); }
//    }

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

        // Return an error if the information is not valid
        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422); // Unprocessable Entity
        }

        // Extract product-related fields and add 'CATS' as product_type
        $productData = $request->only(['display_name', 'description', 'pricing', 'discount_pricing', 'stock']);
        $productData['product_type'] = 'CATS';  // Set product type to CATS

        // Create the Product
        $product = Product::create($productData);

        // Extract cat-specific fields
        $catData = $request->only(['breed_id', 'birthdate', 'color']);
        $catData['id'] = $product->id;  // Using the same ID as the Product

        // Create the Cat model
        $cat = Cat::create($catData);

        // Load the Cat relation and also eager load the CatBreed relation
        $product->load(['cat', 'cat.cat_breed']);

        // Hide 'id' and 'updated_at' in the Cat relation and 'updated_at' in the Product
        $product->makeHidden(['updated_at']);
        $product->cat->makeHidden(['id', 'updated_at']);
        $product->cat->cat_breed->makeHidden(['created_at', 'updated_at']); // Hide timestamps in CatBreed

        // Return the Product with its associated Cat and CatBreed
        return response()->json($product, 201); // Content Created
    }

    /**
     * Update the information of a cat.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        // Find the Product by ID
        $product = Product::find($id);

        // If product is not found, return 404
        if (!$product) { return response()->json(['error' => 'Product not found'], 404); }

        // Validate the request data
        $validator = Validator::make($request->all(), $this->validationRules);

        // Return an error if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // Unprocessable Entity
        }

        // Extract product-related fields
        $productData = $request->only(['display_name', 'description', 'pricing', 'discount_pricing', 'stock']);

        // Update the Product
        $product->update($productData);

        // Find the associated Cat by the same ID
        $cat = Cat::find($id);

        // Extract cat-specific fields
        $catData = $request->only(['breed_id', 'birthdate', 'color']);

        // Update the Cat model with the new data
        $cat->update($catData);

        // Load the updated Cat relation with CatBreed
        $product->load(['cat', 'cat.cat_breed']);

        // Hide 'id' and 'updated_at' for both Product and Cat, and timestamps in CatBreed
        $product->cat->makeHidden(['id', 'created_at', 'updated_at']);

        // Return the updated Product with associated Cat and CatBreed
        return response()->json($product, 200); // OK
    }
}
