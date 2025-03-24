@extends('adminlte::page') 
@section('title', 'Nueva Categoria') 
@section('content_header') 
    <h1>Nueva Categoria</h1> 
    @stop @section('content') 

    <form action="{{route('categoria.guardar')}}" method="POST">
        @csrf
        <input type="hidden" name="id" value="{{$categoria->id}}">
        <div class="form-group">
            <label for="nombre">Nombre de la Categoría:</label>
            <input type="text" name="nombre" id="nombre" 
            value="{{$categoria->nombre}}"
                    class="form-control" required>
        </div>

        <button type="submit" class="btn btn-success">Guardar</button>
    </form>


    @stop
    