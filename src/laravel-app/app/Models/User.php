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

    public function add_to_basket(int $productId, int $amount): void
    {
        $userId = $this->getKey();
        $selected_product = new SelectedProducts();
        $selected_product->user_id = $userId;
        $selected_product->product_id = $productId;
        $selected_product->amount = $amount;

        $selected_product->save();

    }

    public function get_basket()
    { // TODO
        $userId = $this->getKey();
//        $selected_products = SelectedProducts::with('product')
//            ->where('user_id', $userId)
//            ->get();

        $selected_products = DB::select("
            SELECT selected_products.amount,
                   products.product_type,
                   products.display_name,
                   products.description,
                   products.pricing,
                   products.discount_pricing
            FROM selected_products
            JOIN products ON selected_products.product_id = products.id
            WHERE selected_products.user_id = ?
        ", [$userId]);

        return $selected_products;
    }
}
