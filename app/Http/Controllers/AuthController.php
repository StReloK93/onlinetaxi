<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhoneRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function sendSecretCode(PhoneRequest $request)
    {
        return $this->authService->sendSecretCode($request->phone);
    }

    public function telegramSignIn(Request $request)
    {
        return $this->authService->telegramAuth($request);
    }
    

    public function signIn(PhoneRequest $request)
    {
        return $this->authService->signIn($request->phone, $request->code);
    }

    public function logout(Request $request)
    {
        return $this->authService->logout($request);
    }

    public function getAuthUser(Request $request)
    {
        return response()->json($request->user());
    }
}
