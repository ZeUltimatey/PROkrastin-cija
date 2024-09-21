<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatBreed extends Model
{
    protected $table = 'cat_breeds';
    protected $primaryKey = 'breed_id';
    public $incrementing = true;
    public $timestamps = true;
}
