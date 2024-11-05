<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class CardInformation extends Model
{
    protected $table = 'card_information';
    protected $primaryKey = 'id';
    protected $fillable = [
        'cardholder_id',
        'card_number',
        'expiration_date',
        //'cvc_number',
        'cardOwnerName',
        'cardOwnerSurname',
    ];
    protected $hidden = [
        //'card_number',
        //'expiration_date',
        //'cvc_number',
    ];
    public $incrementing = true;
    public $timestamps = true;

    public function getCardholder()
    {
        return $this->hasOne(User::class, 'id', 'cardholder_id');
    }
}
