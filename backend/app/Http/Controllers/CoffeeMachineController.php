<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessCoffee;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CoffeeMachineController extends Controller
{
    public function start(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:espresso,latte,cappuccino',
        ]);

        ProcessCoffee::dispatch($validated['type']);

        return response()->json(['status' => 'queued']);
    }
}
