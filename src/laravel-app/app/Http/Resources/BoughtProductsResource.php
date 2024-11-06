<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BoughtProductsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        // Base parameters
        $bought_product = [
            'display_name' => $this->display_name,
            'amount' => $this->amount,
            'price_per_product' => $this->price_per_product,
            'total_price' => $this->total_price,
        ];

        if (isset($this->show_info)) {
            // Check if transactor is associated
            $transactor = null;
            if ($this->transaction && $this->transaction->transactor) {
                $transactor = $this->transaction->transactor;
                $transactor = [
                    "id"          => $transactor->id,
                    "name"        => $transactor->name,
                    "surname"     => $transactor->surname,
                    "image_url"   => $transactor->image_url,
                    "deactivated" => $transactor->deactivated,
                ];
            }
            $bought_product['transaction_id'] = $this->transaction_id;
            $bought_product['transactor'] = $transactor;
        }

        // Check if product is associated
        $product = null;
        if ($this->product) {
            $product = $this->product;
            $product = ProductResource::make($product);
        }
        $bought_product['product_in_database'] = $product;

        // Return transaction
        return $bought_product;
    }

    public function with_info() {
        $this->show_info = true;
        return $this;
    }
}
