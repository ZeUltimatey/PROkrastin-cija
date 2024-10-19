<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\CardsController;
use App\Http\Controllers\CatBreedController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Free for all
Route::post('/register', [UserController::class, 'register']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/cats', [CatController::class, 'index']);
Route::get('/cat_breeds', [CatBreedController::class, 'index']);

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/cats/{id}', [CatController::class, 'show']);
Route::get('/cat_breeds/{id}', [CatBreedController::class, 'show']);

// Guests only
Route::post('/login', [UserController::class, 'login'])->middleware('guest:sanctum')->name('login');

// Users only
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/cards', [CardsController::class, 'index'])->middleware('auth:sanctum');
Route::post('/cards', [CardsController::class, 'store'])->middleware('auth:sanctum');
Route::post('/cards/{id}', [CardsController::class, 'update'])->middleware('auth:sanctum');
Route::get('/cards/{id}', [CardsController::class, 'show'])->middleware('auth:sanctum');
Route::post('/cards/remove/{id}', [CardsController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/locations', [LocationController::class, 'index'])->middleware('auth:sanctum');
Route::post('/locations', [LocationController::class, 'store'])->middleware('auth:sanctum');
Route::post('/locations/{id}', [LocationController::class, 'update'])->middleware('auth:sanctum');
Route::get('/locations/{id}', [LocationController::class, 'show'])->middleware('auth:sanctum');
Route::post('/locations/remove/{id}', [LocationController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/basket', [UserController::class, 'get_basket'])->middleware('auth:sanctum');
Route::post('/basket', [UserController::class, 'update_basket_item'])->middleware('auth:sanctum');
Route::post('/basket/clear', [UserController::class, 'clear_basket'])->middleware('auth:sanctum');

// Admins only - some routes are for testing purposes - TODO: make them accessible by admins only
Route::get('/all_users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::get('/all_cards', [CardsController::class, 'index_all'])->middleware('auth:sanctum');
Route::get('/all_locations', [LocationController::class, 'index_all'])->middleware('auth:sanctum');

Route::post('/products', [ProductController::class, 'store'])->middleware('auth:sanctum');
Route::post('/cats', [CatController::class, 'store'])->middleware('auth:sanctum');
Route::post('/cat_breeds', [CatBreedController::class, 'store'])->middleware('auth:sanctum');

Route::post('/products/{id}', [ProductController::class, 'update'])->middleware('auth:sanctum');
Route::post('/cats/{id}', [CatController::class, 'update'])->middleware('auth:sanctum');
Route::post('/cat_breeds/{id}', [CatBreedController::class, 'update'])->middleware('auth:sanctum');

Route::post('/products/remove/{id}', [ProductController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/cats/remove/{id}', [CatController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/cat_breeds/remove/{id}', [CatBreedController::class, 'destroy'])->middleware('auth:sanctum');
