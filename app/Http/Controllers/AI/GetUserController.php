<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use OpenAI\Exceptions\RateLimitException;
use Throwable;

class GetUserController extends Controller
{
    public function getUser(Request $request)
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'min:3', 'max:500'],
            'userId'  => ['required', 'integer', 'exists:users,id'],
        ]);

        try {
            $agent = app(\App\AiAgents\GetProfileAgent::class);

            $prompt = <<<TXT
                UserId: {$validated['userId']}
                Question: {$validated['message']}

                You MUST call getUser with the provided UserId, then answer using ONLY the returned user data.
                TXT;

            $reply = $agent->message($prompt)->respond();

            return response()->json([
                'assistantReply' => is_string($reply) ? $reply : (string)($reply ?? ''),
            ], 200);

        } catch (RateLimitException $e) {
            return response()->json([
                'assistantReply' => 'Rate limit reached. Please try again in a moment.',
            ], 429);

        } catch (Throwable $e) {
            Log::error('Get user chat failed', [
                'error' => $e->getMessage(),
                'userId' => $validated['userId'] ?? null,
            ]);

            return response()->json([
                'assistantReply' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }
}
