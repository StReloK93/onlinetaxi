<?php

namespace App\Services;

use Auth;
use App\Models\User;
use App\Models\SMSList;
use Carbon\Carbon;
class UserService
{

    public function login($request)
    {

        $sms = SMSList::where([
            ['phone', $request->phone],
            ['created_at' , '>=' , Carbon::now()->subMinutes(4)]
        ])->latest()->first();

        if(isset($sms)){
            if($sms->code == $request->code){
                $user = User::updateOrCreate(['phone' => $request->phone]);
                if (Auth::loginUsingId($user->id)) {
        
                    $user = Auth::user();
                    $token = $this->createToken($user);
                    return response()->json(['token' => $token, 'type' => 'Bearer'], 200);
        
                }
            }
            else{
                return response()->json(['message' => "Maxfiy kod to'g'ri kelmadi", 'code' => 1], 404);
            }

        }
        else{
            return response()->json(['message' => "Maxfiy kodni muddati tugadi", 'code' => 2], 404);
        }
    }

    public static function sendSecretCode($request)
    {
        $number = random_int(10000, 99999);
        $message = "'Online taxi' Maxfiy kodni kiriting $number";
        // $data = EskizSmsService::sendSecretCode($request->phone, $message);
        // if ($data->status == "error") return response()->json(['message' => $data], 403);

        SMSList::create([
            'type' => 1,
            'phone' => $request->phone,
            'message' => $message,
            'code' => $number,
        ]);
        
        return response()->json(['message'=> 'success'], 200);
    }
    private function createToken($user)
    {
        return $user->createToken('userToken', ['almighty'])->plainTextToken;
    }

    public function getUser($request)
    {
        return $request->user();
    }


    public function logout($request): void
    {

        $user = $request->user();
        $user->currentAccessToken()->delete();

    }


    public function setUserData($request){
        $user = $request->user();
        $user->name = $request->name;
        $user->role_id = $request->role;
        $user->save();

        return $user->fresh();
    }

}