<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('passenger_offers', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('user_car_id');
            $table->integer('passenger_id');
            $table->dateTime('ride_time');
            $table->integer('price');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passenger_offers');
    }
};
