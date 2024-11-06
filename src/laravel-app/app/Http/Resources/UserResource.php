<?php

namespace App\Http\Resources;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static function find(int $user_id, bool $with_extra_information): UserResource
    {
        // Find the user
        $user = new UserResource(User::find($user_id));
        if ($with_extra_information) { $user->with_extra_information(); }

        // Return the user
        return $user;
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        // Base parameters
        $user = [
            'id'           => $this->id,
            'image_url'    => $this->image_url,
            'email'        => $this->email,
            'display_name' => $this->display_name,
            'user_role'    => $this->user_role,
            'deactivated'  => $this->deactivated,
        ];

        // Show extra information - usually for administrators and yourself
        if (isset($this->show_extra_information)) {
            $user['name'] = $this->name;
            $user['surname'] = $this->surname;
            $user['phone_number'] = $this->phone_number;
            $user['created_at'] = $this->created_at;
        }

        // Return user
        return $user;
    }

    public function with_extra_information() {
        $this->show_extra_information = true;
        return $this;
    }
}
