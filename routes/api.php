<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\UserCarsController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\CarRideController;
use App\Http\Controllers\FuelTypeController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\FirebaseTokensController;
use App\Http\Controllers\CarCompanyController;
use App\Http\Controllers\OffersPassengerController;
use App\Http\Controllers\UserNotificationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TelegramController;

Route::post('/sign-in', [AuthController::class, 'signIn']);
Route::post('/telegram/sign-in', [AuthController::class, 'telegramSignIn'])->middleware('telegram.auth');
Route::post('/sendSecretCode', [AuthController::class, 'sendSecretCode']);
Route::post('/webhook', [TelegramController::class, 'handle']);


Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('car-ride', CarRideController::class);
    Route::prefix('car-ride')->group(function () {
        Route::get('only/auth-user', [CarRideController::class, 'onlyAuthUser']);
        Route::get('only/passive', [CarRideController::class, 'onlyPassive']);
        Route::get('only/active', [CarRideController::class, 'actives']);
    });

    Route::apiResource('passenger', PassengerController::class);
    Route::prefix('passenger')->group(function () {
        Route::post('operator', [PassengerController::class, 'storeOperator']);
        Route::get('{passenger}/offers', [PassengerController::class, 'getOffers']);
        Route::delete('{passenger}/delete', [PassengerController::class, 'delete']);
    });

    Route::prefix('auth-user')->group(function () {
        Route::post('change-role', [AuthController::class, 'changeRole']);
        Route::get('logout', [AuthController::class, 'logout']);
        Route::get('get-auth-user', [AuthController::class, 'getAuthUser']);
        
        
        Route::post('update-user-name', [UserController::class, 'updateUserName']);
        Route::get('cars', [UserController::class, 'getCars']);
        Route::get('rides', [UserController::class, 'getRides']);
        Route::get('passengers', [UserController::class, 'getPassengers']);
        

        Route::get('notifications', [UserNotificationController::class, 'getNotifications']);
        Route::get('active-notifications', [UserNotificationController::class, 'getActiveNotifications']);
        Route::get('update-notifications', [UserNotificationController::class, 'updateNotifications']);


    });

    Route::apiResource('car-company', CarCompanyController::class)->only(['index']);
    Route::apiResource('fuel-type', FuelTypeController::class)->only(['index']);

    Route::apiResource('car', CarController::class)->only(['show']);
    Route::apiResource('region', RegionController::class);
    Route::apiResource('district', DistrictController::class);
    Route::apiResource('offers-passenger', OffersPassengerController::class)->except(['index']);
    Route::apiResource('user-car', UserCarsController::class);


    Route::post('firebase/get-city-topic', [FirebaseTokensController::class, 'getCityTopic']);
    Route::post('firebase/set-city-topic', [FirebaseTokensController::class, 'setCityTopic']);

});

