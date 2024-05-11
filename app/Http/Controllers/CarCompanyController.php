<?php

namespace App\Http\Controllers;

use App\Models\CarCompany;
use Illuminate\Http\Request;

class CarCompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CarCompany::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(CarCompany $carCompany)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CarCompany $carCompany)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarCompany $carCompany)
    {
        //
    }
}
