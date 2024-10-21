<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\CardsController;
use App\Http\Controllers\CatBreedController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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
Route::put('/user', [UserController::class, 'update'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/user/image/add', [UserController::class, 'addProfilePicture']);
    Route::post('/user/image/remove', [UserController::class, 'removeProfilePicture']);

    Route::get('/cards', [CardsController::class, 'index']);
    Route::post('/cards', [CardsController::class, 'store']);
    Route::post('/cards/{id}', [CardsController::class, 'update']);
    Route::get('/cards/{id}', [CardsController::class, 'show']);
    Route::post('/cards/remove/{id}', [CardsController::class, 'destroy']);

    Route::get('/locations', [LocationController::class, 'index']);
    Route::post('/locations', [LocationController::class, 'store']);
    Route::post('/locations/{id}', [LocationController::class, 'update']);
    Route::get('/locations/{id}', [LocationController::class, 'show']);
    Route::post('/locations/remove/{id}', [LocationController::class, 'destroy']);

    Route::get('/basket', [UserController::class, 'get_basket']);
    Route::post('/basket', [UserController::class, 'update_basket_item']);
    Route::post('/basket/clear', [UserController::class, 'clear_basket']);
});

// Admins only - some routes are for testing purposes - TODO: make them accessible by admins only
Route::get('/all_users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::get('/all_cards', [CardsController::class, 'index_all'])->middleware('auth:sanctum');
Route::get('/all_locations', [LocationController::class, 'index_all'])->middleware('auth:sanctum');

Route::post('/products', [ProductController::class, 'store'])->middleware('auth:sanctum');
Route::post('/products/{id}/images/add', [ProductController::class, 'addImage'])->middleware('auth:sanctum'); // gonna need to explain this
Route::post('/products/images/{image}/remove', [ProductController::class, 'removeImage'])->middleware('auth:sanctum');  //gonna need to explain this
Route::post('/cats', [CatController::class, 'store'])->middleware('auth:sanctum');
Route::post('/cat_breeds', [CatBreedController::class, 'store'])->middleware('auth:sanctum');

Route::post('/products/{id}', [ProductController::class, 'update'])->middleware('auth:sanctum');
Route::post('/cats/{id}', [CatController::class, 'update'])->middleware('auth:sanctum');
Route::post('/cat_breeds/{id}', [CatBreedController::class, 'update'])->middleware('auth:sanctum');

Route::post('/products/remove/{id}', [ProductController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/cats/remove/{id}', [CatController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/cat_breeds/remove/{id}', [CatBreedController::class, 'destroy'])->middleware('auth:sanctum');
