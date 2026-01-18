<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;    
use App\Http\Controllers\AuthController;

Route::get('/', [HomeController::class, 'index']);
Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'login')->name('login');
    Route::get('/register', 'register')->name('register');
});
