<?php

namespace App\Http\Controllers;

use App\Http\Resources\BoughtProductResource;
use App\Models\BoughtProduct;
use Illuminate\Http\Request;

class BoughtProductController extends Controller
{
    /**
     * Show all bought products.
     */
    public function index_all()
    {
        // Fetch all bought products with transaction associated
        return BoughtProductResource::collection(BoughtProduct::all())->each(function ($bought_product) {
            $bought_product->with_info();
        });
    }

    /**
     * Show bought products.
     */
    public function index(int $transaction_id)
    {
        // Fetch all bought products
        $bought_products = BoughtProduct::where('transaction_id', $transaction_id)->get();
        return BoughtProductResource::collection($bought_products);
    }
}
