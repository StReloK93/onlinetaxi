<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Services\FirebaseAuth;

class NotificationController extends Controller
{

   private $firebase;

   public function __construct()
   {
      $this->firebase = new FirebaseAuth();


   }
   public function sendNotification()
   {
      $token = 'f72XxhW7C1K2iJSzxBANav:APA91bEncfMZdv2Kc9IS5h2c2wgqDJdKlXqsAMQC5JV-iWrl7kog5bou6npJYX4scu1hDh7GI2KyVkubzCgQ8dndOZ0E4kUIU8-ch1XvH2aIYll3Obusn1xGv5IXxMVkwcnR53vvaTIZ';
      return $this->firebase->sendOneUser(
         $token, 
         ['Shaharlararo onlayn taxi', 'Assalom alekum bizning dasturga hush kelibsiz', 'https://picsum.photos/400/200'],
         url('/passengers')
      );
   }
}
