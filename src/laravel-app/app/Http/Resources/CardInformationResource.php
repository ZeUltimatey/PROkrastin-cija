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
        $cardNumber = Str::mask($this->card_number, '*', 0, -4);
        return [
            'id' => $this->id,
            'card_number' => $cardNumber,
            'expiration_date' => $this->expiration_date,
            'card_name' => $this->card_name,
            'cardOwnerName' => $this->cardOwnerName,
            'cardOwnerSurname' => $this->cardOwnerSurname,
        ];
    }
}
