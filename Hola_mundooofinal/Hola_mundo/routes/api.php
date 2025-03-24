<?php

// use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GastoController;
use App\Http\Controllers\Auth\RegisterController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:api')->get('/categories', function (Request $request) {
//     return $request->user();
// });


Route::post("login", [LoginController::class, 'login']);

Route::post("/create", [RegisterController::class,'createApi']);

Route::get('/categories', [CategoriasController::class, 'indexAPI']);
Route::post('/categories', [CategoriasController::class, 'storeAPI']);
Route::get('/categories/{id}', action: [CategoriasController::class, 'getAPI']);
Route::delete('/categories/{id}', [CategoriasController::class, 'deleteAPI']);
Route::put('/categories/{id}', [CategoriasController::class, 'updateAPI']);


Route::get('/gastos', [GastoController::class, 'index']);  // Listar todos los gastos
Route::get('/gastos/buscar', [GastoController::class, 'buscar']);
Route::get('/gastos/{id}', [GastoController::class, 'show']);  // Mostrar un gasto por ID
Route::post('/gastos', [GastoController::class, 'store']);  // Crear un nuevo gasto
Route::put('/gastos/{id}', [GastoController::class, 'update']);  // Actualizar un gasto
Route::delete('/gastos/{id}', [GastoController::class, 'destroy']);  // Eliminar un gasto

