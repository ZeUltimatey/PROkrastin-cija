<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'product_id';
    public $incrementing = true;
    public $timestamps = true;

    public function cat()
    {
        return $this->hasOne(Cat::class, 'cat_id', 'product_id');
    }
}
