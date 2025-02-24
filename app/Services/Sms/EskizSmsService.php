<?php

namespace App\Services\Sms;

use Illuminate\Support\Facades\Http;
use App\Repositories\EskizTokenRepository;
use Illuminate\Support\Facades\Log;

class EskizSmsService implements SmsServiceInterface
{
	private EskizTokenRepository $tokenRepository;
	private string $apiUrl;

	public function __construct(EskizTokenRepository $tokenRepository)
	{
		$this->tokenRepository = $tokenRepository;
		$this->apiUrl = config('services.eskiz.api_url');
	}

	public function sendSms(string $phone, string $message): array
	{
		$token = $this->tokenRepository->getToken();
		if (!$token)
			$token = $this->tokenRepository->refreshToken();


		$response = Http::withToken($token)->post("$this->apiUrl/message/sms/send", [
			'mobile_phone' => $phone,
			'message' => $message,
			'from' => config('services.eskiz.sender'),
		]);

		$data = json_decode($response->body(), true);

		if ($response->failed()) {
			$errorMessage = $data['message'] ?? 'Unknown error';
			$statusCode = $response->status();

			// Логируем ошибку
			Log::error("Eskiz SMS Error", [
				'phone' => $phone,
				'status' => $statusCode,
				'error' => $errorMessage,
				'response' => $data,
			]);

			return [
				'status' => 'error',
				'message' => $errorMessage,
				'code' => $statusCode,
			];
		}


		if ($data['message'] === "Expired") {
			$this->tokenRepository->refreshToken();
			$this->sendSms($phone, $message);
		}

		return $data;
	}
}