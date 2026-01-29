<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('Profile', [
            'auth' => auth()->user(),
            'skills' => auth()->user()->profile->skills,
            'interests' => auth()->user()->profile->interests,
            'availability' => auth()->user()->profile->availability
        ]);
    }
}
