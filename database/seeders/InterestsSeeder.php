<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Interest;

class InterestsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Interest::query()->delete();
        $interests = [
            'Study Groups', 
            'Side Projects',
            'Open Source',
            'Hackathons',
            'Tech Discussions',
            'Learning New Technologies',
            'Building MVPs',
            'Code Reviews',
            'Teaching & Mentoring',
            'Startup Ideas',
        ];
        foreach ($interests as $interest) {
            Interest::create([
                'name' => $interest,
            ]);
        }
    }
}
