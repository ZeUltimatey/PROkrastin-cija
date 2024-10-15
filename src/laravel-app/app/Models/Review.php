<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $table = 'reviews';
    protected $primaryKey = 'id';
    protected $fillable = [
        'content',
        'rating',
    ];
    public $incrementing = true;
    public $timestamps = true;

    public function reviewer()
    {
        return $this->hasOne(User::class, 'user_id', 'reviewer_id');
    }
}
