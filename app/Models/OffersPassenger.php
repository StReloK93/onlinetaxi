<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OffersPassenger extends Model
{
    use HasFactory;

    protected $with = ['user_car'];
    protected $table = 'passenger_offers';

    protected $fillable = [
        'passenger_id',
        'user_id',
        'user_car_id',
        'ride_time',
        'price',
    ];

    public function user_car()
    {
        return $this->belongsTo(UserCar::class)->with('fuel');
    }

}
