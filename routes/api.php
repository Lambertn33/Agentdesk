<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AI\GetUserController;
use App\Http\Controllers\AI\MessageUserController;
use App\Http\Controllers\AI\MessagesController;

Route::controller(GetUserController::class)->prefix('get-user')->group(function() {
    Route::post('/', 'getUser');
});

Route::controller(MessageUserController::class)->prefix('message-user')->group(function() {
    Route::post('/', 'messageUser');
});
