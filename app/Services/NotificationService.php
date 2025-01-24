<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\FirebaseTokens;
use App\Models\CarRide;
use App\Models\OffersPassenger;
use App\Models\Passenger;
use App\Models\Notification;
class NotificationService
{
   public function sendDriverFirebaseNotification($passengerId)
   {
      $firebase = new Firebase();
      $passenger = Passenger::find($passengerId);
      $message = $this->messagePassengerFormatter($passenger);


      $firebase->sendToTopic(
         "city_$passenger->start_city",
         [$message['title'], $message['description']],
         $message['url']
      );


      $tokens = $this->getCarRideUserTokens($passenger);
      if (count($tokens)) {
         $firebase->sendManyUser(
            $tokens,
            [$message['title'], $message['description']],
            $message['url']
         );
      }
   }

   public function sendPassengerFirebaseNotification($offersPassengerId)
   {
      $firebase = new Firebase();
      //
      $offerPassenger = OffersPassenger::find($offersPassengerId);
      $message = $this->messageOfferFormatter($offerPassenger);

      $passenger = Passenger::find($offerPassenger->passenger_id);
      $tokens = $this->getPassengerUserTokens($passenger->user_id);

      if (count($tokens) != 0) {
         $firebase->sendManyUser(
            $tokens,
            [
               $message['title'],
               $message['description']
            ],
            $message['url'],
         );
      }
   }


   public function sendPassengerNotification($offersPassengerId){
      $offerPassenger = OffersPassenger::find($offersPassengerId);
      $message = $this->messageOfferFormatter($offerPassenger);

      $passenger = Passenger::find($offerPassenger->passenger_id);
      $offerPassenger->passenger_id;
      Notification::create([
         'user_id' => $passenger->user_id,
         'title' => $message['title'],
         'description' => $message['description'],
         'url' => $message['short_url'],
      ]);
   }

   public function sendDriverNotification($passengerId){
      $passenger = Passenger::find($passengerId);
      $message = $this->messagePassengerFormatter($passenger);
      $listenerUserIds = FirebaseTokens::where('device', $passenger->start_city)->get()->pluck('user_id')->all();

      foreach ($listenerUserIds as $key => $user_id) {
         Notification::create([
            'user_id' => $user_id,
            'title' => $message['title'],
            'description' => $message['description'],
            'url' => $message['short_url'],
         ]);
      }
   }


   public function getPassengerUserTokens($passenger_user_id)
   {
      return FirebaseTokens::where('user_id', $passenger_user_id)
         ->get()
         ->pluck('token')
         ->all();
   }

   public function messagePassengerFormatter($passenger)
   {

      $startCity = trim(str_replace(['shahri', 'tumani'], [''], $passenger->start->name));
      $endCity = trim(str_replace(['shahri', 'tumani'], [''], $passenger->end->name));

      $date = Carbon::parse($passenger->ride_time);
      $hour = Carbon::parse($passenger->ride_time)->format('H:s');
      $day = $date->format('d');


      $title = sprintf("%sdan %sga %s kishi", $startCity, $endCity, $passenger->count);
      $description = "$day-$date->monthName kuni soat $hour da $title bor. Agar yo'lingiz bo'lsa yo'lovchiga o'z taklifingizni qoldiring.";

      $url = "/passengers/$passenger->id/offers";
      return [
         'title' => $title,
         'description' => $description,
         'url' => url($url),
         'short_url' => $url,
      ];
   }

   public function messageOfferFormatter(OffersPassenger $offerPassenger)
   {
      $carName = $offerPassenger->user_car->car->name;

      $offerPassenger->ride_time;

      $date = Carbon::parse($offerPassenger->ride_time);
      $hour = Carbon::parse($offerPassenger->ride_time)->format('H:s');
      $day = $date->format('d');
      $url = "/passengers/$offerPassenger->passenger_id/offers";
      return [
         'title' => 'Sizga haydovchidan taklif tushdi',
         'description' => "$carName haydovchisi $day-$date->monthName kuni soat $hour da sizni $offerPassenger->price so'mga olib keta olaman deb taklif berdi.Sizga maqul bo'lsa haydovchiga aloqaga chiqing.",
         'url' => url($url),
         'short_url' => $url,
      ];
   }


   public function getCarRideUserTokens($passenger)
   {
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