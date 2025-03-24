import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { jwtDecode } from 'jwt-decode';
import crlogo from '../static/images/avatar/logo.jpeg';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import fondoImagen from '../static/images/avatar/fondo2.jfif';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import {  Grid } from '@mui/material';

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
const pages = ['Inicio','Acerca de...','Categoria', 'Pago' ];
const settings = [ 'Cerrar sesión'];

function Bienvenida() {
  const [anchorElNav, setAnchorElNav] = useState('')
  const [anchorElUser, setAnchorElUser] = useState('')

  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("nombre");

    if (token) {
      // Decodificar el token usando jwtDecode
      const decoded = token;
      setTokenData(decoded);  // Guardar los datos decodificados en el estado
    }
  }, []);
  const drawerWidth = 240;


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('id');
     window.location.href = "/login"
  };
  const redirigirCategoria = () => {
     window.location.href = "/Home"
  };
  const redirigirInicio = () => {
    window.location.href = "/Bienvenida"
 };
 const Menu_pago = () => {
  window.location.href = "/Pago"
};
  const handleCloseUserMenu = (event) => {

    setAnchorElUser(null);
  };
  const theme = createTheme();

  theme.spacing(2); 
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
    <ThemeProvider theme={goldenTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <AppBar position="static" >
      <Container maxWidth="x3">
        <Toolbar disableGutters>
        <Avatar alt="Remy Sharp" src={crlogo} sx={{ width: 65, height: 65 }} variant="rounded"/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
               Pagos MOY  
                    </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={page === 'Categoria' ? redirigirCategoria : page === 'Inicio' ? redirigirInicio :  page === 'Pago' ? Menu_pago :  handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>{tokenData}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'Cerrar sesión' ? handleLogout : handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
</Box>





      <Box
         sx={{
            backgroundImage: `url(${fondoImagen})`, // Imagen de fondo solo para este contenedor
            backgroundSize: 'cover', // La imagen cubre solo el tamaño del contenedor
            backgroundPosition: 'center', // Centra la imagen
            padding: '50px', // Espacio alrededor del texto
            borderRadius: '10px', // Esquinas redondeadas (opcional)
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombras para el contenedor (opcional)
          }}
      >
        <Typography variant="h3"
          sx={{
            color: 'white', // Color del texto
            backgroundColor: 'transparent', // Fondo transparente
            backgroundPosition: 'center', // Centra la imagen
            padding: '10px', // Espacio alrededor del texto
            display: 'inline-block', // Para que el borde solo rodee el texto, no el contenedor completo
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7), -2px -2px 4px rgba(0, 0, 0, 0.7), 2px -2px 4px rgba(0, 0, 0, 0.7), -2px 2px 4px rgba(0, 0, 0, 0.7)', // Sombra alrededor de las letras (como borde negro)
          }}
          >
        ¡Bienvenidos a pagos MOY! 
        </Typography>
        <Typography variant="h6"
          sx={{
            color: 'white', // Color del texto
            backgroundColor: 'transparent', // Fondo transparente
            padding: '10px', // Espacio alrededor del texto
            display: 'inline-block', // Para que el borde solo rodee el texto, no el contenedor completo
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7), -2px -2px 4px rgba(0, 0, 0, 0.7), 2px -2px 4px rgba(0, 0, 0, 0.7), -2px 2px 4px rgba(0, 0, 0, 0.7)', // Sombra alrededor de las letras (como borde negro)
          }}
          >
        Pagos MOY es una innovadora plataforma digital diseñada para optimizar la gestión de pagos y finanzas de manera práctica y segura. Con un enfoque en la simplicidad y el control financiero, Pagos MOY permite a los usuarios organizar sus pagos recurrentes, gestionar transacciones y monitorear su flujo financiero con facilidad.

Dirigida tanto a personas como a empresas, Pagos MOY facilita el registro de pagos e ingresos. Su interfaz intuitiva y personalizable se adapta a las necesidades específicas de cada usuario, brindando una experiencia eficiente que promueve una administración financiera más ordenada y eficaz.
        </Typography>
      </Box>
   
















      <Grid container spacing={3} justifyContent="center">
      {/* Primer Card */}
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="coin"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Automatización de pagos recurrentes
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Pagos MOY permite programar y gestionar pagos periódicos de forma automática, 
              asegurando que no se olviden compromisos financieros importantes y ahorrando tiempo en la gestión manual.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </Grid>

      {/* Segundo Card */}
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="../static/images/cards/contemplative-reptile2.jpg"
              alt="coin"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Análisis financiero en tiempo real
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              La plataforma ofrece reportes detallados y gráficos claros que ayudan a los usuarios a comprender su flujo de dinero, 
              identificar tendencias y tomar decisiones informadas para mejorar su salud financiera.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </Grid>

      {/* Tercer Card */}
    {/*  <Grid item xs={12} sm={4} md={4} lg={4}>
        <Card sx={{ maxWidth: 300 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </Grid>*/}
    </Grid>

    






















    </ThemeProvider>
    </Stack>


  );
}
export default Bienvenida;
