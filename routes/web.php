<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;    
use App\Http\Controllers\AuthController;
use App\Services\SearchUserServices;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Enums\Provider;
use App\AiAgents\SearchProfileAgent;

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

Route::get('/search-user', function() {
    $searchProfileAgent = new SearchProfileAgent();
    $response = $searchProfileAgent->message('Can we get users who are skilled in Kubernetes?')->respond();
    return response()->json($response->users);
});

Route::get("/users", function() {
    return \App\Models\User::with('profile.skills')->with('profile.interests')->get();
});