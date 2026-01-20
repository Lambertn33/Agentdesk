<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModel;
use LarAgent\Attributes\Desc;

class UserInfo extends DataModel
{
    #[Desc('User id')]
    public int $id;

    #[Desc('User names')]
    public string $names;

    #[Desc('Role e.g. USER')]
    public string $role;

    #[Desc('Email')]
    public string $email;

    #[Desc('Profile data')]
    public ProfileInfo $profile;
}
