<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\Firebase;
use Carbon\Carbon;
use App\Models\FirebaseTokens;
use App\Models\Passenger;
use App\Models\CarRide;
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
        $firebase = new Firebase();
        $passenger = Passenger::find($this->passengerId);


        $startCity = trim(str_replace(['shahri', 'tumani'], [''], $passenger->start->name));
        $endCity = trim(str_replace(['shahri', 'tumani'], [''], $passenger->end->name));

        $date = Carbon::parse($passenger->ride_time);
        $hour = Carbon::parse($passenger->ride_time)->format('H:s');
        $day = $date->format('d');
        $title = sprintf("%sdan %sga %s kishi", $startCity, $endCity, $passenger->count);


        $firebase->sendToTopic(
            "city_$passenger->start_city",
            [
                $title,
                "$day-$date->monthName kuni soat $hour da $title bor. Agar yo'lingiz bo'lsa yo'lovchiga o'z taklifingizni qoldiring.",
            ],
            url("/passengers/$passenger->id/offers")
        );


        CarRide::where([
            [
                'start_city' => $passenger->start_city,
                'end_city' => $passenger->end_city,
                'state' => 1
            ] 
        ])->get();
        $tokens = FirebaseTokens::all()->pluck('token');

        $firebase->sendManyUser(
            $tokens->all(),
            [
                $title,
                "$day-$date->monthName kuni soat $hour da $title bor. Agar yo'lingiz bo'lsa yo'lovchiga o'z taklifingizni qoldiring.",
            ],
            url("/passengers/$passenger->id/offers")
        );
    }
}
