<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\CardsController;
use App\Http\Controllers\CatBreedController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
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
Route::get('/reviews/{product_id}', [ReviewController::class, 'show']);

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

    Route::post('/reviews/{id}', [ReviewController::class, 'store']);

    Route::get('/transactions', [TransactionController::class, 'show']);
    Route::post('/purchase', [TransactionController::class, 'purchase']);

    Route::get('/basket', [UserController::class, 'get_basket']);
    Route::post('/basket', [UserController::class, 'update_basket_item']);
    Route::post('/basket/clear', [UserController::class, 'clear_basket']);
});

// Admins only - some routes are for testing purposes
// Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::get('/all_users', [UserController::class, 'index']);
    Route::get('/all_cards', [CardsController::class, 'index_all']);
    Route::get('/all_locations', [LocationController::class, 'index_all']);
    Route::get('/all_transactions', [TransactionController::class, 'index_all']);
    Route::get('/all_reviews', [ReviewController::class, 'index_all']);

    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{id}/images/add', [ProductController::class, 'addImage']); // gonna need to explain this
    Route::post('/products/images/{image}/remove', [ProductController::class, 'removeImage']);  //gonna need to explain this
    Route::post('/cats', [CatController::class, 'store']);
    Route::post('/cat_breeds', [CatBreedController::class, 'store']);

    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::post('/cats/{id}', [CatController::class, 'update']);
    Route::post('/cat_breeds/{id}', [CatBreedController::class, 'update']);

    Route::post('/products/remove/{id}', [ProductController::class, 'destroy']);
    Route::post('/cats/remove/{id}', [CatController::class, 'destroy']);
    Route::post('/cat_breeds/remove/{id}', [CatBreedController::class, 'destroy']);
    Route::post('/reviews/remove/{id}', [ReviewController::class, 'destroy']);
});
