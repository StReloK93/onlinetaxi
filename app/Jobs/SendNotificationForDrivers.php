<?php

namespace App\Jobs;

use App\Services\NotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
class SendNotificationForDrivers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $passengerId;

    public function __construct($passengerId)
    {
        $this->passengerId = $passengerId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        
        $notifyService =  new NotificationService();
        $notifyService->sendDriverFirebaseNotification($this->passengerId);

        $notifyService->sendDriverNotification($this->passengerId);

    }

}
