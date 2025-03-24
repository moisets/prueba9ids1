<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    use HasFactory;
        // Definir la tabla si el nombre no sigue la convención
        protected $table = 'gasto';

        // Definir los campos que son asignables en masa
        protected $fillable = [
            'id_users',
            'nombre',
            'id_categoria',
            'fecha_gasto',
            'monto',
            'descripcion',];
}
