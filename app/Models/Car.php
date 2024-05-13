<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
class Car extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $with = [
        'company'
    ];

    protected $fillable = [
        'car_company_id',
        'name',
    ];


    public function company()
    {
        return $this->belongsTo(CarCompany::class, 'car_company_id', 'id');
    }
}
