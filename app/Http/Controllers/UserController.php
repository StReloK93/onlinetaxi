<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    
    public function __construct () {

    }

    public function index()
    {
        return User::all();
    }


    public function show(string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
