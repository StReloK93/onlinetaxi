<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Sms\SmsServiceInterface;
use App\Services\Sms\EskizSmsService;
use App\Repositories\EskizTokenRepository;

class SmsServiceProvider extends ServiceProvider
{
   public function register()
   {
      $this->app->singleton(EskizTokenRepository::class, function () {
         return new EskizTokenRepository();
      });

      $this->app->singleton(SmsServiceInterface::class, function ($app) {
         return new EskizSmsService($app->make(EskizTokenRepository::class));
      });
   }
}