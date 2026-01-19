<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\SkillCategory;
use App\Models\Interest;
use App\Models\User;
use App\Models\Profile;
use App\Services\AuthServices;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    protected $authServices;

    public function __construct(AuthServices $authServices)
    {
        $this->authServices = $authServices;
    }

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
        $request->validate([
            'names' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'bio' => 'nullable|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'timezone' => 'required|string',
            'skillsExperience' => 'required|array|min:1',
            'interests' => 'required|array|min:1',
        ]);

        try {
            DB::beginTransaction();
            $data = $request->all();
        
            $user = $this->authServices->createUser($data);
            $profile = $this->authServices->createProfile($user, $data);

            if (!empty($data['skillsExperience'])) {
                $this->authServices->attachProfileSkills($profile, $data['skillsExperience']);
            }

            if (!empty($data['interests'])) {
                $this->authServices->attachProfileInterests($profile, $data['interests']);
            }
            DB::commit();
            Auth::login($user);
            return redirect()->route('home');

        } catch (\Throwable $th) {
            DB::rollBack();
            return back()->withErrors([
                'email' => 'An error occurred while registering. Please try again.',
            ]);
        }
    }

    public function postlogout()
    {
        Auth::logout();
        return back();
    }

    public function verifyEmailExistence(Request $request)
    {
       $checkEmail = User::where('email', $request->email)->exists();
       return response()->json(['exists' => $checkEmail]);
    }
}
