<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserCar;
use App\Models\CarRide;
use App\Models\OffersPassenger;
use Auth;

class UserCarsController extends Controller
{
    public function index()
    {
        return UserCar::with(['fuel', 'user'])->get();
    }

    public function onlyAuthUser()
    {

        return UserCar::with(['fuel', 'user'])->onlyMyCars()->get();
    }

    public function store(Request $request)
    {
        $userCar = UserCar::create([
            'user_id' => Auth::user()->id,
            'car_id' => $request->car_id,
            'number' => $request->number,
            'number_variant' => $request->number_variant,
            'fuel_type' => $request->fuel_type,
            'trunk' => $request->trunk,
        ]);
        $userCar->fuel;
        $userCar->user;
        $userCar->car;
        return $userCar;
    }


    public function show(UserCar $userCar)
    {
        return $userCar;
    }


    public function update(Request $request, UserCar $userCar)
    {
        $userCar->car_id = $request->car_id;
        $userCar->number = $request->number;
        $userCar->number_variant = $request->number_variant;
        $userCar->fuel_type = $request->fuel_type;
        $userCar->trunk = $request->trunk;

        $userCar->save();
        $car = $userCar->fresh();
        $car->fuel;
        $car->user;
        return $car;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserCar $userCar)
    {
        CarRide::where('user_car_id', $userCar->id)->delete();
        OffersPassenger::where('user_car_id', $userCar->id)->delete();
        return $userCar->delete();
    }
}
