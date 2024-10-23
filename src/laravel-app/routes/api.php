<?php

use App\Http\Controllers\LocationController;
use App\Http\Controllers\CardsController;
use App\Http\Controllers\CatBreedController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SelectedProductController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

// Free for all
Route::post('/register', [UserController::class, 'register']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/cats', [CatController::class, 'index']);
Route::get('/breeds', [CatBreedController::class, 'index']);

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/cats/{id}', [CatController::class, 'show']);
Route::get('/breeds/{id}', [CatBreedController::class, 'show']);
Route::get('/reviews/{product_id}', [ReviewController::class, 'show']);

// Guests only
Route::post('/login', [UserController::class, 'login'])->middleware('guest:sanctum');

// Users only


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::put('/user', [UserController::class, 'update']);
    Route::post('/user/image/add', [UserController::class, 'addProfilePicture']);
    Route::post('/user/image/remove', [UserController::class, 'removeProfilePicture']);

    Route::delete('/user', [UserController::class, 'destroy']);
    Route::get('/user/{id}', [UserController::class, 'show']);  


    Route::get('/cards', [CardsController::class, 'index']);
    Route::post('/cards', [CardsController::class, 'store']);
    Route::put('/cards/{id}', [CardsController::class, 'update']); //put changed
    Route::get('/cards/{id}', [CardsController::class, 'show']);
    Route::post('/cards/remove/{id}', [CardsController::class, 'destroy']);

    Route::get('/locations', [LocationController::class, 'index']);
    Route::post('/locations', [LocationController::class, 'store']);
    Route::put('/locations/{id}', [LocationController::class, 'update']); //put changed
    Route::get('/locations/{id}', [LocationController::class, 'show']);
    Route::post('/locations/remove/{id}', [LocationController::class, 'destroy']);

    Route::post('/reviews/{id}', [ReviewController::class, 'store']);

    Route::get('/transactions', [TransactionController::class, 'show']);
    Route::post('/purchase', [TransactionController::class, 'purchase']);

    Route::get('/basket', [SelectedProductController::class, 'get_basket']);
    Route::post('/basket', [SelectedProductController::class, 'addToBasket']);
    Route::delete('/basket/clear', [SelectedProductController::class, 'clear_basket']);
    Route::delete('/basket/remove/{Productid}', [SelectedProductController::class, 'removeFromBasket']);

});

// Admins only - some routes are for testing purposes
Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::get('/all_users', [UserController::class, 'index']);
    Route::get('/all_cards', [CardsController::class, 'index_all']);
    Route::get('/all_locations', [LocationController::class, 'index_all']);
    Route::get('/all_transactions', [TransactionController::class, 'index_all']);
    Route::get('/all_reviews', [ReviewController::class, 'index_all']);

    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/deactivate/{id}', [UserController::class, 'deactivate']); //put changed

    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{id}/images/add', [ProductController::class, 'addImage']); // gonna need to explain this
    Route::post('/products/images/{image}/remove', [ProductController::class, 'removeImage']);  //gonna need to explain this
    Route::post('/cats', [CatController::class, 'store']);
    Route::post('/breeds', [CatBreedController::class, 'store']);

    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::put('/cats/{id}', [CatController::class, 'update']); //put changed
    Route::put('/breeds/{id}', [CatBreedController::class, 'update']); //put changed

Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/cats/remove/{id}', [CatController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/cat_breeds/remove/{id}', [CatBreedController::class, 'destroy'])->middleware('auth:sanctum');
});