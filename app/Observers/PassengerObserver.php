<?php

namespace App\Observers;

use App\Models\Passenger;
use App\Services\Firebase;
use Carbon\Carbon;



class PassengerObserver
{

    protected $firebase;
    public function __construct()
    {
        $this->firebase = new Firebase();
    }
    /**
     * Handle the Passenger "created" event.
     */
    public function created(Passenger $passenger): void
    {
        
        $startCity = trim(str_replace(['shahri', 'tumani'], [''], $passenger->start->name));
        $endCity = trim(str_replace(['shahri', 'tumani'], [''], $passenger->end->name));
        
        $date = Carbon::parse($passenger->ride_time);
        $hour = Carbon::parse($passenger->ride_time)->format('H:s');
        $day = $date->format('d');
        $title = sprintf("%sdan %sga %s kishi", $startCity, $endCity, $passenger->count);
        $this->firebase->sendToTopic(
            "city_$passenger->start_city",
            [
                $title,
                "$day-$date->monthName kuni soat $hour da $title bor. Agar yo'lingiz bo'lsa yo'lovchiga o'z taklifingizni qoldiring.",
            ],
            url("/passengers/$passenger->id/offers")
        );


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
