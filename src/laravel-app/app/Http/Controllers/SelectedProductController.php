<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SelectedProducts;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\SelectedProductRequest;
use App\Http\Resources\SelectedProductResource;
use Laravel\Sanctum\Http\Controllers\AuthenticatedSessionController;
use App\Http\Resources\ProductResource;

class SelectedProductController extends Controller
{
    public function get_basket()
    {
        // Get the authenticated user
        $user = Auth::user();

        return SelectedProductResource::collection(SelectedProducts::all()->where('user_id', $user->id));
    }
    public function addToBasket(SelectedProductRequest $request)
    {

        // Get the authenticated user
        $user = Auth::user();
        $request->merge(['user_id' => $user->id]);

        // Validate request data
        $validated =  $request->validated();


        // Add product to basket
        // Check if the product is already in the basket
        $existingSelectedProduct = SelectedProducts::where('product_id', $request->product_id)->where('user_id', $user->id)->first();
        if ($existingSelectedProduct) {
            if ($validated['amount'] >= 1) { // if product amount is more than 1 update it to the new amount
                $existingSelectedProduct->update($validated);
                return SelectedProductResource::collection(SelectedProducts::all()->where('user_id', $user->id));
            } else { // if product amount is less than 1 or null add one product
                $validated['amount'] = $existingSelectedProduct->amount + 1;
                $existingSelectedProduct->update($validated);
                return SelectedProductResource::collection(SelectedProducts::all()->where('user_id', $user->id));
            }
        }

        // if the product doesn't exist in the basket add it
        $basketProduct = SelectedProducts::create($request->merge(['amount' => $request->amount ?? 1])->all());

        // returns all the users basket products
        return SelectedProductResource::collection(SelectedProducts::all()->where('user_id', $user->id));
    }

    public function clear_basket()
    {
        // Get the authenticated user
        $user = Auth::user();
        SelectedProducts::where('user_id', $user->id)->delete();
        return response()->json("Basket cleared", 202); // Request accepted
    }

    public function removeFromBasket(int $product_id)
    {
        $user = Auth::user();
        // Delete selected product for the user
        $removedBasketProduct = SelectedProducts::where('user_id', $user->id)->where('product_id', $product_id)->delete();

        return response()->json($removedBasketProduct, 204);
    }
}
