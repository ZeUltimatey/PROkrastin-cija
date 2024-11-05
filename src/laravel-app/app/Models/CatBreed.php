<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatBreed extends Model
{
    protected $table = 'cat_breeds';
    protected $primaryKey = 'id';
    protected $fillable = [
        'attachments_id',
        'display_name',
        'breed_information'
    ];
    public $incrementing = true;
    public $timestamps = true;
}
