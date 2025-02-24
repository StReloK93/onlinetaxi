<?php

namespace App\Observers;

use App\Models\Passenger;
use App\Jobs\SendNotificationForDrivers;
class PassengerObserver
{

    public function __construct()
    {
    }
    /**
     * Handle the Passenger "created" event.
     */
    public function created(Passenger $passenger): void
    {
        SendNotificationForDrivers::dispatch($passenger->id);
    }

    /**
     * Handle the Passenger "updated" event.
     */
    public function updated(Passenger $passenger): void
    {
        //
    }

    /**
     * Handle the Passenger "deleted" event.
     */
    public function deleted(Passenger $passenger): void
    {
        //
    }

    /**
     * Handle the Passenger "restored" event.
     */
    public function restored(Passenger $passenger): void
    {
        //
    }

    /**
     * Handle the Passenger "force deleted" event.
     */
    public function forceDeleted(Passenger $passenger): void
    {
        //
    }
}
