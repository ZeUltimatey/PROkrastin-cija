<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public static function find(int $product_id): ProductResource
    {
        return new ProductResource(Product::find($product_id));
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {

        $product = [
            'id'               => $this->id,
            'display_name'     => $this->display_name,
            'description'      => $this->description,
            'pricing'          => $this->pricing,
            'discount_pricing' => $this->discount_pricing,
            'product_type'     => $this->product_type,
            'stock'            => $this->stock,
            'rating'           => round($this->review()->avg('rating'), 2),
            'images'           => new AttachmentResource($this->attachment),
        ];

        if ($this->product_type === 'CATS' && $this->cat) {
            $exclude_fields = ['id', 'breed_id', 'created_at', 'updated_at'];
            $product['cat'] = collect($this->cat->toArray())->except($exclude_fields)->all();

            if ($this->cat->cat_breed) {
                $product['cat']['breed_name'] = $this->cat->cat_breed->display_name;
                $product['cat']['breed_id'] = $this->cat->cat_breed->id;
            }
        }
        return $product;
    }
}
