<?php

namespace App\Services;

use App\Models\User;

class UserNotificationService
{
   public function getUserNotifications(User $user)
   {
      return $user->notifications()
         ->where('created_at', '>', now()->subDays(3))
         ->orderBy('id', 'desc')
         ->get();
   }

   public function getActiveUserNotifications(User $user)
   {
      return $user->notifications()
         ->where([
            ['created_at', '>', now()->subDays(2)],
            ['readed', false],
         ])
         ->get();
   }

   public function markNotificationsAsRead(User $user)
   {
      return $user->notifications()
         ->where('readed', false)
         ->update(['readed' => true]);
   }
}
