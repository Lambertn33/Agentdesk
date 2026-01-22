<?php

namespace App\AiAgents;
use App\Services\GetUserServices;
use App\Services\MessageUserServices;
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

    #[Tool(description: 'Send a message to a user. Payload is JSON: {"receiverId":1,"senderNames":"Lambert","message":"Hi"}')]
    public function messageUser(string $payload): array
    {
        $data = json_decode($payload, true);
    
        if (!is_array($data)) {
            return ['ok' => false, 'error' => 'Invalid payload (must be JSON).'];
        }
    
        $receiverId  = (int)($data['receiverId'] ?? 0);
        $senderNames = trim((string)($data['senderNames'] ?? ''));
        $message     = trim((string)($data['message'] ?? ''));
    
        if ($receiverId <= 0 || $senderNames === '' || $message === '') {
            return ['ok' => false, 'error' => 'Invalid receiver/sender/message.'];
        }
    
        $service = app(MessageUserServices::class);
    
        Log::info('Sending message', [
            'receiverId' => $receiverId,
            'senderNames' => $senderNames,
        ]);
    
        $row = $service->makeMessage($receiverId, $senderNames, $message);
    
        return ['ok' => true, 'message_id' => $row->id];
    }
}
