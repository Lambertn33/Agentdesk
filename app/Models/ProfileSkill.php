<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileSkill extends Model
{
    const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
    const BEGINNER = self::LEVELS[0];
    const INTERMEDIATE = self::LEVELS[1];
    const ADVANCED = self::LEVELS[2];
    const EXPERT = self::LEVELS[3];

    protected $fillable = [
        'profile_id',
        'skill_id',
        'level',
        'years_of_experience'
    ];
}
