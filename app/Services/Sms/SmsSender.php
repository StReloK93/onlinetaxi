<?php

namespace App\Services\Sms;

use App\Models\SMSList;

class SmsSender
{
   private SmsServiceInterface $smsService;

   public function __construct(SmsServiceInterface $smsService)
   {
      $this->smsService = $smsService;
   }

   public function sendSecretCode(string $phone)
   {
      if ($phone === '111111111') {
         SMSList::create([
            'type' => 1,
            'phone' => $phone,
            'message' => 'test',
            'code' => 11111,
         ]);

         return response()->json(['message' => 'success'], 200);
      }

      $code = random_int(10000, 99999);
      $message = "'Shaharlararo online taxi' Maxfiy kodni kiriting $code https://onlinetaxi.ruzzifer.uz";

      $response = $this->smsService->sendSms($phone, $message);

      if (($response['status'] ?? null) === 'error' || ($response['message'] ?? null) === 'Expired') {
         return response()->json(['message' => $response], 403);
      }

      SMSList::create([
         'type' => 1,
         'phone' => $phone,
         'message' => $message,
         'code' => $code,
      ]);

      return response()->json(['message' => 'success'], 200);
   }
}
