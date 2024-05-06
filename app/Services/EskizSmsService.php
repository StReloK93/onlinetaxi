<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\ApiToken;

class EskizSmsService
{

	public function generateToken()
	{

		$response = Http::post('https://notify.eskiz.uz/api/auth/login', [
			'email' => 'strelok0493@gmail.com',
			'password' => 'ExCXlP1uvq5SagqkiEYccDySbuBKosqOl1tVoZge',
		]);

		$result = $response->body();
		$token = json_decode($result)->data->token;

		ApiToken::updateOrCreate(
			['name' => 'eskizSms'],
			['token' => $token]
		);

	}


	public static function sendSecretCode($phone, $message)
	{
		$eskiz = ApiToken::where('name', 'eskizSms')->first();
		$response = Http::withToken($eskiz->token)->post('notify.eskiz.uz/api/message/sms/send', [
			'mobile_phone' => $phone,
			'message' => $message,
			'from' => '4546'
		]);

		return json_decode($response->body());
	}
}