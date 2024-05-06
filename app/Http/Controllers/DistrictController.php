<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\District;


class DistrictController extends Controller
{
    public function index(){
        return District::all();
    }

    public function show($id){
        return District::where('region_id', $id)->get();
    }
}
