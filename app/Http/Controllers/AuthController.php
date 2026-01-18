<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\SkillCategory;
use App\Models\Interest;

class AuthController extends Controller
{
    public function getlogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function getregister()
    {
        $skillCategories = SkillCategory::with('skills')->orderBy('name', 'asc')->get();
        $interests = Interest::orderBy('name', 'asc')->get();
        return Inertia::render('Auth/Register', compact('skillCategories', 'interests'));
    }

    public function postlogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            return redirect()->route('home');
        }

        return back()->withErrors([
            'email' => 'Invalid credentials',
        ]);
    }

    public function postregister(Request $request)
    {
        // $request->validate([
        //     'name' => 'required|string|max:255',
        //     'email' => 'required|email|unique:users',
        //     'password' => 'required|string|min:8|confirmed',
        // ]);
        dd($request->all());
        
    }

    public function postlogout()
    {
        Auth::logout();
        return back();
    }
}
