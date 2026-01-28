<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Interest;
use App\Models\Message;
use App\Models\ProfileAvailability;
use App\Models\ProfileSkill;
use Faker\Factory as Faker;
use Carbon\Carbon;

class ProfilesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::doesntHave('profile')->whereNot('role', User::ADMIN)->get();

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

            //SEEDING SOME TEST MESSAGES
            $todayAt = Carbon::now()
                ->setTime(rand(8, 20), rand(0, 59), rand(0, 59))
                ->utc();
            $lastWeekStart = Carbon::now()->subWeek()->startOfWeek(Carbon::MONDAY)->startOfDay();
            $lastWeekEnd   = Carbon::now()->subWeek()->endOfWeek(Carbon::SUNDAY)->endOfDay();
                
            $lastWeekAt = Carbon::createFromTimestamp(
                rand($lastWeekStart->getTimestamp(), $lastWeekEnd->getTimestamp()))->utc();


            $todayTextOptions = [
                "Hey, can you help me with React.js this weekend?",
                "Hello, I’m John. Can we talk? My email is john@example.com and my phone is +250788123456.",
                "Hi, I need help with Laravel. You can reach me at laravel.help@example.com.",
            ];
                
            $lastWeekTextOptions = [
                "Hey bro, I’m Sarah. My contact is +250789000111. I need help with Vue.js.",
                "Hello, can you share your availability for next week?",
                "Hi, my email is client@example.com — I need support with a small project.",
            ];

            Message::create([
                'receiver_id' => $user->id,
                'message'     => $faker->randomElement($todayTextOptions),
                'is_read'     => false,
                'created_at'  => $todayAt,
                'updated_at'  => $todayAt,
            ]);
            
            Message::create([
                'receiver_id' => $user->id,
                'message'     => $faker->randomElement($lastWeekTextOptions),
                'is_read'     => false,
                'created_at'  => $lastWeekAt,
                'updated_at'  => $lastWeekAt,
            ]);
        }

        $this->command->info("Created {$users->count()} profiles with random skills, interests, messages and availability.");
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
