<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Product;

class SelectedProductRequest extends ValidatedRequest
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
        $product = Product::find($this->input('product_id'));
        $amountInStock = $product->stock + 1;
        return [
            'product_id' => 'required|int|exists:products,id',
            'amount' => "nullable|int|min:0|max:$amountInStock",
        ];
    }

    public function messages(): array
    {
        $product = Product::find($this->input('product_id'));
        $amountInStock = $product->stock;
        return [
            'amount.max' => 'Atvaino, bet noliktavā piejams šāds skaits :max ar produktu: ' . $product->display_name ,
        ];
    }
}
