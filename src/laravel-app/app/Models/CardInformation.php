<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class CardInformation extends Model
{
    protected $table = 'card_information';
    protected $primaryKey = 'id';
    protected $fillable = [
        'card_number',
        'expiration_date',
        'cvc_number',
        'card_name',
    ];
    protected $hidden = [
        'card_number',
        'expiration_date',
        'cvc_number',
    ];
    public $incrementing = true;
    public $timestamps = true;

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            if ($model->isDirty('card_number')) {
                $model->card_number = Crypt::encryptString($model->card_number);
            }

            if ($model->isDirty('expiration_date')) {
                $model->expiration_date = Crypt::encryptString($model->expiration_date);
            }

            if ($model->isDirty('cvc_number')) {
                $model->cvc_number = Crypt::encryptString($model->cvc_number);
            }
        });
    }

    public function getCardholder()
    {
        return $this->hasOne(User::class, 'user_id', 'cardholder_id');
    }
    public function getCardNumberAttribute($value)
    {
        return Crypt::decryptString($value);
    }
    public function getExpirationDateAttribute($value)
    {
        return Crypt::decryptString($value);
    }
    public function getCvcNumberAttribute($value)
    {
        return Crypt::decryptString($value);
    }
}
