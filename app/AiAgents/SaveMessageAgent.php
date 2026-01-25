<?php

namespace App\AiAgents;

use LarAgent\Agent;
use App\Services\MessageUserServices;
use LarAgent\Attributes\Tool;

class SaveMessageAgent extends Agent
{
    protected $model = 'gpt-4.1-nano';

    protected $history = 'in_memory';

    protected $provider = 'default';

    protected $tools = [];

    public function __construct()
    {
        parent::__construct($this->provider);
    }

    public function instructions()
    {
        return view('prompts.save-message');
    }

    public function prompt($message)
    {
        return $message;
    }

    #[Tool(description: 'Save a message to the database. Payload: {"receiverId":1,"message":"Hi"}')]
    public function messageUser(int $receiverId, string $message): array
    {
        if ($receiverId <= 0 || $message === '') {
            return ['ok' => false];
        }

        $service = app(MessageUserServices::class);
        $row = $service->makeMessage($receiverId, $message);

        \Log::info("response", ['response' => $row]);

        return ['ok' => true, 'message_id' => $row->id];
    }
}
