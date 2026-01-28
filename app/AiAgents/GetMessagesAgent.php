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
        description: 'Get all the user messages',
    )]
    public function getUnreadMessages(): array
    {
        $service = app(MessageUserServices::class);
        $messages = $service->getAllUnreadMessages($this->authenticatedUser->id);
        \Log::info('user all messages', $messages);
        return $messages;
    }
    
    #[Tool(
        description: 'Get all the user messages from only yesterday',
    )]
    public function getYesterdayUnreadMessages(): array
    {
        $service = app(MessageUserServices::class);
        $messages = $service->getYesterdayUnreadMessages($this->authenticatedUser->id);
        \Log::info('user yesterday messages', $messages);
        return $messages;
    }

    #[Tool(
        description: 'Get all the user messages from only this current week',
    )]
    public function getThisWeekUnreadMessages(): array
    {
        $service = app(MessageUserServices::class);
        $messages = $service->getThisWeekUnreadMessages($this->authenticatedUser->id);
        \Log::info('user yesterday messages', $messages);
        return $messages;
    }

    #[Tool(
        description: 'Get all the user messages from only this current week',
    )]
    public function getLastWeekUnreadMessages(): array
    {
        $service = app(MessageUserServices::class);
        $messages = $service->getLastWeekUnreadMessages($this->authenticatedUser->id);
        \Log::info('user yesterday messages', $messages);
        return $messages;
    }
}
