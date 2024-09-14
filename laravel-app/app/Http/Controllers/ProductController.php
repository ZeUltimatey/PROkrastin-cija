<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::all());
    }

    public function show($id) {
        $product = Product::find($id);

        if ($product) {
            return response()->json($product, 200);
        } else {
            return response()->json('Product not found', 404);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_type' => 'required|in:Unlisted,Cat,Accessory,Food,Furniture',
            'display_name' => 'required|string|max:255',
            'description' => 'required|string',
            'pricing' => 'required|numeric|min:0',
            'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
            'amount' => 'required|integer|min:0',
        ]);

        $product = Product::create($validatedData);
        return response()->json($product, 201);
    }
}
