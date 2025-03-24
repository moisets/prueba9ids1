<?php

use App\Http\Controllers\CategoriasController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/categorias/lista',[CategoriasController::class,'index'])->name('categorias.lista');
Route::get('/categorias/nueva',[CategoriasController::class,'create'])->name('categoria.nueva');
Route::get('/categorias/editar/{id}',[CategoriasController::class,'edit'])->name('categoria.editar');
Route::get('/categorias/eliminar/{id}',[CategoriasController::class,'delete'])->name('categoria.eliminar');
Route::post('/categorias/guardar',[CategoriasController::class,'store'])->name('categoria.guardar');

