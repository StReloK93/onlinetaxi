<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FirebaseTokens;
use DB;
class FirebaseTokensController extends Controller
{
    public function store(Request $request)
    {
        return DB::table('firebase_tokens')->updateOrInsert([
            'token' => $request->token
        ], [
            'device' => 'online',
            'user_id' => $request->user_id
        ]);
    }
}
