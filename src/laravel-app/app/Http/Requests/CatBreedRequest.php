<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CatBreedRequest extends FormRequest
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
            'display_name'      => 'required|string|max:255',
            'feeding_info'      => 'required|string|max:65535',
            'personality_info'  => 'required|string|max:65535',
            'environment_info'  => 'required|string|max:65535',
            'tips_info'         => 'required|string|max:65535',
        ];
    }
}
