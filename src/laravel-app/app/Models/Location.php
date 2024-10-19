<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $table = 'locations';
    protected $primaryKey = 'id';
    protected $fillable = [
        'city',
        'street',
        'apartment_number',
        'zip_code',
    ];
    public $incrementing = true;
    public $timestamps = true;

    public function creator()
    {
        return $this->hasOne(User::class, 'id', 'creator_id');
    }
}
