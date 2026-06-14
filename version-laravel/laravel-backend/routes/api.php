<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\FichierController;
use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/etudiants', [EtudiantController::class, 'index']);
    Route::get('/etudiants/me', [EtudiantController::class, 'me']);
    Route::put('/etudiants/{id}', [EtudiantController::class, 'update']);
    Route::post('/images', [ImageController::class, 'store']);
    Route::get('/images', [ImageController::class, 'index']);
    Route::delete('/images/{id}', [ImageController::class, 'destroy']);
    Route::get('/fichiers', [FichierController::class, 'index']);
    Route::post('/fichiers', [FichierController::class, 'store']);
    Route::put('/fichiers', [FichierController::class, 'update']);
    Route::post('/quiz/submit', [QuizController::class, 'submit']);
    Route::get('/quiz/{quiz}', [QuizController::class, 'show']);
});
