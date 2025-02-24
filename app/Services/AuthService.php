<?php

namespace App\Services;

use App\Models\User;
use App\Models\SMSList;
use App\Services\Sms\SmsServiceInterface;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AuthService
{
   private SmsServiceInterface $smsService;

   public function __construct(SmsServiceInterface $smsService)
   {
      $this->smsService = $smsService;
   }

   public function signIn(string $phone, int $code)
   {
      $sms = SMSList::where([
         ['phone', $phone],
         ['created_at', '>=', Carbon::now()->subMinutes(4)]
      ])->latest()->first();

      if (!$sms) {
         return response()->json(['message' => "Maxfiy kodning muddati tugagan", 'code' => 2], 404);
      }

      if ($sms->code !== $code) {
         return response()->json(['message' => "Maxfiy kod xato", 'code' => 1], 404);
      }

      $user = User::updateOrCreate(['phone' => $phone]);

      if (Auth::loginUsingId($user->id)) {
         $token = $this->createToken($user);
         return response()->json(['token' => $token, 'type' => 'Bearer'], 200);
      }

      return response()->json(['message' => 'Login failed'], 500);
   }

   public function sendSecretCode(string $phone)
   {
      $number = random_int(10000, 99999);
      $message = "'Shaharlararo online taxi' Maxfiy kodni kiriting $number https://onlinetaxi.ruzzifer.uz";

      $response = $this->smsService->sendSms($phone, $message);

      if (($response['status'] ?? null) === 'error' || ($response['message'] ?? null) === 'Expired') {
         return response()->json(['message' => $response], 403);
      }
      

      SMSList::create(['type' => 1, 'phone' => $phone, 'message' => $message, 'code' => $number]);

      return response()->json(['message' => 'success'], 200);
   }

   private function createToken(User $user): string
   {
      return $user->createToken('userToken', ['almighty'])->plainTextToken;
   }

   public function logout($request): void
   {
      $request->user()->currentAccessToken()->delete();
   }
}
