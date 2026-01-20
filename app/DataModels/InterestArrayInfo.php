<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModelArray;

class InterestArrayInfo extends DataModelArray
{
    public static function allowedModels(): array
    {
        return [InterestInfo::class];
    }
}