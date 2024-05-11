<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Car;
class CarController extends Controller
{

    public function index($id){
        return Car::where('car_company_id', $id)->get();
    }

}
