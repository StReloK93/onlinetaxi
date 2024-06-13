<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    private UserService $service;
    
    public function __construct (UserService $service) {

        $this->service = $service;

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function changeRole(Request $request)
    {
        $user = $request->user();
        $user->role_id = $request->role_id;
        $user->save();
        return $user->fresh();
    }

    public function getUser(Request $request){
 
        return $this->service->getUser($request);

    }

    public function setUserData(Request $request)
    {
        
        return $this->service->setUserData($request);

    }
}
