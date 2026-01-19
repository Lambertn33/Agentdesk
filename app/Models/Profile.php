<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'bio',
        'address',
        'city',
        'timezone'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'profile_skills')
            ->withPivot('level', 'years_of_experience');
    }

    public function interests(): BelongsToMany
    {
        return $this->belongsToMany(Interest::class, 'profile_interests', 'profile_id', 'interest_id');
    }

    public function availabilities(): HasMany
    {
        return $this->hasMany(ProfileAvailability::class);
    }
}
