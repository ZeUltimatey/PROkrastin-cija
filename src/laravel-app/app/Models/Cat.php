<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cat extends Model
{
    protected $table = 'cats';
    protected $primaryKey = 'id';
    protected $fillable = [
        'id',
        'breed_id',
        'birthdate',
        'color',
    ];
    public $incrementing = false;
    public $timestamps = true;

    public function product()
    {
        return $this->belongsTo(Product::class, 'id', 'id');
    }

    public function cat_breed()
    {
        return $this->belongsTo(CatBreed::class, 'breed_id', 'id');
    }
}
