<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarRide extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'phone',
        'ride_time',
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
        'car',
        'cities',
        'passengers'
    ];

    public function car()
    {
        return $this->belongsTo(Car::class)->with('fuel');
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
