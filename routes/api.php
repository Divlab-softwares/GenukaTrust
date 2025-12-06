<?php

use App\Http\Controllers\Auth\CallbackController;
use App\Http\Controllers\Auth\CheckController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\RefreshController;
use App\Http\Controllers\Auth\WebhookController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\DashboardController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
    // OAuth callback route
    Route::get('/callback', CallbackController::class)->name('auth.callback');

    // Session management routes
    Route::get('/check', CheckController::class)->name('auth.check');
    Route::post('/refresh', RefreshController::class)->name('auth.refresh');
    Route::get('/me', MeController::class)->name('auth.me');
    Route::post('/logout', LogoutController::class)->name('auth.logout');

    // Webhook route
    Route::post('/webhook', WebhookController::class)->name('auth.webhook');




});



Route::post('/feedback', [FeedbackController::class, 'store']);

Route::middleware(['genuka.params'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/feedbacks', [FeedbackController::class, 'index']);

});








