<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\PassengerObserver;


#[ObservedBy([PassengerObserver::class])]
class Passenger extends Model
{
    use HasFactory;
    
    protected $with = [
        'start',
        'end',
    ];


    protected $fillable = [
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


    public function offers()
    {
        return $this->hasMany(OffersPassenger::class);
    }
}
