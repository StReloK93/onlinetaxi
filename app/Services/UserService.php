<?php

namespace App\Services;

use Auth;
use App\Models\User;
use App\Models\SMSList;
use Carbon\Carbon;
class UserService
{

    public function signIn($request)
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
        if($request->phone == '111111111'){
            // for Test
            SMSList::create([
                'type' => 1,
                'phone' => $request->phone,
                'message' => 'test',
                'code' => 11111,
            ]);
            return response()->json(['message'=> 'success'], 200);
        }




        
        $number = random_int(10000, 99999);
        $message = "'Shaharlararo online taxi' Maxfiy kodni kiriting $number https://onlinetaxi.ruzzifer.uz";
        $data = EskizSmsService::sendSecretCode($request->phone, $message);
        if (($data->status ?? null) === 'error' ?? ($data->message ?? null) === 'Expired') return response()->json(['message' => $data], 403);

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



    public function logout($request): void
    {

        $user = $request->user();
        $user->currentAccessToken()->delete();

    }


    public function setUserNameRole($request){
        $user = $request->user();
        $user->name = $request->name;
        $user->role_id = $request->role;
        $user->save();

        return $user->fresh();
    }

    public function getAuthUser($request)
    {
        return $request->user();
    }

}