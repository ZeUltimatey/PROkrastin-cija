<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'display_name',
        'name',
        'surname',
        'phone_number',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
//        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
//            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

//    public function add_to_basket(int $productId, int $amount): void
//    {
//        $userId = $this->getKey();
//        $selected_product = new SelectedProducts();
//        $selected_product->user_id = $userId;
//        $selected_product->product_id = $productId;
//        $selected_product->amount = $amount;
//
//        $selected_product->save();
//
//    }

    public function update_basket_item(int $product_id, int $amount)
    {
        // Sense
        $userId = $this->getKey();

        // Return product info regardless
        $product = Product::where('id', $product_id)->first();

        // Find the selected product based on user and product ID
        $selectedProduct = SelectedProducts::where('user_id', $userId)
            ->where('product_id', $product_id)
            ->first();

        // Removing from basket
        if ($amount <= 0) {
            $amount = 0;

            // If it exists, delete the selected product record (remove from basket)
            if ($selectedProduct) { $selectedProduct->delete(); }

            return [
                'amount' => $amount,
                'product_type' => $product->product_type,
                'display_name' => $product->display_name,
                'description' => $product->description,
                'pricing' => $product->pricing,
                'discount_pricing' => $product->discount_pricing,
            ];
        } else {
            if ($selectedProduct) {
                // If the product exists, update the amount and save
                $selectedProduct->amount = $amount;
                $selectedProduct->save();  // Use save() here
            } else {
                // If the product doesn't exist, create a new record
                $selectedProduct = new SelectedProducts();
                $selectedProduct->user_id = $userId;
                $selectedProduct->product_id = $product_id;
                $selectedProduct->amount = $amount;
                $selectedProduct->save();  // Save the new record
            }
        }

        return [
            'amount' => $selectedProduct->amount,
            'product_type' => $selectedProduct->product->product_type,
            'display_name' => $selectedProduct->product->display_name,
            'description' => $selectedProduct->product->description,
            'pricing' => $selectedProduct->product->pricing,
            'discount_pricing' => $selectedProduct->product->discount_pricing,
        ];
    }

    public function get_basket()
    {
        // Sense
        $userId = $this->getKey();

        $selected_products = SelectedProducts::with('product')
            ->where('user_id', $userId)
            ->get(['amount', 'product_id']) // Include only the fields you need from selected_products
            ->map(function ($selectedProduct) {
                // For each selected product, retrieve the corresponding product details
                return [
                    'amount' => $selectedProduct->amount,
                    'product_type' => $selectedProduct->product->product_type,
                    'display_name' => $selectedProduct->product->display_name,
                    'description' => $selectedProduct->product->description,
                    'pricing' => $selectedProduct->product->pricing,
                    'discount_pricing' => $selectedProduct->product->discount_pricing,
                ];
            });

        return $selected_products;
    }

    public function clear_basket()
    {
        // Sense
        $userId = $this->getKey();

        // Delete all selected products for the user
        $deletedCount = SelectedProducts::where('user_id', $userId)->delete();

        return [
            'cleared' => $deletedCount
        ];
    }
}
