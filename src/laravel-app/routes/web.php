<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Mail\MurratavaMail;
use Illuminate\Support\Facades\Mail;

//Route::get('/', function () {
//    return view('welcome');
//});

//Route::get('/products', [ProductController::class, 'index']);
//Route::get('/products/{id}', [ProductController::class, 'show']);

//Route::post('/products', [ProductController::class, 'store']);



Route::get('/testroute', function() {


    $name = "Tester";

    Mail::to("testreceiver@gmail.com")->send(new MurratavaMail($name));
});