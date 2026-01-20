<?php

namespace App\Services;

use Prism\Prism\Facades\Tool;
use Prism\Prism\Schema\StringSchema;
use Illuminate\Database\Eloquent\Builder;
use App\Models\User;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Interest;
use Illuminate\Support\Facades\Log;

class SearchUserServices
{
    public static function searchUserTool($payload)
    {
        Log::info('RAW payload', [
            'type' => gettype($payload),
            'payload' => $payload,
        ]);
        $criteria = self::decodeCriteria($payload);
        Log::info($criteria, ['criteria' =>  $criteria]);

        if ($criteria === null) {
            return ['users' => []];
        }

        $query = User::query()->select(['users.id', 'users.names', 'users.email']);
        $query->with([
            'profile:id,user_id,bio,address,city,timezone',
            'profile.skills' => function ($q) {
                $q->select(['skills.id', 'skills.name'])
                  ->withPivot(['profile_id', 'skill_id', 'level', 'years_of_experience']);
            },
            'profile.interests' => function ($q) {
                $q->select(['interests.id', 'interests.name'])
                  ->withPivot(['profile_id', 'interest_id']);
            },
        ]);
        

        Log::info('users', ['tag' => 'js']);
        self::applySkillsFilter(
            $query,
            $criteria['skills'] ?? [],
            $criteria['skillsMode'] ?? 'OR'
        );

        $users = $query->limit(25)->get();

        return [
            'users' => $users->map(function ($u) {
                return [
                    'id' => $u->id,
                    'names' => (string) $u->names,
                    'email' => (string) $u->email,
        
                    'profile' => $u->profile ? [
                        'id' => $u->profile->id,
                        'bio' => (string) ($u->profile->bio ?? ''),
                        'address' => (string) ($u->profile->address ?? ''),
                        'city' => (string) ($u->profile->city ?? ''),
                        'timezone' => (string) ($u->profile->timezone ?? ''),
        
                        'interests' => $u->profile->interests->map(fn ($i) => [
                            'id' => $i->id,
                            'name' => (string) $i->name,
                            'pivot' => [
                                'profile_id' => $i->pivot?->profile_id,
                                'interest_id' => $i->pivot?->interest_id,
                            ],
                        ])->values()->all(),
        
                        'skills' => $u->profile->skills->map(fn ($s) => [
                            'id' => $s->id,
                            'name' => (string) $s->name,
                            'pivot' => [
                                'profile_id' => $s->pivot?->profile_id,
                                'skill_id' => $s->pivot?->skill_id,
                                'level' => (string) ($s->pivot?->level ?? ''),
                                'years_of_experience' => (int) ($s->pivot?->years_of_experience ?? 0),
                            ],
                        ])->values()->all(),
                    ] : null,
                ];
            })->values()->all(),
        ];
    }

    private static function decodeCriteria($payload): ?array
{
    // If payload is already an array (common with tool calls)
    if (is_array($payload)) {
        $data = $payload;
    } else {
        // If payload is a JSON string
        $data = json_decode((string) $payload, true);
    }

    if (!is_array($data)) {
        Log::info('decodeCriteria: invalid payload', ['payload' => $payload]);
        return null;
    }

    $skills = self::normalizeStringArray($data['skills'] ?? []);

    $modeRaw = strtoupper(trim((string)($data['skillsMode'] ?? $data['mode'] ?? '')));
    $mode = (count($skills) <= 1)
        ? 'SINGLE'
        : (in_array($modeRaw, ['AND', 'OR'], true) ? $modeRaw : 'OR');

    return [
        'skills' => $skills,
        'skillsMode' => $mode,
    ];
}

    

    private static function normalizeStringArray($value): array
    {
        if (!is_array($value)) return [];
        return array_values(array_filter(array_map(
            fn ($s) => trim((string) $s),
            $value
        ), fn ($s) => $s !== ''));
    }

    private static function applySkillsFilter(Builder $query, array $skills, string $mode = 'OR'): void
    {
        if (empty($skills)) return;
    
        // Build per-skill id sets 
        $idSets = [];
    
        foreach ($skills as $skill) {
            $ids = Skill::query()
                ->where('name', 'LIKE', '%' . $skill . '%')
                ->pluck('id')
                ->all();
    
            // User asked for a skill that doesn't exist => no results possible
            if (empty($ids)) {
                $query->whereRaw('1 = 0');
                return;
            }
    
            $idSets[] = $ids;
        }
    
        if ($mode === 'OR') {
            $flatIds = array_values(array_unique(array_merge(...$idSets)));
    
            $query->whereHas('profile.skills', function ($q) use ($flatIds) {
                $q->whereIn('skills.id', $flatIds);
            });
    
            return;
        }
    
        // SINGLE or AND => must have all skills
        foreach ($idSets as $idsForOneSkill) {
            $query->whereHas('profile.skills', function ($q) use ($idsForOneSkill) {
                $q->whereIn('skills.id', $idsForOneSkill);
            });
        }
    }
    
}