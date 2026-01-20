<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModel;
use LarAgent\Attributes\Desc;

class SkillInfo extends DataModel 
{
    #[Desc('Skill id')]
    public int $id;

    #[Desc('Skill name')]
    public string $name;

    #[Desc('Skill pivot')]
    public SkillPivotInfo $pivot;
}