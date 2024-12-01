<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'reviews';
    protected $primaryKey = 'id';
    protected $fillable = [
        'reviewer_id',
        'product_id',
        'content',
        'rating',
    ];
    public $incrementing = true;
    public $timestamps = true;

    public function reviewer()
    {
        return $this->hasOne(User::class, 'id', 'reviewer_id');
    }

    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
