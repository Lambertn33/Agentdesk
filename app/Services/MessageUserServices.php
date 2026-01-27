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

    public function getMessages($userId, $limit = 5)
    {
        $messages = Message::where('receiver_id', $userId)
            ->where('is_read', false)
            ->latest()
            ->limit($limit)
            ->get();

        return [
            'ok' => true,
            'messages' => $messages->map(function($message){
                return [
                    'message' => $message->message
                ];
            })->values()->all()
        ];
    }
}