<?php

namespace App\Observers;

use App\Models\OffersPassenger;
use App\Jobs\SendNotificationForPassenger;
class OffersPassengerObserver
{
    /**
     * Handle the OffersPassenger "created" event.
     */
    public function created(OffersPassenger $offersPassenger): void
    {
        SendNotificationForPassenger::dispatch($offersPassenger->id);
    }

    /**
     * Handle the OffersPassenger "updated" event.
     */
    public function updated(OffersPassenger $offersPassenger): void
    {
        //
    }

    /**
     * Handle the OffersPassenger "deleted" event.
     */
    public function deleted(OffersPassenger $offersPassenger): void
    {
        //
    }

    /**
     * Handle the OffersPassenger "restored" event.
     */
    public function restored(OffersPassenger $offersPassenger): void
    {
        //
    }

    /**
     * Handle the OffersPassenger "force deleted" event.
     */
    public function forceDeleted(OffersPassenger $offersPassenger): void
    {
        //
    }
}
