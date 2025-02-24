<?php

namespace App\Services\Sms;

interface SmsServiceInterface
{
   public function sendSms(string $phone, string $message): array;
}
