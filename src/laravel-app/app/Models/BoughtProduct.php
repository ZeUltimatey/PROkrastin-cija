<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BoughtProduct extends Model
{
    protected $table = 'bought_products';
    protected $primaryKey = 'id';
    protected $fillable = [
        'product_id',
        'transaction_id',
        'display_name',
        'amount',
        'price_per_product',
        'total_price',
    ];
    public $incrementing = false;
    public $timestamps = true;

    protected $casts = [
        'price_per_product' => 'float',
        'total_price' => 'float',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transaction_id', 'id');
    }
    public function product()    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
