<?php

namespace App\AiAgents;

use LarAgent\Agent;

use LarAgent\Attributes\Tool;

use Illuminate\Support\Facades\Auth;

class GetMessagesAgent extends Agent
{
    protected $model = 'gpt-4.1-nano';

    protected $history = 'in_memory';

    protected $provider = 'default';

    protected $tools = [];

    public $authenticatedUser;

    public $isAuthenticated = false;

    public function __construct()
    {
        parent::__construct($this->provider);
    }

    protected function initializeAuth()
    {
        $this->authenticatedUser = Auth::user();
        $this->isAuthenticated = Auth::user() ? true : false;

    }

    public function onInitialize()
    {
        $this->initializeAuth();
    }

    public function instructions()
    {
        return view('prompts.get-user-messages');
    }

    public function prompt($message)
    {
        return $message;
    }

    #[Tool(
        description: 'Get the user messages',
    )]
    public function getUnreadMessages(): array
    {

        return [
            'user' => $this->authenticatedUser
        ];
    }
    
}
