<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $table = 'locations';
    protected $primaryKey = 'location_id';
    public $incrementing = true;
    public $timestamps = true;

    public function creator()
    {
        return $this->hasOne(User::class, 'user_id', 'creator_id');
    }
}
