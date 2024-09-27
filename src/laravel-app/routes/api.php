<?php

use App\Http\Controllers\ProductController2;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ProductController2::class, 'index']);
Route::get('/products/{id}', [ProductController2::class, 'show'])->middleware('auth:sanctum');

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
