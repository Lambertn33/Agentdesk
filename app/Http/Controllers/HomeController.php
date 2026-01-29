<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        if(!Auth::check()) {
            return Inertia::render('Home', [
                'title' => 'Agent Desk',
                'auth' => [
                    'user' => null,
                ],
            ]);
        } else {
            return Inertia::render('Messages', [
                'title' => 'Agent Desk',
                'auth' => [
                    'user' => auth()->user(),
                ],
                'receivedMessages' => auth()->user()->receivedMessages
            ]);
        }
    }
}
