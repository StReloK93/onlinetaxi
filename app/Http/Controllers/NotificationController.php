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
   public function sendNotification()
   {
      $tokens = FirebaseTokens::all()->pluck('token');
      return $this->firebase->sendManyUser(
         $tokens->all(),
         [
            'Shaharlararo onlayn taxi',
            'Assalom alekum bizning dasturga hush kelibsiz',
            'https://picsum.photos/400/200'
         ],
         url('/passengers')
      );
   }
}
