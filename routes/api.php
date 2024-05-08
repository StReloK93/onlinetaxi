<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\CarRideController;
use App\Http\Controllers\FuelTypeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PassengerController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\FirebaseTokensController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/sendSecretCode', [AuthController::class, 'sendSecretCode']);
Route::apiResource('post', PostController::class);


Route::post('passenger-operator', [PassengerController::class, 'storeOperator']);
Route::delete('passenger-delete/{passenger}', [PassengerController::class, 'delete']);
Route::apiResource('passenger', PassengerController::class)->only(['index', 'show']);

Route::apiResource('car-ride', CarRideController::class)->only(['index', 'show']);
Route::get('car-rides/start-region/{region_id}', [CarRideController::class, 'startRegion']);
Route::delete('car-rides/send-road/{car_ride}', [CarRideController::class, 'sendRoad']);
Route::get('car-rides/only-success', [CarRideController::class, 'onlySuccess']);

Route::apiResource('region', RegionController::class);
Route::apiResource('district', DistrictController::class);

Route::apiResource('fuel_type', FuelTypeController::class)->only(['index']);

Route::apiResource('users', UserController::class)->only(['index']);


Route::get('sendNotification', [NotificationController::class, 'sendNotification']);

Route::apiResource('firebase-token', FirebaseTokensController::class)->only(['store']);

Route::middleware('auth:sanctum')->group(function () {

    Route::apiResource('car', CarController::class);
    Route::get('cars/get_only_my', [CarController::class, 'getOnlyMy']);

    Route::apiResource('car-ride', CarRideController::class)->except(['index', 'show']);
    Route::apiResource('passenger', PassengerController::class)->except(['index', 'show']);

    Route::post('/set_user_data', [AuthController::class, 'setUserData']);
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::get('/logout', [AuthController::class, 'logoutUser']);

});

