<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserCar;
use App\Models\CarRide;
use Auth;
class UserCarsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserCar::with(['user', 'fuel'])->get();
    }

    public function getOnlyMy()
    {
        if (Auth::user()->role_id == 2 || Auth::user()->role_id == 1) {
            return $this->index();
        } else {
            return UserCar::with(['user', 'fuel'])->onlyMyCars()->get();
        }
    }

    public function store(Request $request)
    {
        $userCar = UserCar::create([
            'user_id' => $request->user_id,
            'type' => $request->type,
            'number' => $request->number,
            'color' => $request->color,
            'fuel_type' => $request->fuel_type,
            'trunk' => $request->trunk,
        ]);
        $userCar->fuel;
        $userCar->user;
        return $userCar;
    }


    public function show(UserCar $userCar)
    {
        return $userCar;
    }


    public function update(Request $request, UserCar $userCar)
    {
        $userCar->user_id = $request->user_id;
        $userCar->type = $request->type;
        $userCar->number = $request->number;
        $userCar->color = $request->color;
        $userCar->fuel_type = $request->fuel_type;
        $userCar->trunk = $request->trunk;

        $userCar->save();
        $userCar->fuel;
        $userCar->user;
        return $userCar;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserCar $userCar)
    {
        CarRide::where('car_id', $userCar->id)->delete();
        return $userCar->delete();
    }
}
