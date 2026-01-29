<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;    
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AI\SearchUserController;
use App\Http\Controllers\AI\MessagesController;
use App\Http\Controllers\ProfileController;


Route::get('/', [HomeController::class, 'index'])->name('home');
Route::controller(AuthController::class)->group(function () {
    Route::prefix('login')->group(function () {
        Route::get('/', 'getlogin')->name('login.get');
        Route::post('/', 'postlogin')->name('login.post');
    });
    Route::prefix('register')->group(function () {
        Route::get('/', 'getregister')->name('register.get');
        Route::post('/', 'postregister')->name('register.post');
    });
    Route::post('/verify-email', 'verifyEmailExistence')->name('verify.email');
    Route::post('/logout', 'postlogout')->name('logout.post')->middleware('auth');
});

Route::controller(SearchUserController::class)->prefix('search-user')->group(function() {
    Route::post('/', 'searchUser');
});

Route::get('/profile', ProfileController::class)->middleware('auth');

Route::prefix('messages')->group(function() {
    Route::post('/', [MessagesController::class, 'store']);
});