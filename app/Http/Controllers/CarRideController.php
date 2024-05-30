<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\CarRide;
use App\Models\CarRideCity;
use Illuminate\Http\Request;
use App\Events\CarRideCreateEvent;
use App\Models\District;
class CarRideController extends Controller
{
    public function index()
    {
        return CarRide::all();
    }

    public function onlyActive(){
        return CarRide::whereState(1)->get();
    }

    public function onlyPassive()
    {
        return CarRide::whereState(2)->get();
    }

    public function onlyAuthUser()
    {
        return CarRide::whereUserId(Auth::user()->id)->whereState(1)->get();
    }

    public function onlyByRegion($region)
    {
        $dist = District::where('region_id', $region)->with('region')->get();
        $districts = $dist->pluck('id');
        $rides = CarRide::whereState(1)->whereHas('cities', function ($query) use($districts) {
            $query->whereIn('district_id', $districts->all());
        })->get();

        $car_rides = $rides->filter(function ($rides) use ($districts) {
            $firstComment = $rides->cities()->first();
            return in_array($firstComment->district_id, $districts->all());
        });
        return ['districts' => $dist, 'car_rides' => array_values($car_rides->all())];
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
            'address_to_address' => $request->address_to_address,
            'state' => true,
        ]);

        foreach ($request->ends as $item) {
            CarRideCity::create([
                'car_ride_id' => $carRide->id,
                'district_id' => $item['city']
            ]);
        }

        $carRide = $carRide->fresh();
        // broadcast(new CarRideCreateEvent($carRide))->toOthers();
        return $carRide;
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
        $carRide->address_to_address = $request->address_to_address;
        $carRide->save();
        CarRideCity::where('car_ride_id', $carRide->id)->delete();

        foreach ($request->ends as $carRideCity) {
            CarRideCity::create([
                'car_ride_id' => $carRide->id,
                'district_id' => $carRideCity['city']
            ]);
        }
        return $carRide->fresh();
    }






    public function destroy(CarRide $carRide)
    {
        $carRide->state = 0;
        $carRide->save();

        return $carRide->fresh();
    }

    public function setInactive(CarRide $carRide)
    {
        $carRide->state = 2;
        $carRide->save();
        return $carRide->fresh();
    }
}
