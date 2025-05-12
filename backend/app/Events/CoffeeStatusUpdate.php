<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Queue\SerializesModels;

class CoffeeStatusUpdate implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public string $timeRemaining;

    public function __construct(string $timeRemaining)
    {
        $this->timeRemaining = $timeRemaining;
    }

    public function broadcastOn(): Channel
    {
        return new Channel('coffee-status');
    }

    public function broadcastAs(): string
    {
        return 'coffee-status-update';
    }
}
