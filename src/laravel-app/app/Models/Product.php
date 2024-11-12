<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;

    protected $fillable = [
        'product_type',
        'display_name',
        'description',
        'pricing',
        'discount_pricing',
        'price_id',
        'stock',
    ];

    public function cat()
    {
        return $this->hasOne(Cat::class, 'id', 'id');
    }

    public function selectedProduct()
    {
        return $this->hasMany(SelectedProducts::class, 'product_id', 'id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'id');
    }
}
