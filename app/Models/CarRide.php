<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class CarRide extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_car_id',
        'phone',
        'day',
        'strictly_on_time',
        'price',
        'address_to_address',
        'free_seat',
        'state',
    ];

    protected $casts = [
        'free_seat' => 'integer',
        'price' => 'integer',
        'strictly_on_time' => 'boolean',
        'address_to_address' => 'boolean',
    ];


    protected $with = [
        'user_car',
        'cities',
        'passengers'
    ];

    public function user_car()
    {
        return $this->belongsTo(UserCar::class)->with('fuel');
    }

    public function cities()
    {
        return $this->hasMany(CarRideCity::class)->with('district');
    }

    public function passengers()
    {
        return $this->hasMany(Passenger::class);
    }
}
