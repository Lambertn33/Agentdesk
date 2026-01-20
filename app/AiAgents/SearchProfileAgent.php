<?php

namespace App\AiAgents;

use LarAgent\Agent;
use LarAgent\Attributes\Tool;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Skill;
use App\Services\SearchUserServices;
use App\DataModels\UsersResponse;

class SearchProfileAgent extends Agent
{
    protected $model = 'gpt-4.1-nano';
    // protected $history = 'session';
    // protected $provider = 'default';
    protected $history = 'session';
    protected $provider = 'default';
    protected int $maxSteps = 1;
    protected $responseSchema = UsersResponse::class;

    public function __construct()
    {
        parent::__construct($this->provider);
    }

    public function instructions()
    {
        return view('prompts.search-user');
    }

    public function prompt($message)
    {
        return $message;
    }

    #[Tool(description: 'Search users based on skills in their profile')]
    public function searchUsers(string $payload): array
    {
        return SearchUserServices::searchUserTool($payload);
    }
}
