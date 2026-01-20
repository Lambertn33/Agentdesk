<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModelArray;
use LarAgent\Attributes\Desc;

class UserArrayInfo extends DataModelArray
{
    public static function allowedModels(): array
    {
        return [UserInfo::class];
    }
}
