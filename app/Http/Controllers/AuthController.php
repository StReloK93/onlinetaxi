<?php
namespace App\Http\Controllers;


use App\Http\Requests\PhoneRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use Auth;
class AuthController extends Controller
{
    private UserService $service;
    
    public function __construct (UserService $service) {

        $this->service = $service;

    }

    public function sendSecretCode(PhoneRequest $request)
    {
        return $this->service->sendSecretCode($request);
    }
    public function signIn(PhoneRequest $request)
    {

        return $this->service->signIn($request);
    
    }


    public function logout(Request $request)
    {
        
        return $this->service->logout($request);

    }


    public function getAuthUser(Request $request){
        return $this->service->getAuthUser($request);
    }

    public function setUserNameRole(Request $request)
    {
        return $this->service->setUserNameRole($request);
    }





// Auth user Actions




    public function changeRole(Request $request)
    {
        $user = $request->user();
        $user->role_id = $request->role_id;
        $user->save();
        return $user->fresh();
    }
    
    public function cars(){
        return Auth::user()->cars;
    }


    public function rides(){
        return Auth::user()->rides;
    }

    public function passengers(){
        return Auth::user()->passengers;
    }

}