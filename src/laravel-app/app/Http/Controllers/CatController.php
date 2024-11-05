<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
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
     */
    public function index()
    {
        $catProducts = Product::where('product_type', 'CATS')->get();
        return ProductResource::collection($catProducts);
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
     *
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
        $validated = $validator->validated();
;
        // Create the Product
        $product = Product::create([
            'product_type' => 'CATS',
            'display_name' => $validated['display_name'],
            'description' => $validated['description'],
            'pricing' => $validated['pricing'],
            'discount_pricing' => $validated['discount_pricing'],
            'stock' => $validated['stock'],
        ]);

        // Create the Cat model
        $cat = Cat::create([
            'id' => $product->id,
            'breed_id' => $validated['breed_id'],
            'birthdate' => $validated['birthdate'],
            'color' => $validated['color'],
        ]);

        return new ProductResource($product);
    }

    /**
     * Update the information of a cat.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     *
     */
    public function update(Request $request, $id)
    {
        // Find the cat by ID
        $product = Product::find($id);
        if (!$product) { return response()->json(['error' => 'Product not found'], 404); }
        $product_resource = new ProductResource($product);
        if (!$product_resource->cat) { return response()->json(['error' => 'Product does not have a cat counterpart'], 404); }
        $cat = Cat::find($id);

        // Validate the request data
        $validator = Validator::make($request->all(), $this->validationRules);

        // Return an error if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // Unprocessable Entity
        }

        $validated = $validator->validated();
        $product->update([
            'display_name'     => $validated['display_name'],
            'description'      => $validated['description'],
            'pricing'          => $validated['pricing'],
            'discount_pricing' => $validated['discount_pricing'],
            'stock'            => $validated['stock'],
        ]);
        $cat->update([
            'breed_id'  => $validated['breed_id'],
            'birthdate' => $validated['birthdate'],
            'color'     => $validated['color'],
        ]);

        return new ProductResource(Product::find($id));
    }
}
