<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Firebase;
use App\Models\Passenger;
use Auth;
use Carbon\Carbon;
class PassengerController extends Controller
{
    protected $firebase;
    public function __construct()
    {
        $this->firebase = new Firebase();
    }
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
        $passenger->price = $request->price;
        $passenger->address = $request->address;
        $passenger->car_ride_id = $request->car_ride_id;
        $passenger->start_city = $request->start_city;
        $passenger->end_city = $request->end_city;
        $passenger->with_trunk = $request->with_trunk;
        $passenger->ride_time = $request->ride_time;
        $passenger->save();

        $freshedPassenger = $passenger->fresh();


        $startCity = $freshedPassenger->start->name;
        $endCity = $freshedPassenger->end->name;

        $date = Carbon::parse($passenger->ride_time)->format('d m');
        $hour = Carbon::parse($passenger->ride_time)->format('H');

        $this->firebase->sendToTopic(
            "city_$request->start_city",
            [
                "$date kuni soat $hour da $startCity dan $endCity ga $freshedPassenger->count kishi bor",
                "Iltimos ketadigan bo'lsalaring qanchaga va qachon olib ketishingizni yozib yuboring.",
            ],
            url('/passengers')
        );
        return $freshedPassenger;
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
        $passenger->price = $request->price;
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
