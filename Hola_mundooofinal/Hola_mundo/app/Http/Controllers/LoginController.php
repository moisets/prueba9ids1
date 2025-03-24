<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function login(Request $request){
        if(Auth::attempt(['email'=> $request -> email, 'password' => $request ->password]))
        {
            Log::info('Este es un mensaje informativo');
            $user= Auth::user();
            $token=$user->createToken('app')->plainTextToken;
            $arr =array('acceso'=>'ok',
            'error'=>'',
            'token'=>$token,
            'idUsuario'=>$user->id,
            'nombreUsuario'=>$user->name);
            return json_encode($arr);
        }
        else {
            $arr =array('acceso'=>'',
            'error'=>'No existe el usuarios y/o contraseña',
            'token'=>'',
            'idUsuario'=>0,
            'nombreUsuario'=>'');
            return json_encode($arr);
        }
    }
}
