<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Services\Firebase;
use App\Models\FirebaseTokens;

class NotificationController extends Controller
{

   private $firebase;

   public function __construct()
   {
      $this->firebase = new Firebase();
   }
   public function sendToTopic()
   {
      // $tokens = FirebaseTokens::all()->pluck('token');
      return $this->firebase->sendToTopic(
         'city_81',
         [
            'Uchquduq shahridan Navoiga 2 kishi bor',
            "Iltimos ketadigan bo'lsalaring qanchaga va qachon olib ketishingizni yozib yuboring.",
         ],
         url('/passengers')
      );
      
   }



   
}
 