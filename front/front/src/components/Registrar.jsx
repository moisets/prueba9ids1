import React from 'react'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';

import { useState } from 'react';
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
function Registrar() {


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [correcto, setCorrecto] = useState('');

  const registrardtaos = async (e) => {
    e.preventDefault();
    if(email!== ''|| name!== '' || password1!== '' || password2!== '' ){
      if(password1 === password2){
////////////////////////////////////////////////////77

try {
  console.log("desde handleSubmit");
  const peticion = await axios.post("http://127.0.0.1:8000/api/create", {
    name,
    email,
    password: password1,
    rol: '1'
  });

  console.log(peticion.data);
  setError(peticion.data.error);
  console.log(error);
  if (peticion.data === "ok") {
    setCorrecto("Registro correcto")
    setName('');
    setEmail('');
    setPassword1('');
    setPassword2('');

  }
} catch (error) {
  setError("ocurrio un error en el servidor")
}


////////////////////////////////////////////////////////////7
      }else{
        setError('La contreseña no es la misma en los campos');
      }


    }else{
      setError('Hay campos vacios');
    }

  };



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();

  };
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

                Registar
              </Typography>
              <form>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <AccountCircle sx={{ color: 'action.active' }} />
                  <TextField id="input-with-sx" label="Nombre del usuario" variant="standard" value={name}
                    onChange={(e) => setName(e.target.value)} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <MailIcon sx={{ color: 'action.active' }} />
                  <TextField id="input-with-sx" label="Correo electronico " variant="standard" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <FormControl sx={{ m: 1, width: '25ch', justifyContent: 'center' }} align="center">
                    <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}

                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}

                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>







                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <FormControl sx={{ m: 1, width: '25ch', justifyContent: 'center' }} align="center">
                    <InputLabel htmlFor="standard-adornment-password">Verificar contraseña</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      

                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? 'hide the password' : 'display the password'
                            }

                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Box>









                <Typography  color='error'  sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}  gutterBottom>
             {error}
            </Typography>
            <Typography  color='primary'  sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}  gutterBottom>
              {correcto}
            </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                  <Button variant="contained" color="primary" onClick={registrardtaos}  >
                    Registar nuevo usuario
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Link href="/login" underline="hover">
                  {'Iniciar sesión'}
                </Link>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>

      </>
    </ThemeProvider>
  )
}

export default Registrar
