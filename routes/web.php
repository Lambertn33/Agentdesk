<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;    
use App\Http\Controllers\AuthController;
use App\Services\SearchUserServices;
use Prism\Prism\Facades\Prism;
use Prism\Prism\Enums\Provider;

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
   try {
    $searchUserTool = SearchUserServices::searchUserTool();
    $response = Prism::text()
        ->using(Provider::OpenAI, 'gpt-4')
        ->withTools([$searchUserTool])
        ->withMaxSteps(2)
        ->withPrompt('Find me developer with skills in React and TypeScript')
        ->asText();

    echo "No error";
    echo $response->text;
   } catch (\Throwable $th) {
    dd($th);
   }
});