<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gasto', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->unsignedInteger('id_users');
            $table->unsignedInteger('id_categoria');
            $table->date('fecha_gasto');
            $table->decimal('monto');
            $table->string('descripcion');
            $table->timestamps();
            $table->foreign('id_categoria')->references('id')->on('categorias');
            $table->foreign('id_users')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gasto');
    }
};
