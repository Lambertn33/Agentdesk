<?php

namespace App\Http\Controllers\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetUserController extends Controller
{
    public function getUser(Request $request)
    {
        return response()->json([
            'message' => 'Hiiii'
        ]);
    }
}
