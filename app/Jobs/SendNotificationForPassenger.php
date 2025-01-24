<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\NotificationService;
class SendNotificationForPassenger implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $offersPassengerId;
    public function __construct($offersPassengerId)
    {
        $this->offersPassengerId = $offersPassengerId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        
        $notifyService = new NotificationService();
        $notifyService->sendPassengerFirebaseNotification($this->offersPassengerId);

        $notifyService->sendPassengerNotification($this->offersPassengerId);

    }


}
