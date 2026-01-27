<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessagesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'prompt' => ['required', 'string', 'min:1', 'max:500'],
        ]);

        \Log::info('Auth', [
            'error' => Auth::user()
        ]);
        
        try {
            $agent = app(\App\AiAgents\GetMessagesAgent::class);

            $prompt = trim($validated['prompt']);

            $reply = $agent->message($prompt)->respond();

            return response()->json([
                'assistantReply' => is_string($reply) ? $reply : (string)($reply ?? ''),
            ], 200);
        } catch (\Throwable $e) {
            \Log::error('Message user chat failed', [
                'error' => $e->getMessage(),
                'prompt' => $validated['prompt'],
            ]);
    
            return response()->json([
                'assistantReply' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }
}
