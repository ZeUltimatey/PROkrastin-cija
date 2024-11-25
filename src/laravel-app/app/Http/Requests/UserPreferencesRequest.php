<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserPreferencesRequest extends ValidatedRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'display_lowest_price'   => 'nullable|boolean',
            'display_only_available' => 'nullable|boolean',
            'recieve_notifications'  => 'nullable|boolean',
        ];
    }
}
