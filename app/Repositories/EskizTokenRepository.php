<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Http;
use App\Models\ApiToken;

class EskizTokenRepository
{
   private string $apiUrl;
   private string $email;
   private string $password;
   public function __construct()
   {
      $this->apiUrl = config('services.eskiz.api_url');
      $this->email = config('services.eskiz.email');
      $this->password = config('services.eskiz.password');
   }
   public function getToken(): ?string
   {
      return ApiToken::where('name', 'eskizSms')->value('token');
   }

   public function refreshToken(): string
   {
      $response = Http::post("$this->apiUrl/auth/login", [
         'email' => $this->email,
         'password' => $this->password,
      ]);

      $token = json_decode($response->body())->data->token;

      ApiToken::updateOrCreate(['name' => 'eskizSms'], ['token' => $token]);

      return $token;
   }
}