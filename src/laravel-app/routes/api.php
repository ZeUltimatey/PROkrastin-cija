<?php

use App\Http\Controllers\CardsController;
use App\Http\Controllers\CatBreedController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Users
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login'])->middleware('guest:sanctum');
Route::get('/bask   et/{id}', [UserController::class, 'get_basket']);
Route::post('/basket/{id}', [UserController::class, 'add_to_basket']); // TODO
// ->middleware('auth:sanctum');

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::post('/products/{id}', [ProductController::class, 'update']);
Route::post('/products/remove/{id}', [ProductController::class, 'store']);

// Cats
Route::get('/cats', [CatController::class, 'index']);
Route::get('/cats/{id}', [CatController::class, 'show']);
Route::post('/cats', [CatController::class, 'store']);
Route::post('/cats/{id}', [CatController::class, 'update']);
Route::post('/cats/remove/{id}', [CatController::class, 'store']);

// Cat breeds
Route::get('/cat_breeds', [CatBreedController::class, 'index']);
Route::get('/cat_breeds/{id}', [CatBreedController::class, 'show']);
Route::post('/cat_breeds', [CatBreedController::class, 'store']);
Route::post('/cat_breeds/{id}', [CatBreedController::class, 'update']);
Route::post('/cat_breeds/remove/{id}', [CatBreedController::class, 'store']);

// Card information (some might be redundant)
Route::get('/cards', [CardsController::class, 'index']);
Route::get('/cards/{id}', [CardsController::class, 'show']);
Route::post('/cards', [CardsController::class, 'store']);
Route::post('/cards/{id}', [CardsController::class, 'update']);
Route::post('/cards/remove/{id}', [CardsController::class, 'store']);

// Basket
//Route::get('/basket/{id}', [BasketController::class, 'show']);
//Route::post('/basket/{id}', [BasketController::class, 'add_product']);
