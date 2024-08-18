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
   
}
 