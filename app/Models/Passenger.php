<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    use HasFactory;
    
    protected $with = [
        'start',
        'end',
    ];


    protected $fillable = [
        'name',
        'user_id',
        'car_ride_id',
        'address',
        'phone',
        'start_city',
        'end_city',
        'with_trunk',
        'count',
        'ride_time',
    ];


    public function start()
    {
        return $this->belongsTo(District::class, 'start_city' ,'id')->with('region');
    }

    public function end()
    {
        return $this->belongsTo(District::class, 'end_city' ,'id')->with('region');
    }
}
