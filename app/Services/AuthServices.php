<?php

namespace App\Services;

use App\Models\User;

class AuthServices
{
    public function register(array $data)
    {
        return User::create($data);
    }
}