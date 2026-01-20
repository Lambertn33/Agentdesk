<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModel;
use LarAgent\Attributes\Desc;

class UsersResponse extends DataModel
{
    #[Desc('Matched users')]
    public UserArrayInfo $users;
}
