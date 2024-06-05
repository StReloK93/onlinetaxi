<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\UserCarsController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\CarRideController;
use App\Http\Controllers\FuelTypeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\FirebaseTokensController;
use App\Http\Controllers\CarCompanyController;
use App\Http\Controllers\OffersPassengerController;



Route::post('/login', [AuthController::class, 'login']);
Route::post('/sendSecretCode', [AuthController::class, 'sendSecretCode']);


Route::apiResource('passenger', PassengerController::class)->only(['index', 'show']);


Route::prefix('car-ride')->group(function () {
    Route::get('only/passive', [CarRideController::class, 'onlyPassive']);
    Route::get('only/active', [CarRideController::class, 'onlyActive']);
    Route::get('only/by-region/{region_id}', [CarRideController::class, 'onlyByRegion']);
    Route::delete('set-inactive/{car_ride}', [CarRideController::class, 'setInactive']);
});

Route::apiResource('car-ride', CarRideController::class)->only(['index', 'show']);




Route::apiResource('car', CarController::class)->only(['show']);
Route::apiResource('region', RegionController::class);
Route::apiResource('district', DistrictController::class);
Route::apiResource('fuel-type', FuelTypeController::class)->only(['index']);
Route::apiResource('users', UserController::class)->only(['index']);




Route::get('sendToTopic', [NotificationController::class, 'sendToTopic']);

Route::apiResource('firebase-token', FirebaseTokensController::class)->only(['store']);

Route::apiResource('car-company', CarCompanyController::class)->only(['index']);

Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('offers-passenger', OffersPassengerController::class)->except(['index']);




    Route::apiResource('user-car', UserCarsController::class);
    Route::get('user-cars/get-only-my', [UserCarsController::class, 'getOnlyMy']);

    

    
    Route::apiResource('car-ride', CarRideController::class)->except(['index', 'show']);
    Route::prefix('car-ride')->group(function () {
        Route::get('only/auth-user', [CarRideController::class, 'onlyAuthUser']);
    });
    
    Route::prefix('passenger')->group(function () {
        Route::post('operator', [PassengerController::class, 'storeOperator']);
        Route::delete('{passenger}/delete', [PassengerController::class, 'delete']);
    });
    Route::apiResource('passenger', PassengerController::class)->except(['index', 'show']);


    Route::post('/set-user-data', [AuthController::class, 'setUserData']);
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::get('/logout', [AuthController::class, 'logoutUser']);


    Route::post('firebase/get-city-topic', [FirebaseTokensController::class, 'getCityTopic']);
    Route::post('firebase/set-city-topic', [FirebaseTokensController::class, 'setCityTopic']);
    
});

