<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MessageUserController extends Controller
{
    public function messageUser(Request $request)
    {
        $validated = $request->validate([
            'message'    => ['required', 'string', 'min:3', 'max:500'],
            'receiverId' => ['required', 'integer', 'exists:users,id'],
        ]);
    
        try {
            $agent = app(\App\AiAgents\GetProfileAgent::class);
    
            $prompt = json_encode([
                'receiverId' => (int)$validated['receiverId'],
                'message'    => $validated['message'],
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            
            $reply = $agent->message($prompt)->respond();
    
            return response()->json([
                'ok' => true,
                'assistantReply' => is_string($reply) ? $reply : ($reply->text ?? ''),
            ]);
        } catch (\Throwable $th) {
            Log::error('Message user failed', [
                'error' => $th->getMessage(),
                'receiverId' => $validated['receiverId'],
            ]);
    
            return response()->json([
                'ok' => false,
                'assistantReply' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }
    
}
