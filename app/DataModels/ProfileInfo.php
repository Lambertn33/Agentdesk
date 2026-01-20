<?php

namespace App\DataModels;

use LarAgent\Core\Abstractions\DataModel;
use LarAgent\Attributes\Desc;

class ProfileInfo extends DataModel
{
    #[Desc('Profile id')]
    public int $id;

    #[Desc('Bio')]
    public string $bio;

    #[Desc('Address')]
    public string $address;

    #[Desc('City')]
    public string $city;

    #[Desc('Timezone e.g. GMT+2')]
    public string $timezone;

    #[Desc('Interests list')]
    public InterestArrayInfo $interests;

    #[Desc('Skills list')]
    public SkillArrayInfo $skills;
}
