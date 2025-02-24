<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
   private UserService $userService;

   public function __construct(UserService $userService)
   {
      $this->userService = $userService;
   }

   public function updateUserName(Request $request)
   {
      return $this->userService->updateUserName($request->user(), $request->name);
   }

   public function getCars(Request $request)
   {
      return response()->json($request->user()->cars);
   }

   public function getRides(Request $request)
   {
      return response()->json(
         $request->user()->rides()
            ->whereState(1)
            ->where('day', '>', now()->subHours(3))
            ->get()
      );
   }

   public function getPassengers(Request $request)
   {
      return response()->json(
         $request->user()->passengers()
            ->whereState(1)
            ->where('ride_time', '>', now()->subHours(3))
            ->get()
      );
   }
}
