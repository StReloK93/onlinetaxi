<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FirebaseTokens;
use App\Services\Firebase;
use DB;
class FirebaseTokensController extends Controller
{
    protected $firebase;
    public function __construct(){
        $this->firebase = new Firebase();
    }


    public function store(Request $request)
    {
        DB::table('firebase_tokens')->updateOrInsert([
            'token' => $request->token
        ], [
            'device' => 'online',
            'user_id' => $request->user_id
        ]);


        // $this->firebase->subscribeToTopic('uchquduq', $request->token);
        $tokenInformation = $this->firebase->tokenInformation($request->token);
        $allTopics = $tokenInformation['rel']['topics'] ?? null;


        if ($allTopics !== null) {
            return array_keys($allTopics);
        }
    
        // Handle the case where there are no topics, if needed.
        return [];
    }
}
