<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Passenger;
use Auth;
class PassengerController extends Controller
{
    public function index()
    {
        return Passenger::whereState(1)->get();
    }

    public function store(Request $request)
    {
        $passenger = new Passenger();
        $passenger->user_id = Auth::user()->id;
        $passenger->phone = $request->phone;
        $passenger->count = $request->count;
        $passenger->address = $request->address;
        $passenger->car_ride_id = $request->car_ride_id;
        $passenger->start_city = $request->start_city;
        $passenger->end_city = $request->end_city;
        $passenger->with_trunk = $request->with_trunk;
        $passenger->ride_time = $request->ride_time;
        $passenger->save();
        return $passenger->fresh();
    }


    public function storeOperator(Request $request)
    {
        $passenger = new Passenger();
        $passenger->user_id = Auth::user()->id;
        $passenger->phone = $request->phone;
        $passenger->count = $request->count;
        $passenger->address = $request->address;
        $passenger->car_ride_id = $request->car_ride_id;
        $passenger->end_city = $request->end_city;

        
        $passenger->start_city = $request->start_city;
        $passenger->save();
        return $passenger->fresh();
    }

    public function show(Passenger $passenger)
    {
        return $passenger;
    }

    public function update(Request $request, Passenger $passenger)
    {
        $passenger->name = $request->name;
        $passenger->phone = $request->phone;
        $passenger->count = $request->count;
        $passenger->address = $request->address;
        $passenger->car_ride_id = $request->car_ride_id;
        $passenger->start_city = $request->start_city;
        $passenger->end_city = $request->end_city;
        $passenger->with_trunk = $request->with_trunk;
        $passenger->ride_time = $request->ride_time;
        $passenger->save();
        return $passenger->fresh();
    }

    public function destroy(Passenger $passenger)
    {
        $passenger->state = 0;
        $passenger->save();

        return $passenger->fresh();
    }

    public function delete(Passenger $passenger)
    {
        return $passenger->delete();
    }
}
