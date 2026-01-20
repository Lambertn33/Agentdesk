<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModel;
use LarAgent\Attributes\Desc;

class InterestPivotInfo extends DataModel
{
    #[Desc('Profile id')]
    public int $profile_id;

    #[Desc('Interest id')]
    public int $interest_id;
}
