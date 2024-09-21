<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCardRequest extends FormRequest
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
        $id = $this->route('id');

        return [
            'cardholder_id'   => 'required|exists:users,user_id',
            'card_number'     => 'required|string|digits:16|unique:cards,card_number',
            'expiration_date' => 'required|date_format:m/y|after:today',
            'cvc_number'      => 'nullable|string|digits:3',
            'card_name'       => 'required|string|max:255',
        ];
    }
}
