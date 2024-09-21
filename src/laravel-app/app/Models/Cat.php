<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cat extends Model
{
    protected $table = 'cats';
    protected $primaryKey = 'cat_id';
    public $incrementing = false;
    public $timestamps = true;

    public function product()
    {
        return $this->belongsTo(Product::class, 'cat_id', 'product_id');
    }
}
