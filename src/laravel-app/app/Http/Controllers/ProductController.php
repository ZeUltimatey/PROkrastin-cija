<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    private $validationRules = [
        'product_type'     => 'required|in:Unlisted,Cat,Accessory,Food,Furniture',
        'display_name'     => 'required|string|max:255',
        'description'      => 'required|string',
        'pricing'          => 'required|numeric|min:0',
        'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
        'stock'            => 'required|integer|min:0',
    ];

    public function index()
    {
        return response()->json(Product::all());
    }

    public function show($id)
    {
        $product = Product::find($id);

        if ($product) { return response()->json($product, 200); }
        else { return response()->json(null, 404); }
    }

//    public function store(StoreProductRequest $request)
//    {
//        $product = Product::create($request->validated());
//        return response()->json($product, 201);
//    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), $this->validationRules);

        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422);
        }

        $product = Product::create($validator->validated());
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), $this->validationRules);

        if ($validator->fails()) {
            $errors = ['errors' => $validator->errors()];
            return response()->json($errors, 422);
        }

        $product = Product::findOrFail($id);
        $product->update($validator->validated());
        return response()->json($product, 201);
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
