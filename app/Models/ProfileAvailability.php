<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfileAvailability extends Model
{
    const MODE = ['ONLINE', 'IN_PERSON', 'BOTH'];

    const ONLINE = self::MODE[0];
    const IN_PERSON = self::MODE[1];
    const BOTH = self::MODE[2];

    const DAY_OF_WEEK = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

    const MONDAY = self::DAY_OF_WEEK[0];
    const TUESDAY = self::DAY_OF_WEEK[1];
    const WEDNESDAY = self::DAY_OF_WEEK[2];
    const THURSDAY = self::DAY_OF_WEEK[3];
    const FRIDAY = self::DAY_OF_WEEK[4];
    const SATURDAY = self::DAY_OF_WEEK[5];
    const SUNDAY = self::DAY_OF_WEEK[6];

    const TIME_BLOCK = ['MORNING', 'AFTERNOON', 'EVENING'];
    
    const MORNING = self::TIME_BLOCK[0];
    const AFTERNOON = self::TIME_BLOCK[1];
    const EVENING = self::TIME_BLOCK[2];

    protected $fillable = [
        'profile_id',
        'day_of_week',
        'time_block',
        'mode'
    ];

    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
