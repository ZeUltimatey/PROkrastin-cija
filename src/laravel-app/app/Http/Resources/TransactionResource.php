<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        // Base parameters
        $transaction = [
            'id'            => $this->id,
            'total_pricing' => $this->total_pricing,
            'check_content' => $this->check_content,
        ];

        if (isset($this->show_transactor)) {
            // Check if transactor is associated
            $transactor = null;
            if ($this->transactor) {
                $transactor = $this->transactor;
                $transactor = [
                    "id" => $transactor->id,
                    "name" => $transactor->name,
                    "surname" => $transactor->surname,
                    "image_url" => $transactor->image_url,
                    "deactivated" => $transactor->deactivated
                ];
            }
            $transaction['transactor'] = $transactor;
        }

        // Check if location is associated
        $location = null;
        if ($this->location) {
            $location = $this->location;
            $location = [
                "id"               => $location->id,
                "city"             => $location->city,
                "street"           => $location->street,
                "apartment_number" => $location->apartment_number,
                "zip_code"         => $location->zip_code,
            ];
        }
        $transaction['location'] = $location;

        // Return transaction
        return $transaction;
    }

    public function with_transactor() {
        $this->show_transactor = true;
        return $this;
    }

}
