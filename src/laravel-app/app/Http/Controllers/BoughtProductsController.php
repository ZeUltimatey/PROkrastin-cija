<?php

namespace App\Http\Controllers;

use App\Http\Resources\BoughtProductsResource;
use App\Models\BoughtProducts;
use Illuminate\Http\Request;

class BoughtProductsController extends Controller
{
    private array $validationRules = [
        'product_id'        => 'required|int|exists:products,id',
        'transaction_id'    => 'required|int|exists:transactions,id',
        'display_name'      => 'required|string|max:255',
        'amount'            => 'required|int|min:1',
        'price_per_product' => 'required|numeric|min:0',
        'total_price'       => 'required|numeric|min:0',
    ];

    /**
     * Show all bought products.
     */
    public function index_all()
    {
        // Fetch all bought products with transaction associated
        return BoughtProductsResource::collection(BoughtProducts::all())->each(function ($bought_product) {
            $bought_product->with_info();
        });
    }

    /**
     * Show bought products.
     */
    public function index(int $transaction_id)
    {
        // Fetch all bought products
        $bought_products = BoughtProducts::where('transaction_id', $transaction_id)->get();
        return BoughtProductsResource::collection($bought_products);
    }
}
