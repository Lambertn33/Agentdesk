<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageUserController extends Controller
{
    public function messageUser(Request $request)
    {
        $validated = $request->validate([
            'receiverId' => ['required', 'integer', 'exists:users,id'],
            'message'    => ['required', 'string', 'min:1', 'max:500'],
        ]);
    
        try {
            $agent = app(\App\AiAgents\SaveMessageAgent::class);
    
            $prompt = <<<TXT
                receiverId: {$validated['receiverId']}
                message: {$validated['message']}
            TXT;

    
            $reply = $agent->message($prompt)->respond();
    
            return response()->json([
                'assistantReply' => is_string($reply) ? $reply : (string)($reply ?? ''),
            ], 200);
    
        } catch (\Throwable $e) {
            \Log::error('Message user chat failed', [
                'error' => $e->getMessage(),
                'receiverId' => $validated['receiverId'],
            ]);
    
            return response()->json([
                'assistantReply' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }
}
