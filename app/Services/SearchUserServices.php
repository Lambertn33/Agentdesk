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

        if ($criteria === null) {
            request()->attributes->set('searchMeta', []);
            return ['ok' => true, 'users' => []];
        }

        request()->attributes->set('searchMeta', [
            'skills' => [
                'values' => $criteria['skills'] ?? [],
                'mode'   => $criteria['skillsMode'] ?? 'OR',
            ],
            'timezone' => [
                'values' => $criteria['timezone'] ?? [],
                'mode'   => $criteria['timezoneMode'] ?? 'OR',
            ],
            'interests' => [
                'values' => $criteria['interests'] ?? [],
                'mode'   => $criteria['interestsMode'] ?? 'OR',
            ],
        ]);

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
        
        self::applySkillsFilter(
            $query,
            $criteria['skills'] ?? [],
            $criteria['skillsMode'] ?? 'OR'
        );
        self::applyTimezoneFilter(
            $query,
            $criteria['timezone'] ?? [],
            $criteria['timezoneMode'] ?? 'OR'
        );

        self::applyInterestsFilter(
            $query, 
            $criteria['interests'] ?? [], 
            $criteria['interestsMode'] ?? 'OR');

        $users = $query->limit(25)->get();

        return [
            'ok' => true,
            'meta' => [
                'skills' => [
                    'values' => $criteria['skills'] ?? [],
                    'mode'   => $criteria['skillsMode'] ?? 'OR',
                ],
                'timezone' => [
                    'values' => $criteria['timezone'] ?? [],
                    'mode'   => $criteria['timezoneMode'] ?? 'OR',
                    'between' => $criteria['timezoneBetween'] ?? null,
                ],
                'interests' => [
                    'values' => $criteria['interests'] ?? [],
                    'mode'   => $criteria['interestsMode'] ?? 'OR',
                ],
            ],
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
        // 1) If tool already passed an array
        if (is_array($payload)) {
            $data = $payload;
        } else {
            $payloadStr = trim((string) $payload);
    
            // 2) Try JSON
            $data = json_decode($payloadStr, true);
    
            // 3) If still not JSON, treat as comma-separated skills
            if (!is_array($data)) {
                $skills = array_values(array_filter(array_map('trim', preg_split('/,|\bor\b|\band\b/i', $payloadStr))));
                return [
                    'skills' => $skills,
                    'skillsMode' => count($skills) <= 1 ? 'SINGLE' : 'OR',
                ];
            }
        }
    
        if (!is_array($data)) {
            Log::info('decodeCriteria: invalid payload', ['payload' => $payload]);
            return null;
        }

        // GET SKILLS
    
        $skills = self::normalizeStringArray($data['skills'] ?? []);
    
        $modeRaw = strtoupper(trim((string)($data['skillsMode'] ?? $data['mode'] ?? '')));
        $skillsMode = (count($skills) <= 1)
            ? 'SINGLE'
            : (in_array($modeRaw, ['AND', 'OR'], true) ? $modeRaw : 'OR');

        // GET TIMEZONE
        
        $timezones = self::normalizeStringArray($data['timezone'] ?? $data['timezones'] ?? []);
        $timezones = self::normalizeTimezones($timezones);

        $tzModeRaw = strtoupper(trim((string)($data['timezoneMode'] ?? $data['tzMode'] ?? $data['modeTimezone'] ?? '')));
        $timezoneMode = (count($timezones) <= 1)
            ? 'SINGLE'
            : (in_array($tzModeRaw, ['AND', 'OR'], true) ? $tzModeRaw : 'OR');

        
        // GET INTERESTS
        $interests = self::normalizeStringArray($data['interests'] ?? []);
        $interestModeRaw = strtoupper(trim((string)($data['interestsMode'] ?? $data['interestMode'] ?? '')));
        $interestsMode = (count($interests) <= 1)
            ? 'SINGLE'
            : (in_array($interestModeRaw, ['AND', 'OR'], true) ? $interestModeRaw : 'OR');
    
        return [
            'skills' => $skills,
            'skillsMode' => $skillsMode,

            'timezone' => $timezones,
            'timezoneMode' => $timezoneMode,

            'interests' => $interests,
            'interestsMode' => $interestsMode
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

    private static function normalizeTimezones(array $values): array
    {
        $out = [];

        foreach ($values as $raw) {
            $tz = strtoupper(trim((string) $raw));
            $tz = str_replace(['UTC', 'GMT'], 'GMT', $tz);
            $tz = preg_replace('/\s+/', '', $tz); // remove spaces

            // accept "+2", "-10", "GMT+2", "GMT-10"
            if (preg_match('/^(GMT)?([+-])(\d{1,2})$/', $tz, $m)) {
                $sign = $m[2];
                $num  = (int) $m[3];

                if ($num >= 0 && $num <= 12) {
                    $out[] = "GMT{$sign}{$num}";
                }
            }
        }

        return array_values(array_unique($out));
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

    private static function applyTimezoneFilter(Builder $query, array $timezones, string $mode = 'OR'): void
    {
        if (empty($timezones)) return;

        if ($mode === 'OR') {
            $query->whereHas('profile', function ($q) use ($timezones) {
                $q->whereIn('timezone', $timezones);
            });
            return;
        }

        // AND: a profile can't have two timezones at once, so AND only makes sense if same timezone repeated
        // We'll treat AND as "must match all" → if >1 unique timezone, force empty results
        $unique = array_values(array_unique($timezones));
        if (count($unique) > 1) {
            $query->whereRaw('1 = 0');
            return;
        }

        $query->whereHas('profile', function ($q) use ($unique) {
            $q->where('timezone', $unique[0]);
        });
    } 

    private static function applyInterestsFilter(Builder $query, array $interests, string $mode = 'OR'): void
    {
        if (empty($interests)) return;

        // Resolve IDs per interest name (LIKE matching)
        $idSets = [];

        foreach ($interests as $interestName) {
            $ids = Interest::query()
                ->where('name', 'LIKE', '%' . $interestName . '%')
                ->pluck('id')
                ->all();

            // if user asks for an interest that doesn't exist, no results possible
            if (empty($ids)) {
                $query->whereRaw('1 = 0');
                return;
            }

            $idSets[] = $ids;
        }

        if ($mode === 'OR') {
            $flatIds = array_values(array_unique(array_merge(...$idSets)));

            $query->whereHas('profile.interests', function ($q) use ($flatIds) {
                $q->whereIn('interests.id', $flatIds);
            });

            return;
        }

        // SINGLE / AND => must match all interests
        foreach ($idSets as $idsForOneInterest) {
            $query->whereHas('profile.interests', function ($q) use ($idsForOneInterest) {
                $q->whereIn('interests.id', $idsForOneInterest);
            });
        }
    }
}