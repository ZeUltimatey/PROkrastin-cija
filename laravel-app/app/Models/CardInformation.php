<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CardInformation extends Model
{
    protected $table = 'card_information';
    protected $primaryKey = 'card_id';
    public $incrementing = true;
    public $timestamps = true;

//    public function cardholder()
//    {
//        return $this->hasOne(User::class, 'user_id', 'cardholder_id');
//    }
}
