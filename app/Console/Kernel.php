<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Services\EskizSmsService;
use App\Models\CarRide;
use App\Models\Passenger;
use Carbon\Carbon;
class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {

        $schedule->call(function () {
            $eskizService = new EskizSmsService();
            $eskizService->generateToken();
        })->twiceMonthly(1,15);

        $schedule->call(function () {
            $limitDate = Carbon::now()->addHours(-3);
            $forPassenges = Carbon::now()->addHours(-12);
            
            CarRide::where([
                ['state', 1],
                ['day', '<' , $limitDate]
            ])->update(['state' => 2]);
            CarRide::where([
                ['state', 2],
                ['day', '<' , $limitDate]
            ])->update(['state' => 0]);

            Passenger::where([
                ['state', 1],
                ['ride_time', '<' , $forPassenges]
            ])->update(['state' => 0]);

        })->hourly();


    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
