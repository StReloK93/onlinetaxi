<?php

namespace App\Http\Controllers;

use App\Services\UserNotificationService;
use Illuminate\Http\Request;

class UserNotificationController extends Controller
{
   private UserNotificationService $notificationService;

   public function __construct(UserNotificationService $notificationService)
   {
      $this->notificationService = $notificationService;
   }

   public function getNotifications(Request $request)
   {
      return response()->json(
         $this->notificationService->getUserNotifications($request->user())
      );
   }

   public function getActiveNotifications(Request $request)
   {
      return response()->json(
         $this->notificationService->getActiveUserNotifications($request->user())
      );
   }

   public function updateNotifications(Request $request)
   {
      return response()->json([
         'updated' => $this->notificationService->markNotificationsAsRead($request->user())
      ]);
   }
}
