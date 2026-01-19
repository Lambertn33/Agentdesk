<?php

namespace App\Services;

use Prism\Prism\Facades\Tool;
use Prism\Prism\Schema\StringSchema;
use App\Models\User;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Interest;

class SearchUserServices
{
    public static function searchUserTool()
    {
        return Tool::as('search-user')
            ->for('Search for users in the database by various criteria: skills, interests, timezone, location, availability')
            ->withArrayParameter(
                'skills',
                'List of skills that the user is looking for. Extract skill names from the query (e.g., "React", "TypeScript", "PHP", "Laravel"). Leave empty if not mentioned.',
                new StringSchema('skill', 'A single skill name'),
                false // optional
            )
            ->withArrayParameter(
                'interests',
                'List of interests that the user is looking for. Extract interest names from the query. Leave empty if not mentioned.',
                new StringSchema('interest', 'A single interest name'),
                false // optional
            )
            ->withStringParameter(
                'timezone',
                'Timezone that the user is looking for (e.g., "GMT+4", "GMT-5"). Leave empty if not mentioned.',
                false // optional
            )
            ->withStringParameter(
                'city',
                'City or location that the user is looking for. Leave empty if not mentioned.',
                false // optional
            )
            ->withStringParameter(
                'day_of_week',
                'Day of week for availability (MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY). Leave empty if not mentioned.',
                false // optional
            )
            ->withStringParameter(
                'time_block',
                'Time block for availability (MORNING, AFTERNOON, EVENING). Leave empty if not mentioned.',
                false // optional
            )
            ->withStringParameter(
                'mode',
                'Mode of availability (ONLINE, IN_PERSON, BOTH). Leave empty if not mentioned.',
                false // optional
            )
            ->using(function (
                ?array $skills = null,
                ?array $interests = null,
                ?string $timezone = null,
                ?string $city = null,
                ?string $day_of_week = null,
                ?string $time_block = null,
                ?string $mode = null
            ): array {
                // Check if any criteria was provided
                $hasCriteria = !empty($skills) || !empty($interests) || !empty($timezone) || 
                              !empty($city) || !empty($day_of_week) || !empty($time_block) || !empty($mode);

                if (!$hasCriteria) {
                    return [
                        'message' => 'Please provide at least one search criteria (skills, interests, timezone, city, or availability).',
                        'users' => []
                    ];
                }

                // Start building the query
                $query = Profile::query();
                $skillIds = [];

                // Filter by skills if provided
                if (!empty($skills)) {
                    $normalizedSkills = array_map(function ($skill) {
                        return trim($skill);
                    }, $skills);

                    $skillIds = Skill::where(function ($q) use ($normalizedSkills) {
                        foreach ($normalizedSkills as $skill) {
                            $q->orWhereRaw('LOWER(name) = LOWER(?)', [$skill]);
                        }
                    })
                        ->pluck('id')
                        ->toArray();

                    if (!empty($skillIds)) {
                        $query->whereHas('skills', function ($q) use ($skillIds) {
                            $q->whereIn('skills.id', $skillIds);
                        });
                    }
                }

                // Filter by interests if provided
                if (!empty($interests)) {
                    $normalizedInterests = array_map(function ($interest) {
                        return trim($interest);
                    }, $interests);

                    $interestIds = Interest::where(function ($q) use ($normalizedInterests) {
                        foreach ($normalizedInterests as $interest) {
                            $q->orWhereRaw('LOWER(name) = LOWER(?)', [$interest]);
                        }
                    })
                        ->pluck('id')
                        ->toArray();

                    if (!empty($interestIds)) {
                        $query->whereHas('interests', function ($q) use ($interestIds) {
                            $q->whereIn('interests.id', $interestIds);
                        });
                    }
                }

                // Filter by timezone if provided
                if (!empty($timezone)) {
                    $query->where('timezone', 'LIKE', '%' . trim($timezone) . '%');
                }

                // Filter by city if provided
                if (!empty($city)) {
                    $query->where('city', 'LIKE', '%' . trim($city) . '%');
                }

                // Filter by availability if provided
                if (!empty($day_of_week) || !empty($time_block) || !empty($mode)) {
                    $query->whereHas('availability', function ($q) use ($day_of_week, $time_block, $mode) {
                        if (!empty($day_of_week)) {
                            $q->where('day_of_week', strtoupper(trim($day_of_week)));
                        }
                        if (!empty($time_block)) {
                            $q->where('time_block', strtoupper(trim($time_block)));
                        }
                        if (!empty($mode)) {
                            $q->where('mode', strtoupper(trim($mode)));
                        }
                    });
                }

                // Get profiles with relationships
                $profiles = $query->with(['user', 'skills', 'interests', 'availability'])->get();

                // If skills were provided, filter to ensure profiles have ALL requested skills
                if (!empty($skills) && !empty($skillIds)) {
                    $profiles = $profiles->filter(function ($profile) use ($skillIds) {
                        $profileSkillIds = $profile->skills->pluck('id')->toArray();
                        return count(array_intersect($skillIds, $profileSkillIds)) === count($skillIds);
                    });
                }

                // Format the results
                $results = $profiles->map(function ($profile) {
                    return [
                        'name' => $profile->user->names,
                        'email' => $profile->user->email,
                        'bio' => $profile->bio,
                        'address' => $profile->address,
                        'city' => $profile->city,
                        'timezone' => $profile->timezone,
                        'skills' => $profile->skills->map(function ($skill) {
                            return [
                                'name' => $skill->name,
                                'level' => $skill->pivot->level,
                                'years_of_experience' => $skill->pivot->years_of_experience,
                            ];
                        })->toArray(),
                        'interests' => $profile->interests->pluck('name')->toArray(),
                        'availability' => $profile->availability ? [
                            'day_of_week' => $profile->availability->day_of_week,
                            'time_block' => $profile->availability->time_block,
                            'mode' => $profile->availability->mode,
                        ] : null,
                    ];
                })->toArray();

                return [
                    'message' => 'Found ' . count($results) . ' user(s) matching the criteria.',
                    'users' => $results
                ];
            });
    }
}