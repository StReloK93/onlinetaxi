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
        Schema::create('car_rides', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('user_car_id');
            $table->string('phone');
            $table->dateTime('day')->nullable();
            $table->integer('start_city')->nullable();
            $table->integer('end_city')->nullable();
            $table->boolean('strictly_on_time');
            $table->integer('price');
            $table->boolean('address_to_address');
            $table->integer('free_seat');
            $table->integer('state')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_rides');
    }
};
