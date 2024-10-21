<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
    
        return [
            'id' => $this->id,
            'display_name' => $this->display_name,
            'description' => $this->description,
            'pricing' => $this->pricing,
            'discount_pricing' => $this->discount_pricing,
            'product_type' => $this->product_type,
            'stock' => $this->stock,
            'images' => ProductImageResource::collection($this->images),
        ];
    }
}
