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






    // public function getAllUnreadMessages($userId, $limit = 5)
    // {
    //     $messages = Message::where('receiver_id', $userId)
    //         ->where('is_read', false)
    //         ->latest()
    //         ->limit($limit)
    //         ->get();

    //     return [
    //         'ok' => true,
    //         'messages' => $messages->map(function($message){
    //             return [
    //                 'message' => $message->message
    //             ];
    //         })->values()->all()
    //     ];
    // }

    // public function getYesterdayUnreadMessages($userId, $limit = 10)
    // {
    //     $start = Carbon::now()->subDay()->startOfDay()->utc();
    //     $end   = Carbon::now()->subDay()->endOfDay()->utc();

    //     \Log::info('yesterday', ['data' => $start]);

    //     $messages = Message::query()
    //         ->where('receiver_id', $userId)
    //         ->where('is_read', false)
    //         ->whereBetween('created_at', [$start, $end])
    //         ->orderByDesc('created_at')
    //         ->limit($limit)
    //         ->get(['id', 'message', 'created_at']);

    //     return [
    //         'ok' => true,
    //         'messages' => $messages->map(function($message){
    //             return [
    //                 'message' => $message->message
    //             ];
    //         })->values()->all()
    //     ];
    // }

    // public function getThisWeekUnreadMessages($userId, $limit = 10)
    // {
    //     $start = Carbon::now()->startOfWeek(Carbon::MONDAY)->startOfDay()->utc();
    //     $end   = Carbon::now()->utc();

    //     \Log::info('this week start', ['data' => $start]);
    //     \Log::info('this week end', ['data' => $end]);

    //     $messages = Message::query()
    //         ->where('receiver_id', $userId)
    //         ->where('is_read', false)
    //         ->whereBetween('created_at', [$start, $end])
    //         ->orderByDesc('created_at')
    //         ->limit($limit)
    //         ->get(['id', 'message', 'created_at']);

    //     return [
    //         'ok' => true,
    //         'messages' => $messages->map(function($message){
    //             return [
    //                 'message' => $message->message
    //             ];
    //         })->values()->all()
    //     ];
    // }

    // public function getLastWeekUnreadMessages($userId, $limit = 10)
    // {
    //     $start = Carbon::now()
    //         ->subWeek()
    //         ->startOfWeek(Carbon::MONDAY)
    //         ->startOfDay()
    //         ->utc();

    //     $end = Carbon::now()
    //         ->subWeek()
    //         ->endOfWeek(Carbon::SUNDAY)
    //         ->endOfDay()
    //         ->utc();

    //     \Log::info('last week start', ['data' => $start]);
    //     \Log::info('last week end', ['data' => $end]);

    //     $messages = Message::query()
    //         ->where('receiver_id', $userId)
    //         ->where('is_read', false)
    //         ->whereBetween('created_at', [$start, $end])
    //         ->orderByDesc('created_at')
    //         ->limit($limit)
    //         ->get(['id', 'message', 'created_at']);

    //     return [
    //         'ok' => true,
    //         'messages' => $messages->map(function($message){
    //             return [
    //                 'message' => $message->message
    //             ];
    //         })->values()->all()
    //     ];
    // }
}