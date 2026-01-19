<?php

namespace App\Services;

use App\Models\User;
use App\Models\Profile;
use App\Models\ProfileSkill;

class AuthServices
{
    protected function setSkillLevel(int $yearsOfExperience) {
        if ($yearsOfExperience < 1) {
            return ProfileSkill::BEGINNER;
        } elseif ($yearsOfExperience < 3) {
            return ProfileSkill::INTERMEDIATE;
        } elseif ($yearsOfExperience < 5) {
            return ProfileSkill::ADVANCED;
        } else {
            return ProfileSkill::EXPERT;
        }
    }  
    
    public function createUser(array $data) {
        $user = User::create([
            'names' => $data['names'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        return $user;
    }

    public function createProfile(User $user, array $data) {
        $profile = $user->profile()->create([
            'bio' => $data['bio'] ?? '',
            'address' => $data['address'] ?? '',
            'city' => $data['city'] ?? '',
            'timezone' => $data['timezone'] ?? '',
        ]);
        return $profile;
    }

    public function attachProfileSkills(Profile $profile, array $skillsExperience) {
        $skillsData = [];
        foreach ($skillsExperience as $skillExp) {
            $yearsOfExperience = (int) $skillExp['years_of_experience'];
            $skillsData[$skillExp['skillId']] = [
                'years_of_experience' => $yearsOfExperience,
                'level' => $this->setSkillLevel($yearsOfExperience),
            ];
        }
        $profile->skills()->sync($skillsData);
    }

    public function attachProfileInterests(Profile $profile, array $interests) {
        $profile->interests()->sync($interests);
    }

    public function createProfileAvailability(Profile $profile, string $dayOfWeek, string $timeBlock, string $mode) {
        $profile->availability()->create([
            'day_of_week' => $dayOfWeek,
            'time_block' => $timeBlock,
            'mode' => $mode,
        ]);
    }
}