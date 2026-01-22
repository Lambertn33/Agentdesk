<?php

namespace App\Services;
use App\Models\User;
use App\Models\Message;

class MessageUserServices
{
    public function makeMessage($receiverId, $senderNames, $message)
    {
        return Message::create([
            'sender_names' => $senderNames,
            'receiver_id' => $receiverId,
            'message' => $message
        ]);
    }
}