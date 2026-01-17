<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Models\SkillCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SkillCategory::query()->delete();
        Skill::query()->delete();

        $skills = [
            'Backend Development' => [
                'PHP',
                'Python',
                'Java',
                'Node.js',
                'Ruby',
                'Go',
                'Laravel',
                'Typescript',
            ],
            'Frontend Development' => [
                'HTML',
                'CSS',
                'JavaScript',
                'React',
                'Vue',
                'Angular',
                'Tailwind CSS',
            ],
            'Mobile Development' => [
                'Android',
                'iOS',
                'React Native',
                'Flutter',
            ],
            'DevOps' => [
                'Docker',
                'Kubernetes',
                'CI/CD',
                'AWS',
            ],
            'Data & AI' => [
                'SQL',
                'Data modeling',
                'AI Agentic Systems',
                'AI Integration',
            ],
            'Communication & Collaboration' => [
                'Technical Mentoring',
                'Project Planning',
            ],
        ];

        foreach ($skills as $category => $skills) {
            $skillCategory = SkillCategory::create([
                'name' => $category,
            ]);
            foreach ($skills as $skill) {
                $skillCategory->skills()->create([
                    'name' => $skill,
                ]);
            }
        }
    }
}
