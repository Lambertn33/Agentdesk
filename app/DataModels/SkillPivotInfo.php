<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModel;
use LarAgent\Attributes\Desc;

class SkillPivotInfo extends DataModel
{
    #[Desc('Profile id')]
    public int $profile_id;

    #[Desc('Skill id')]
    public int $skill_id;

    #[Desc('Level e.g. ADVANCED')]
    public string $level;

    #[Desc('Years of experience')]
    public int $years_of_experience;
}
