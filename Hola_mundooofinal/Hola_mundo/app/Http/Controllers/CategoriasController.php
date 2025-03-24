<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriasController extends Controller
{
    //
     // Mostrar la lista de categorías
     public function index()
     {
         $categories = Categoria::all();
         return view('categories.index', compact('categories'));
     }
 
     public function indexAPI()
     {
         $categories = Categoria::all();
         return $categories;
     }

     public function getAPI($id)
     {
        try {
            $categoria = Categoria::findOrFail($id);
            return $categoria;
            //code...
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message' => $th->getMessage()])->setStatusCode(400); 

        }

     }
     
     // Mostrar el formulario para crear una nueva categoría
     public function create()
     {
         return view('categories.create');
     }


     // Guardar una nueva categoría
    public function storeAPI(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Categoria::create([
            'nombre' => $request->name
        ]);

        return "Ok";
    }

    public function updateAPI(Request $request, $id)
    {

        try {
            
            $request->validate([
                'name' => 'required|string|max:255'
            ]);
    
            
            $categoria = Categoria::findOrFail($id);
            $categoria->update([
                'nombre' => $request->name
            ]);
            // return "Ok";
            return response()->json(['message' => 'Ok']); 
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message' => $th->getMessage()])->setStatusCode(400); 

        }
       


    }
    
    public function deleteAPI($id){

        $categoria = Categoria::find($id);
        $categoria->delete();

        return "Ok";

    }
}
