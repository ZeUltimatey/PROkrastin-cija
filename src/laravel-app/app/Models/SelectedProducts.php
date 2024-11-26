<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SelectedProducts extends Model
{
    protected $table = 'selected_products';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'product_id',
        'amount',
    ];
    public $incrementing = true;
    public $timestamps = true;

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function product()    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
