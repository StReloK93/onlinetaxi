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

        $message = $this->messageFormatter($passenger);


        $firebase->sendToTopic(
            "city_$passenger->start_city",
            [$message['title'], $message['description']],
            url("/passengers/$passenger->id/offers")
        );


        $tokens = $this->getCarRideUserTokens($passenger);

        if (count($tokens) === 0) return;

        $firebase->sendManyUser(
            $tokens,
            [$message['title'], $message['description']],
            url("/passengers/$passenger->id/offers")
        );
    }





    private function messageFormatter($passenger){
        $startCity = trim(str_replace(['shahri', 'tumani'], [''], $passenger->start->name));
        $endCity = trim(str_replace(['shahri', 'tumani'], [''], $passenger->end->name));

        $date = Carbon::parse($passenger->ride_time);
        $hour = Carbon::parse($passenger->ride_time)->format('H:s');
        $day = $date->format('d');


        $title = sprintf("%sdan %sga %s kishi", $startCity, $endCity, $passenger->count);
        $description = "$day-$date->monthName kuni soat $hour da $title bor. Agar yo'lingiz bo'lsa yo'lovchiga o'z taklifingizni qoldiring.";

        return [
            'title' =>  $title,
            'description' =>  $description,
        ];
    }



    private function getCarRideUserTokens($passenger){
        $user_ids = CarRide::where([
            ['start_city', $passenger->start_city],
            ['end_city', $passenger->end_city],
            ['state', 1],
        ])
            ->whereDate(
                'day',
                Carbon::parse($passenger->ride_time)->startOfDay()
            )
            ->get()
            ->pluck('user_id')
            ->unique()
            ->all();

        return FirebaseTokens::whereIn('user_id', $user_ids)
            ->get()
            ->pluck('token')
            ->all();
    }
}
