<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
class Car extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $with = [
        'car_company'
    ];

    protected $fillable = [
        'car_company_id',
        'name',
    ];


    public function car_company()
    {
        return $this->belongsTo(CarCompany::class);
    }
}
