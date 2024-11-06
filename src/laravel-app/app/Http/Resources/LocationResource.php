<?php

namespace App\Http\Resources;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    public static function find(int $location_id): LocationResource
    {
        return new LocationResource(Location::find($location_id));
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Base parameters
        $location = [
            "id"               => $this->id,
            "city"             => $this->city,
            "street"           => $this->street,
            "apartment_number" => $this->apartment_number,
            "location_name"    => $this->location_name,
            "zip_code"         => $this->zip_code,
        ];

        if (isset($this->show_creator)) {
            // Check if creator is associated
            $creator = null;
            if ($this->creator) {
                $creator = $this->creator;
                $creator = [
                    "id"           => $creator->id,
                    "display_name" => $creator->display_name,
                    "image_url"    => $creator->image_url,
                    "deactivated"  => $creator->deactivated,
                ];
            }
            $location['creator'] = $creator;
        }

        // Return transaction
        return $location;
    }

    public function with_creator() {
        $this->show_creator = true;
        return $this;
    }
}
