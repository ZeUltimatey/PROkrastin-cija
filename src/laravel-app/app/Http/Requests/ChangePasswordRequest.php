<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class ChangePasswordRequest extends ValidatedRequest
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
            'old_password'              => 'required|string',
            'new_password'              => [
                'required',
                'string',
                'min:8',
                'confirmed',
                'regex:/[0-9]/', // must contain at least one number
                'regex:/[A-Z]/', // must contain at least one uppercase letter
                'regex:/[@$!%*?&#]/' // must contain at least one special character
            ],
            'new_password_confirmation' => 'required|string|min:8|same:new_password',
        ];
    }
}
