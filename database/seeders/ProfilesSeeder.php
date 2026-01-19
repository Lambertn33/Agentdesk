<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Interest;
use App\Models\ProfileAvailability;
use App\Models\ProfileSkill;
use Faker\Factory as Faker;

class ProfilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::doesntHave('profile')->get();

        if ($users->isEmpty()) {
            $this->command->info('No users without profiles found.');
            return;
        }

        $allSkills = Skill::all();
        $allInterests = Interest::all();

        if ($allSkills->isEmpty()) {
            $this->command->error('No skills found in database. Please run SkillsSeeder first.');
            return;
        }

        if ($allInterests->isEmpty()) {
            $this->command->error('No interests found in database. Please run InterestsSeeder first.');
            return;
        }

        $timezones = [
            "GMT-12", "GMT-11", "GMT-10", "GMT-9", "GMT-8", "GMT-7", "GMT-6",
            "GMT-5", "GMT-4", "GMT-3", "GMT-2", "GMT-1", "GMT",
            "GMT+1", "GMT+2", "GMT+3", "GMT+4", "GMT+5", "GMT+6",
            "GMT+7", "GMT+8", "GMT+9", "GMT+10", "GMT+11", "GMT+12"
        ];

        foreach ($users as $user) {
            $profile = Profile::create([
                'user_id' => $user->id,
                'bio' => $faker->paragraph(3),
                'address' => $faker->streetAddress(),
                'city' => $faker->city(),
                'timezone' => $faker->randomElement($timezones),
            ]);

            $numSkills = rand(1, min(5, $allSkills->count()));
            $selectedSkills = $allSkills->random($numSkills);

            $skillsData = [];
            foreach ($selectedSkills as $skill) {
                $yearsOfExperience = rand(0, 10);
                $level = $this->setSkillLevel($yearsOfExperience);

                $skillsData[$skill->id] = [
                    'years_of_experience' => $yearsOfExperience,
                    'level' => $level,
                ];
            }
            $profile->skills()->sync($skillsData);

            $numInterests = rand(1, min($allInterests->count(), 5)); // Limit to 5 interests max
            $selectedInterests = $allInterests->random($numInterests);
            $profile->interests()->sync($selectedInterests->pluck('id')->toArray());

            ProfileAvailability::create([
                'profile_id' => $profile->id,
                'day_of_week' => $faker->randomElement(ProfileAvailability::DAY_OF_WEEK),
                'time_block' => $faker->randomElement(ProfileAvailability::TIME_BLOCK),
                'mode' => $faker->randomElement(ProfileAvailability::MODE),
            ]);
        }

        $this->command->info("Created {$users->count()} profiles with random skills, interests, and availability.");
    }

    /**
     * Set skill level based on years of experience
     */
    protected function setSkillLevel(int $yearsOfExperience): string
    {
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
}
