<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LocationRequest extends ValidatedRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('sanctum')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'city'             => 'required|string|max:255',
            'street'           => 'required|string|max:255',
            'apartment_number' => 'nullable|string|max:255',
            'location_name'    => 'nullable|string|max:255',
            'zip_code'         => 'required|string|max:255',
        ];
    }
}
