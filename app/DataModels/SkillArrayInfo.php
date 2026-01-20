<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModelArray;

class SkillArrayInfo extends DataModelArray
{
    public static function allowedModels(): array
    {
        return [SkillInfo::class];
    }
}