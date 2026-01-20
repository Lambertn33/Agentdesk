<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModel;
use LarAgent\Attributes\Desc;

class InterestInfo extends DataModel
{
    #[Desc('Interest id')]
    public int $id;

    #[Desc('Interest name')]
    public string $name;

    #[Desc('Interest pivot')]
    public InterestPivotInfo $pivot;
}
