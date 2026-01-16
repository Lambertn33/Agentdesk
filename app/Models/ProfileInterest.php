<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileInterest extends Model
{
    protected $fillable = [
        'profile_id',
        'interest_id'
    ];
}
