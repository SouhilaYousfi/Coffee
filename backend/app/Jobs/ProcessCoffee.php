<?php

namespace App\Jobs;

use App\Events\CoffeeStatusUpdate;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessCoffee implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected string $type;

    public function __construct(string $type)
    {
        $this->type = $type;
    }

    public function handle(): void
    {
        $durations = [
            'espresso' => 15,
            'latte' => 30,
            'cappuccino' => 20,
        ];

        $time = $durations[$this->type];

        for ($timeRemaining = $time; $timeRemaining >= 0; $timeRemaining--) {
            broadcast(new CoffeeStatusUpdate($timeRemaining));
            sleep(1);
        }
    }
}
