import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import  { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/EditSharp';
import EliminarIcon from '@mui/icons-material/DeleteSharp';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddIcon from '@mui/icons-material/AddSharp';
import { useNavigate } from 'react-router-dom';
const paginationModel = { page: 0, pageSize: 5 };


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  })
);

function MenuPago() {
///////////////////
const navigate = useNavigate();
const [cate, setCate] = useState([]);
  const [rows, setRows] = useState([]);

const columns = [
    { field: 'nombre_gasto', headerName: 'Nombre del gasto', width: 70 },
    { field: 'nombre', headerName: 'Nombre de la categoria', width: 130 },
    { field: 'fecha_gasto', headerName: 'Fecha del gatos', width: 130 },
    {
      field: 'monto',
      headerName: 'monto',
      type: 'number',
      width: 90,
    },
    { field: 'descripcion', headerName: 'Descripcion', width: 130 },
    {
        field: 'acciones', headerName: 'Acciones', width: 400,
        renderCell: (params) => (
          <>
            <Button variant="contained" style={{margin: "10px"}} onClick={() => irEditar(params.id)}
            color="warning" >
              <EditIcon></EditIcon>
              Editar
  
            </Button>
  
  
            <Button variant="contained" color="error" onClick={() => irEliminar(params.id)}
            style={{margin: "10px"}} >
              <EliminarIcon></EliminarIcon>
              Eliminar
            </Button>
          </>
        )
      },
  ];

  useEffect(() => {
    





    const traerDatos = async () => {
        const id_users=localStorage.getItem("id");;
      try {
        const peticion = await axios.get("http://127.0.0.1:8000/api/gastos/buscar", {
            id_users
        }
            );
        setRows(peticion.data);
console.log(rows);
      } catch (error) {
        console.log(error);
      }

    }
traerDatos();
   
  }, [])
  const irEditar = (x) => {
    
    navigate("/Crear_pago/"+x)
  };
  const irEliminar  = async (x) => {

    try {
      const peticion = await axios.delete("http://127.0.0.1:8000/api/gastos/" + x);
      console.log(peticion.data);
      window.location.href = "/Pago"

    } catch (error) {
      console.log(error);
    }


  };
  const irInicio = () => {
    window.location.href = "/Bienvenida"
  };

  const irMenu = () => {
    window.location.href = "/Pago"
  };
  const irCrear = () => {
    window.location.href = "/Crear_pago"
  };
////////////////////////
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

<ThemeProvider theme={goldenTheme}>
      
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              { marginRight: 5 },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Menu Pago
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inicio', 'Lista', 'crear pago'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={text === 'Inicio' ? irInicio : text === 'Lista' ? irMenu : irCrear }
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' },
                  ]}
                >
                  {index === 0 ? <HomeIcon /> : index === 1 ? <ChecklistIcon /> : <AddIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open ? { opacity: 1 } : { opacity: 0 },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
       </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default MenuPago;
