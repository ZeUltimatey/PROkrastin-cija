<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';
    protected $primaryKey = 'id';
    protected $fillable = [
        'transactor_id',
        'location_id',
        'total_pricing',
        'check_content',
    ];
    public $incrementing = true;
    public $timestamps = true;

    public function transactor()
    {
        return $this->hasOne(User::class, 'id', 'transactor_id');
    }
    public function location()
    {
        return $this->hasOne(Location::class, 'id', 'location_id');
    }

}
