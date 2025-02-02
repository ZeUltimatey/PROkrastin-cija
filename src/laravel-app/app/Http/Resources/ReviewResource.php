<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        // Base parameters
        $review = [
            "id"         => $this->id,
            "content"    => $this->content,
            "rating"     => $this->rating,
            "is_anonymous" => $this->is_anonymous,
            "created_at" => Carbon::parse($this->created_at)->format('d/m/Y H:i'),
            'images'           => new AttachmentResource($this->attachment),
        ];

        if (isset($this->show_product)) {
            // Check if product is associated
            $product = null;
            if ($this->product) {
                $product = $this->product;
                $product = [
                    "id"               => $product->id,
                    "display_name"     => $product->display_name,
                    "pricing"          => $product->pricing,
                    "discount_pricing" => $product->discount_pricing,
                    "stock"            => $product->stock,
                ];
            }
            $review['product'] = $product;
        }

        // Check if reviewer is associated
        $reviewer = null;
        if (!$this->is_anonymous && $this->reviewer) {
            $reviewer = $this->reviewer;
            $reviewer = [
                "id"           => $reviewer->id,
                "display_name" => $reviewer->display_name,
                "image_url"    => $reviewer->image_url,
                "user_role"    => $reviewer->user_role,
                "deactivated"  => $reviewer->deactivated,
            ];
        }
        $review['reviewer'] = $reviewer;

        // Return review
        return $review;
    }

    public function with_product() {
        $this->show_product = true;
        return $this;
    }
}
