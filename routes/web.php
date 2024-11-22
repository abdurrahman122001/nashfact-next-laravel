<?php

use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Http;

Route::get('/{any?}', function ($any = null) {
    $response = Http::get("http://localhost:3000/{$any}");

    return response($response->body(), $response->status())
        ->header('Content-Type', $response->header('Content-Type'));
})->where('any', '.*');

