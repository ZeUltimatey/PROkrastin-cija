<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterUserRequest extends ValidatedRequest
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
            'email'                 => 'required|string|email|max:255|unique:users',
            'password'              => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|same:password',
            'display_name'          => 'required|string|max:255',
            'name'                  => 'required|string|max:255',
            'surname'               => 'required|string|max:255',
            'phone_number'          => 'nullable|string|max:15', // temp nullable because frontend
            'user_role'             => 'nullable|in:User,Admin',
        ];
    }
}
