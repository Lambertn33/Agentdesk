<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\AiAgents\SearchProfileAgent;
use Illuminate\Support\Facades\Log;
use OpenAI\Exceptions\RateLimitException;

class SearchUserController extends Controller
{
    public function searchUser(Request $request)
    {
        $validated = $request->validate([
            'prompt' => ['required', 'string', 'min:3', 'max:500'],
        ]);

        $prompt = trim($validated['prompt']);

        try {
            $agent = app(\App\AiAgents\SearchProfileAgent::class);

            $response = $agent->message($prompt)->respond();

            $searchMeta = request()->attributes->get('searchMeta', []);

            \Log::info('searchMeta', ['searchMeta' => $searchMeta]);

            if (!$response) {
                return back()->with([
                    'results' => [],
                    'searchMeta' => $searchMeta,
                    'status'  => 200,
                    'error'   => null,
                ]);
            }

            $users = $response->users ?? null;

            if (is_object($users) && method_exists($users, 'toArray')) {
                $users = $users->toArray();
            }

            if (!is_array($users)) {
                $users = [];
            }

            return back()->with([
                'results' => $users,
                'searchMeta' => $searchMeta,
                'status'  => 200,
                'error'   => null,
            ]);
        } catch (\Throwable $e) {
            \Log::error('Search user failed', [
                'error' => $e->getMessage(),
                'prompt' => $prompt,
            ]);

            return back()->with([
                'results' => [],
                'status'  => 200,
                'error'   => null,
                'searchMeta' => $searchMeta,
            ]);
        }
    }
}
