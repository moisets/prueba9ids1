
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const goldenTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#DAA520', // Dorado
      contrastText: '#FFFFFF', // Texto blanco
    },
    secondary: {
      main: '#FFD700', // Amarillo brillante
    },
    background: {
      default: '#FFF8DC', // Fondo crema
      paper: '#FFFAF0', // Fondo de los componentes
    },
    text: {
      primary: '#333333', // Texto oscuro para contraste
      secondary: '#8B4513', // Marrón para un toque elegante
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [correcto, setCorrecto] = useState('');
  const navegate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("Email y password no deben estar vacios")
      return;
    }
    try {
      console.log("desde handleSubmit");
      const peticion = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password
      });

      console.log(peticion.data);
      setError(peticion.data.error);
      if (peticion.data.error === "") {
        setCorrecto("Inicio sesión correctamente")
        localStorage.setItem("token", peticion.data.token);
        localStorage.setItem("nombre", peticion.data.nombreUsuario);
        localStorage.setItem("id", peticion.data.idUsuario);
        // navegate("../home")
        window.location.href = "/Bienvenida"

      }
    } catch (error) {
      setEmail("ocurrio un error en el servidor")
    }

  }
  return (
    <ThemeProvider theme={goldenTheme}>
      <CssBaseline />
      <>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Card sx={{ width: 450, padding: 2 }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>

                Login
              </Typography>
              <form>
                <TextField

                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  margin="normal"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                />
                <Typography color='error' gutterBottom>
                  {error}
                </Typography>
                <Typography color='primary' gutterBottom>
                  {correcto}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                    Login
                  </Button>
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  typography: 'body1',
                  '& > :not(style) ~ :not(style)': {
                    ml: 2,
                  },
                }}>



                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginRight: 2 }}>
                      <Link href="/Registrar" underline="hover">
                        {'¿Crear una cuenta?'}
                      </Link>
                    </Box>
                    <Link href="#" underline="hover">
                      {'Politica de privacidad'}
                    </Link>
                  </Box>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>

      </>
    </ThemeProvider>


  )
}

export default Login