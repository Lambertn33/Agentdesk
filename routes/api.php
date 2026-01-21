<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AI\GetUserController;

Route::controller(GetUserController::class)->prefix('get-user')->group(function() {
    Route::post('/', 'getUser');
});