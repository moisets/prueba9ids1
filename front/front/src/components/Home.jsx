import React, { useEffect, useState } from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
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
import AddIcon from '@mui/icons-material/AddSharp';
import EditIcon from '@mui/icons-material/EditSharp';
import EliminarIcon from '@mui/icons-material/DeleteSharp';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Categoria from './Categoria';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChecklistIcon from '@mui/icons-material/Checklist';








const paginationModel = { page: 0, pageSize: 10 };






const drawerWidth = 240;
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
  // necessary for content to be below app bar
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
  }),
);




function Home({ element }) {


  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'nombre', headerName: 'Nombre', width: 250 },

    {
      field: 'acciones', headerName: 'Acciones', width: 400,
      renderCell: (params) => (
        <>
          <Button variant="contained" style={{margin: "10px"}} 
          color="warning" onClick={() => handleClick(params.id)}>
            <EditIcon></EditIcon>
            Editar

          </Button>


          <Button variant="contained" color="error"
          style={{margin: "10px"}}  onClick={() => handleClickRemove(params.id)}>
            <EliminarIcon></EliminarIcon>
            Eliminar
          </Button>
        </>
      )
    },

  ];

  const handleClick = (e) => {

    navigate("/categoria/"+e)
  }

  async function handleClickRemove(e) {
    try {
      const peticion = await axios.delete("http://127.0.0.1:8000/api/categories/" + e);
      console.log(peticion.data);
      const nuevasCategorias = categorias.filter(element => element.id != e);

      console.log(nuevasCategorias);

      setCategoria(nuevasCategorias)
    } catch (error) {
      console.log(error);
    }
  }
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [categorias, setCategoria] = useState([]);

  // const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  useEffect(() => {

    const traerDatos = async () => {
      try {
        const peticion = await axios.get("http://127.0.0.1:8000/api/categories");
        console.log(peticion.data);
        setCategoria(peticion.data);


      } catch (error) {
        console.log(error);
      }

    }

    traerDatos();

    return () => {
      console.log("goodbye");
      
    }
  }, [element])


  const handleAdd = () => {
    
    navigate("/categoria");
  }
  
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
    <ThemeProvider theme={goldenTheme}>
      <CssBaseline />


      
    <Box sx={{ display: 'flex' }}>

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Menu Categorias
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
      
          {['Bienvenida','lista' ,'categoria'].map((text, index) => (
           
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={(e) => navigate("/" + text)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  {index  === 0 ? <HomeIcon /> : index === 1 ? <ChecklistIcon />: <AddCircleOutlineIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
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

        {element ? element : <Paper sx={{ height: 400, width: '100%' }}>
          <>

          <Button type='button' variant='contained' color='primary' 
          onClick={() => handleAdd()}>
            <AddIcon style={{
              margin: "0 5px "
            }}></AddIcon>
            Crear nueva categoria 
          </Button>

          <DataGrid
            rows={categorias}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            
            sx={{ border: 0 }}
          />
          </>
          
        </Paper>}

      </Box>
    </Box>
    </ThemeProvider>
    </Stack>
  )
}

export default Home