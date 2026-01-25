<?php

namespace App\AiAgents;
use App\Services\GetUserServices;
use LarAgent\Attributes\Tool;

use LarAgent\Agent;

class GetProfileAgent extends Agent
{
    protected $model = 'gpt-4.1-nano';

    protected $history = 'in_memory';

    protected $provider = 'default';

    protected int $maxSteps = 2;

    protected $tools = [];

    public function __construct()
    {
        parent::__construct($this->provider);
    }

    public function instructions()
    {
        return view('prompts.get-user');
    }

    public function prompt($message)
    {
        return $message;
    }

    #[Tool(
        description: 'Load the full user profile by id',
    )]
    public function getUser(int $userId): array
    {
        if ($userId <= 0) {
            return ['user' => null];
        }

        return [
            'user' => GetUserServices::getUserTool($userId),
        ];
    }
}
