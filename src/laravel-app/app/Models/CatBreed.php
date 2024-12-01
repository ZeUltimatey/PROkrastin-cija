<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Model;

class CatBreed extends Model
{
    protected $table = 'cat_breeds';
    protected $primaryKey = 'id';
    protected $fillable = [
        'attachments_id',
        'display_name',
        'feeding_info',
        'personality_info',
        'environment_info',
        'tips_info',
    ];
    public $incrementing = true;
    public $timestamps = true;

    public function attachment(): MorphOne
    {
        return $this->morphOne(Attachment::class, 'attachable');
    }
}
