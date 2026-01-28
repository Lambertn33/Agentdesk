<?php

namespace App\Services;
use App\Models\User;
use App\Models\Message;
use Carbon\Carbon;

class MessageUserServices
{
    public function makeMessage($receiverId, $message)
    {
        return Message::create([
            'receiver_id' => $receiverId,
            'message' => $message
        ]);
    }

    private function baseUnreadQuery(int $userId)
    {
        return Message::query()
            ->where('receiver_id', $userId)
            ->where('is_read', false);
    }

    private function formatMessages($messages): array
    {
        return $messages->map(function ($m) {
            return [
                'message' => $m->message,
            ];
        })->values()->all();
    }

    private function unreadInRange(int $userId, Carbon $startUtc, Carbon $endUtc, int $limit): array
    {
        $messages = $this->baseUnreadQuery($userId)
            ->whereBetween('created_at', [$startUtc, $endUtc])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get(['id', 'message', 'created_at']);

        return [
            'ok' => true,
            'messages' => $this->formatMessages($messages),
        ];
    }

    public function getAllUnreadMessages(int $userId, int $limit = 5): array
    {
        $messages = $this->baseUnreadQuery($userId)
            ->latest()
            ->limit($limit)
            ->get(['id', 'message', 'created_at']);

        return [
            'ok' => true,
            'messages' => $this->formatMessages($messages),
        ];
    }

    public function getYesterdayUnreadMessages(int $userId, int $limit = 10): array
    {
        $startUtc = Carbon::now()->subDay()->startOfDay()->utc();
        $endUtc   = Carbon::now()->subDay()->endOfDay()->utc();

        return $this->unreadInRange($userId, $startUtc, $endUtc, $limit);
    }

    public function getThisWeekUnreadMessages(int $userId, int $limit = 10): array
    {

        $startUtc = Carbon::now()->startOfWeek(Carbon::MONDAY)->startOfDay()->utc();
        $endUtc   = Carbon::now()->utc();

        return $this->unreadInRange($userId, $startUtc, $endUtc, $limit);
    }

    public function getLastWeekUnreadMessages(int $userId, int $limit = 10): array
    {
        $startUtc = Carbon::now()->subWeek()->startOfWeek(Carbon::MONDAY)->startOfDay()->utc();
        $endUtc   = Carbon::now()->subWeek()->endOfWeek(Carbon::SUNDAY)->endOfDay()->utc();

        return $this->unreadInRange($userId, $startUtc, $endUtc, $limit);
    }

    public function getTodayUnreadMessages(int $userId, int $limit = 10): array
    {
        $startUtc = Carbon::now()
        ->startOfDay()
        ->utc();

        $endUtc = Carbon::now()
            ->utc();

        return $this->unreadInRange($userId, $startUtc, $endUtc, $limit);
    }

}