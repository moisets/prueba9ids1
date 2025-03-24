import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Login  from './components/Login';
import Home  from './components/Home';
import Categoria from './components/Categoria';
import Bienvenida from './components/Bienvenida';
import Registrar from './components/Registrar';
import Pago from './components/pagosese/Menu_pago';
import Crear_pago from './components/pagosese/Crear_pago';
function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el usuario está autenticado

  return (
    <>
    <BrowserRouter>
            <Routes >

              
            {/* Ruta del pagosssssss (protegida) */}
            <Route path="/pago" element={isAuthenticated ? <Pago /> : <Navigate to="/login" />} />
            <Route path="/Crear_pago" element={isAuthenticated ? <Crear_pago /> : <Navigate to="/login" />} />
            <Route path="/Crear_pago/*" element={isAuthenticated ? <Home element={<Crear_pago/>}/> : <Navigate to="/Crear_pago" />} />

            {/* Ruta del Home (protegida) */}
            <Route path="/Registrar" element={isAuthenticated ? <Registrar /> : <Registrar/>} />
              
            {/* Ruta del Home (protegida) */}
            <Route path="/Bienvenida" element={isAuthenticated ? <Bienvenida /> : <Navigate to="/login" />} />
              
                  {/* Ruta del Login */}
                  <Route path="/login" element={isAuthenticated ? <Navigate to="/Bienvenida" /> : <Login />} />

                  {/* Ruta del Home (protegida) */}
                  <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

                  {/* Ruta del Home (protegida) */}
                  <Route path="/categoria" element={isAuthenticated ? <Home element={<Categoria/>}/> : <Navigate to="/categoria" />} />
                  <Route path="/categoria/*" element={isAuthenticated ? <Home element={<Categoria/>}/> : <Navigate to="/categoria" />} />

                  {/* Ruta por defecto, redirige al login si no está autenticado */}
                  <Route path="*" element={<Navigate to={isAuthenticated ? "/Bienvenida" : "/login"} />} />

                  {/* ruta componente */}
            </Routes>
        </BrowserRouter>
    
    </>
  );
}

export default App;
