<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class CardInformationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            //'cardholder_id' => $this->id,
            'id' => $this->id,
            'expiration_date' => $this->expiration_date,
            'card_name' => $this->card_name,
            'cardOwnerName' => $this->cardOwnerName,
            'cardOwnerSurname' => $this->cardOwnerSurname,
        ];
    }
}
