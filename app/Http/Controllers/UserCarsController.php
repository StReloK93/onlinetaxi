<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserCar;
use App\Models\CarRide;
use Auth;
class UserCarsController extends Controller
{
    public function index()
    {
        return UserCar::with(['fuel', 'user'])->get();
    }

    public function getOnlyMy()
    {
        if (Auth::user()->role_id == 2 || Auth::user()->role_id == 1) {
            return $this->index();
        } else {
            return UserCar::with(['fuel', 'user'])->onlyMyCars()->get();
        }
    }

    public function store(Request $request)
    {
        $userCar = UserCar::create([
            'user_id' => Auth::user()->id,
            'car_id' => $request->car_id,
            'number' => $request->number,
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
        $userCar->car_id = $request->car_id;
        $userCar->number = $request->number;
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
        CarRide::where('car_id', $userCar->car_id)->delete();
        return $userCar->delete();
    }
}
