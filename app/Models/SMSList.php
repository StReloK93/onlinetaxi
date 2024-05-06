<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SMSList extends Model
{
    use HasFactory;
    protected $table = "smslist";

    protected $fillable = [
        'type',
        'message',
        'phone',
        'code'
    ];
}
