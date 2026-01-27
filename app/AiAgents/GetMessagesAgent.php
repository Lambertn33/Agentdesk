<?php

namespace App\AiAgents;

use LarAgent\Agent;

use LarAgent\Attributes\Tool;
use App\Services\MessageUserServices;
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
        $this->isAuthenticated = Auth::check();

    }

    public function onInitialize()
    {
        $this->initializeAuth();
    }

    public function instructions()
    {
        return view('prompts.get-user-messages', [
            'isAuthenticated' => $this->isAuthenticated
        ]);
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
        $service = app(MessageUserServices::class);
        $messages = $service->getMessages($this->authenticatedUser->id);
        \Log::info('user messages', $messages);
        return $messages;
    }
    
}
