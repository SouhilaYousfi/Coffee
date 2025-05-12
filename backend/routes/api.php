<?php

use App\Http\Controllers\CoffeeMachineController;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['status' => 'ok']);
});

Route::post('/start-coffee', [CoffeeMachineController::class, 'start']);
