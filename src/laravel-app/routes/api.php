<?php

use App\Http\Controllers\SearchController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\BoughtProductsController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\CardsController;
use App\Http\Controllers\CatBreedController;
use App\Http\Controllers\CatController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SelectedProductController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Free for all
Route::get('/login', function () {
    return response()->json(['error' => 'Unauthorized or invalid token'], 401);
})->name('login');
Route::post('/register', [UserController::class, 'register']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/breeds', [CatBreedController::class, 'index']);
Route::get('/search', [SearchController::class, 'index']);

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/breeds/{id}', [CatBreedController::class, 'show']);
Route::get('/reviews/{product_id}', [ReviewController::class, 'show']);

// Guests only
Route::post('/login', [UserController::class, 'login'])->middleware('guest:sanctum');



Route::post('/v1/products', [ProductController::class, 'importProducts']); // use at your own risk

// Route::get('/checkout', [UserController::class, 'basketPayment'])->name('checkout');

// Route::view('/checkout/success', 'checkout.success')->name('checkout-success');
// Route::view('/checkout/cancel', 'checkout.cancel')->name('checkout-cancel');

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    if (!$request->hasValidSignature()) {
        return redirect()->to(env('FRONTEND_URL'). '/auth/invalid-token');
    }

    $user = User::findOrFail($id);

    if ($user->hasVerifiedEmail()) {
        return redirect()->to(env('FRONTEND_URL'). '/auth/already-verified');
    }

    $user->markEmailAsVerified();

    return redirect()->to(env('FRONTEND_URL'). '/auth?token=' . $user->createToken('auth_token', expiresAt:now()->addDay())->plainTextToken);
})->name('verification.verify');
Route::get('/checkout/success', [UserController::class, 'successPaid'])->name('checkout-success')->middleware('api');
Route::get('/checkout/cancel', [UserController::class, 'successPaid'])->name('checkout-cancel');

// Users only
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/tt', [UserController::class, 'tt']);
    Route::get('/checkout', [UserController::class, 'basketPayment'])->name('checkout');
    Route::delete('/purchaseSuccesfull', [UserController::class, 'clear_basket_after_payment'])->name('clear-basket-after-payment');


    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/user', [UserController::class, 'get']);
    Route::post('/user/image/add', [UserController::class, 'addProfilePicture']);
    Route::post('/user/image/remove', [UserController::class, 'removeProfilePicture']);

    Route::delete('/user', [UserController::class, 'destroy']);
    Route::put('/user', [UserController::class, 'update']);
    Route::put('/change_password', [UserController::class, 'change_password']);

    Route::get('/bought_products/{transaction_id}', [BoughtProductsController::class, 'index']);

    Route::get('/cards', [CardsController::class, 'index']);
    Route::post('/cards', [CardsController::class, 'store']);
    Route::put('/cards/{id}', [CardsController::class, 'update']);
    Route::get('/cards/{id}', [CardsController::class, 'show']);
    Route::delete('/cards/{id}', [CardsController::class, 'destroy']);

    Route::get('/locations', [LocationController::class, 'index']);
    Route::post('/locations', [LocationController::class, 'store']);
    Route::put('/locations/{id}', [LocationController::class, 'update']);
    Route::get('/locations/{id}', [LocationController::class, 'show']);
    Route::delete('/locations/{id}', [LocationController::class, 'destroy']);

    Route::post('/reviews/{product_id}', [ReviewController::class, 'store']);

    Route::get('/transactions', [TransactionController::class, 'show']);
    Route::post('/purchase', [TransactionController::class, 'purchase']);

    Route::get('/basket', [SelectedProductController::class, 'get_basket']);
    Route::post('/basket', [SelectedProductController::class, 'addToBasket']);
    Route::delete('/basket/clear', [SelectedProductController::class, 'clear_basket']);
    Route::delete('/basket/remove/{product_id}', [SelectedProductController::class, 'removeFromBasket']);
});

// Admins only - some routes are for testing purposes
Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    Route::get('/all_users', [UserController::class, 'index']);
    Route::get('/all_bought_products', [BoughtProductsController::class, 'index_all']);
    Route::get('/all_cards', [CardsController::class, 'index_all']);
    Route::get('/all_locations', [LocationController::class, 'index_all']);
    Route::get('/all_transactions', [TransactionController::class, 'index_all']);
    Route::get('/all_reviews', [ReviewController::class, 'index_all']);

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/users/update/{id}', [AdminController::class, 'update']); //put changed

    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/{id}/images/add', [ProductController::class, 'addImages']); // gonna need to explain this
    Route::post('/products/images/{image}/remove', [ProductController::class, 'removeImage']);  //gonna need to explain this
    Route::post('/cats', [CatController::class, 'store']);
    Route::post('/breeds', [CatBreedController::class, 'store']);

//    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::put('/cats/{id}', [CatController::class, 'update']); //put changed
    Route::put('/breeds/{id}', [CatBreedController::class, 'update']); //put changed

//    Route::delete('/user/{id}', [UserController::class, 'destroy']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::delete('/breeds/{id}', [CatBreedController::class, 'destroy']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
});
