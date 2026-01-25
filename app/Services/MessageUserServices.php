<?php

namespace App\Services;
use App\Models\User;
use App\Models\Message;

class MessageUserServices
{
    public function makeMessage($receiverId, $message)
    {
        return Message::create([
            'receiver_id' => $receiverId,
            'message' => $message
        ]);
    }
}