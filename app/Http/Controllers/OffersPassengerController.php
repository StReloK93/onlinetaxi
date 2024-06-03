<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OffersPassenger;
use Auth;
class OffersPassengerController extends Controller
{
    //

    public function show($offer_id){
        return OffersPassenger::find($offer_id);
    }


    public function store(Request $request)
    {

        $offer = new OffersPassenger();

        $offer->user_id = Auth::user()->id;
        $offer->user_car_id = $request->user_car_id;
        $offer->passenger_id = $request->passenger_id;
        $offer->ride_time = $request->ride_time;
        $offer->price = $request->price;
        $offer->save();

        return $offer->fresh();
    }


    public function update(Request $request, $offer_id)
    {
        $offer = OffersPassenger::find($offer_id);
        $offer->user_car_id = $request->user_car_id;
        $offer->ride_time = $request->ride_time;
        $offer->price = $request->price;
        $offer->save();

        return $offer->fresh();
    }

    public function destroy($offer_id){
        $offer = OffersPassenger::find($offer_id);
        return $offer->delete();
    }

}
