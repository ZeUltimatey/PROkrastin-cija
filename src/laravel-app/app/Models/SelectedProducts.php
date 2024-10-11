<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SelectedProducts extends Model
{
    protected $table = 'selected_products';
    protected $primaryKey = ['user_id', 'product_id'];
    public $incrementing = false;
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
    public function product()    {
        return $this->belongsTo(Product::class, 'id', 'product_id');
    }
}
