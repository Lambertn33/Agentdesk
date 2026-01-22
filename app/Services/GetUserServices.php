<?php

namespace App\Services;
use App\Models\User;

class GetUserServices
{
    public static function getUserTool(int $userId)
    {
        $user = User::find($userId);
        return $user->load([
            'profile.skills',
            'profile.interests',
            'profile.availability',
        ]);
    }
}