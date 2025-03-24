<?php

namespace App\Http\Controllers;

use App\Models\Gasto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class GastoController extends Controller
{
     // Obtener todos los gastos
     public function index()
     {
         return Gasto::all();
     }
 
     // Obtener un gasto por su ID
     public function show($id)
     {
         $gasto = Gasto::find($id);
 
         if (!$gasto) {
             return response()->json(['message' => 'Gasto no encontrado'], 404);
         }
 
         return $gasto;
     }
 


    // Buscar registros según el campo 'descripcion'
    public function buscar(Request $request)
    {
        $request->validate([
            'id_users' => 'integer',  // Validación opcional
        ]);

        // Si se proporcionó una descripción, busca los gastos que coincidan
        $id_users = $request->get('id_users');

            $gastos = Gasto::where('id_users', 'like', '%' . $id_users . '%')
            ->select(
                'gasto.id_users' ,
                'gasto.nombre as nombre_gasto',
                'gasto.id_categoria' ,
                'gasto.fecha_gasto' ,
                'gasto.monto' ,
                'gasto.descripcion' ,
                'categorias.id as id_gasto', // Alias para la id de categorías
                'gasto.id as id',
                'categorias.nombre'
            )
            ->join('categorias', 'gasto.id_categoria', '=', 'categorias.id')
            ->get();
            Log::info('Si entre',['usuario' => $gastos ]);

        return response()->json($gastos);

    }
     // Crear un nuevo gasto
     public function store(Request $request)
     {
         $data = $request->validate([
             'id_users' => 'required|integer',
             'nombre' => 'required|string',
             'id_categoria' => 'required|integer',
             'fecha_gasto' => 'required|date',
             'monto' => 'required|numeric',
             'descripcion' => 'required|string',
         ]);
 
         $gasto = Gasto::create($data);
 
         return response()->json($gasto, 201);
     }
 
     // Actualizar un gasto existente
     public function update(Request $request, $id)
     {
         $gasto = Gasto::find($id);
 
         if (!$gasto) {
             return response()->json(['message' => 'Gasto no encontrado'], 404);
         }
 
         $data = $request->validate([
             'id_users' => 'required|integer',
             'nombre' => 'required|string',
             'id_categoria' => 'required|integer',
             'fecha_gasto' => 'required|date',
             'monto' => 'required|numeric',
             'descripcion' => 'required|string',
         ]);
 
         $gasto->update($data);
 
         return response()->json($gasto);
     }
 
     // Eliminar un gasto
     public function destroy($id)
     {
         $gasto = Gasto::find($id);
 
         if (!$gasto) {
             return response()->json(['message' => 'Gasto no encontrado'], 404);
         }
 
         $gasto->delete();
 
         return response()->json(['message' => 'Gasto eliminado correctamente']);
     }
}
