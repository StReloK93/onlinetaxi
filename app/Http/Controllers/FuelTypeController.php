<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FuelType;
class FuelTypeController extends Controller
{
    public function index(){
        return FuelType::all();
    }
}
