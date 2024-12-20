<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Passenger;
use App\Models\OffersPassenger;
use App\Services\Firebase;
use App\Models\FirebaseTokens;
use Carbon\Carbon;
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
        $firebase = new Firebase();
        //
        $offerPassenger = OffersPassenger::find($this->offersPassengerId);
        $offerPassenger->user_car->car->name;

        $offerPassenger->ride_time;

        $date = Carbon::parse($offerPassenger->ride_time);
        $hour = Carbon::parse($offerPassenger->ride_time)->format('H:s');
        $day = $date->format('d');

        $passenger = Passenger::find($offerPassenger->passenger_id);
        $tokens = $this->getPassengerUserTokens($passenger);

        if (count($tokens) === 0) return;

        $firebase->sendManyUser(
            $tokens, 
            [
                'Sizda haydovchidan taklif bor',
                "Cobalt haydovchisi $day-$date->monthName kuni soat $hour da sizni $offerPassenger->price so'mga olib keta olaman deb taklif berdi.Sizga maqul bo'lsa haydovchiga aloqaga chiqing."
            ],
            url("/passengers/$offerPassenger->passenger_id/offers"));
    }



    private function getPassengerUserTokens($passenger){

        return FirebaseTokens::where('user_id', $passenger->user_id)
        ->get()
        ->pluck('token')
        ->all();
    }
}
