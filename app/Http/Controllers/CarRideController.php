<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\CarRide;
use Illuminate\Http\Request;
class CarRideController extends Controller
{
    public function index()
    {
        return CarRide::all();
    }

    public function actives(){
        return CarRide::where('day', '>' , now()->addHour(-3))->get();
    }

    public function onlyPassive()
    {
        return CarRide::whereState(2)->get();
    }

    public function store(Request $request)
    {
        $carRide = CarRide::create([
            'user_id' => Auth::user()->id,
            'user_car_id' => $request->user_car_id,
            'phone' => $request->phone,
            'day' => $request->day,
            'strictly_on_time' => $request->strictly_on_time,
            'price' => $request->price,
            'free_seat' => $request->free_seat,
            'start_city' => $request->start_city,
            'end_city' => $request->end_city,
            'address_to_address' => $request->address_to_address,
            'state' => true,
        ]);

        return $carRide->fresh();
    }

    public function show(CarRide $carRide)
    {
        return $carRide;
    }

    public function update(Request $request, CarRide $carRide)
    {
        $carRide->user_car_id = $request->user_car_id;
        $carRide->phone = $request->phone;
        $carRide->day = $request->day;
        $carRide->strictly_on_time = $request->strictly_on_time;
        $carRide->price = $request->price;
        $carRide->free_seat = $request->free_seat;
        $carRide->start_city = $request->start_city;
        $carRide->end_city = $request->end_city;
        
        $carRide->address_to_address = $request->address_to_address;
        $carRide->save();


        return $carRide->fresh();
    }

    public function destroy(CarRide $carRide)
    {
        $carRide->state = 0;
        $carRide->save();

        return $carRide->fresh();
    }
}
