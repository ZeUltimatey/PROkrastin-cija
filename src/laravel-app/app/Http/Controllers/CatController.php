<?php

namespace App\Http\Controllers;

use App\Http\Requests\CatRequest;
use App\Http\Resources\ProductResource;
use App\Models\Cat;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CatController extends Controller
{
    /**
     * Store a new cat.
     */
    public function store(CatRequest $request)
    {
        // Sense
        $cat_data = $request->all();

        // Create the Product
        $product_model = Product::create([
            'product_type'     => 'CATS',
            'display_name'     => $cat_data['display_name'],
            'description'      => $cat_data['description'],
            'pricing'          => $cat_data['pricing'],
            'discount_pricing' => $cat_data['discount_pricing'],
            'stock'            => $cat_data['stock'],
        ]);

        $stripe = new \Stripe\StripeClient('sk_test_51QJH6GG6wIBbt2iyQVg6IQJayaNghHn2TdAkBwM6IIH7oUsVwzxUJLXAZmzhce8frnKbvXY2Dp7HsLCqVIqGA5AE00PBU1G7Jp');
        // Add product to Stripe
        $timeStampedID = $product_model->id . "_" . $product_model->created_at->timestamp;
            $stripe->products->create([
                'id' => $timeStampedID,
                'name' => $product_model->display_name,
                'description' => $product_model->description,
            ]);
            $prices = $stripe->prices->create([
                'currency' => 'eur',
                'unit_amount' => ($product_model->discount_pricing ?? $product_model->pricing) * 100,
                'product' => $timeStampedID,
            ]);
            $product_model->update([
               'price_id' => $prices->id,
               'stripe_product_id' => $timeStampedID
            ]);

        // Create the Cat model
        Cat::create([
            'id'        => $product_model->id,
            'breed_id'  => $cat_data['breed_id'],
            'birthdate' => $cat_data['birthdate'],
            'color'     => $cat_data['color'],
        ]);

        return $product_model->id; // Content created
    }

    /**
     * Update the information of a cat.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     *
     */
    public function update(CatRequest $request, int $id)
    {
        // Sense
        $cat_data = $request->all();

        // Find the cat by ID
        $product = ProductResource::find($id);
        if ($product->resource == null) { return response()->json(null, 404); } // Not found
        if ($product->cat == null) { return response()->json(['error' => 'Product does not have a cat counterpart'], 404); } // Not found

        // Get current cat model
        $cat_model = Cat::find($id);

        // Update the product part
        $product->update([
            'display_name'     => $cat_data['display_name'],
            'description'      => $cat_data['description'],
            'pricing'          => $cat_data['pricing'],
            'discount_pricing' => $cat_data['discount_pricing'],
            'stock'            => $cat_data['stock'],
        ]);

        // Update the cat part
        $cat_model->update([
            'breed_id'  => $cat_data['breed_id'],
            'birthdate' => $cat_data['birthdate'],
            'color'     => $cat_data['color'],
        ]);

        return response()->json(null, 200); // OK
    }
}
