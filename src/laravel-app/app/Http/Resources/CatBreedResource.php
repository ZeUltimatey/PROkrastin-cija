<?php

namespace App\Http\Resources;

use App\Models\CatBreed;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CatBreedResource extends JsonResource
{
    public static function find(int $breed_Id): CatBreedResource
    {
        return new CatBreedResource(CatBreed::find($breed_Id));
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'display_name' => $this->display_name,
            'feeding_info' => $this->feeding_info,
            'personality_info' => $this->personality_info,
            'environment_info' => $this->environment_info,
            'tips_info' => $this->tips_info
        ];
    }
}
