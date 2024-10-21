<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;
use Illuminate\Support\Facades\Storage;
use App\Models\ProductImage;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    private array $validationRules = [
        'product_type'     => 'required|in:UNLISTED,FOOD,CARE,TOYS,FURNITURE,ACCESSORIES',
        'display_name'     => 'required|string|max:255',
        'description'      => 'required|string',
        'pricing'          => 'required|numeric|min:0',
        'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
        'stock'            => 'required|integer|min:0',
    ];

    /**
     * Show all products.
     *
     * 
     */
    public function index()
    {
        return ProductResource::collection(Product::all());
    }

    /**
     * Show a singular product.
     *
     * @param int $id
     * 
     */
    public function show(int $id)
    {
        // Find the product by id
        $product = Product::find($id);

        if ($product) { return new ProductResource($product); } // OK
        else { return response()->json(null, 404); } // Not found
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
            return response()->json($errors, 422); // Unprocessable entity
        }

        // Create product if everything is correct
        $product = Product::create($validator->validated());
        return response()->json($product, 201); // Content created
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
            return response()->json($errors, 422); // Unprocessable entity
        }

        // Update and return product if everything is correct
        $product = Product::findOrFail($id);
        $product->update($validator->validated());
        return response()->json($product, 202); // Request accepted
    }

    /**
     * Remove a product.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        // Find and delete product by id
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(true, 202); // Request accepted
    }


    public function addImage(Request $request, int $id){
    
        $validator = Validator::make($request->all(), 
            [
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); // Unprocessable Entity
        }   
        $image = $request->file('image');
        $path = $image->store('images/products', 'public');
        $imageUrl = Storage::url($path);

        return ProductImage::create([
            'product_id' => $id,
            'url' => $imageUrl,
        ]);
    }


    public function removeImage(Request $request, ProductImage $image){ 
        $oldImagePath = str_replace('/storage/', '', $image->url);
        Storage::disk('public')->delete($oldImagePath);
        $image->delete();
        return response()->json(true, 204); // No content
    }
}

