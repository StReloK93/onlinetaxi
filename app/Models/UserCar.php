<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Auth;

class UserCar extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'number',
        'fuel_type',
        'trunk',
    ];

    protected $casts = [
        'trunk' => 'boolean'
    ];

    public function scopeOnlyMyCars(Builder $query){
        $query->where('user_id', Auth::user()->id);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fuel()
    {
        return $this->belongsTo(FuelType::class, 'fuel_type' , 'id');
    }

}
