<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transactions';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = true;

    public function transactor()
    {
        return $this->hasOne(User::class, 'id', 'transactor_id');
    }
    public function location()
    {
        if ($this->location == null) { return null; }
        return $this->hasOne(Location::class, 'location_id', 'location_id');
    }
}
