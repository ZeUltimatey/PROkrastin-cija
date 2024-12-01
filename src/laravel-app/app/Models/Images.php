<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Images extends Model
{
    use HasFactory;

    public function attachment(): hasOne
    {
        return $this->hasOne(Images::class);
    }
}
