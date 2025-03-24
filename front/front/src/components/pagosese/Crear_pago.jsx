import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
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
import { TextField} from '@mui/material'
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

function Crear_pago() {

///////////////////
const [filteredCategory, setFilteredCategory] = useState('');
const [nombre, setNombre] = useState('');
const [lastvaloer, setLastvaloer] = useState('');
const [categoria, setCategoria] = useState([]);
const [error, setError] = useState('');
const [correcto, setCorrecto] = useState('');
const [isEdit, setisEdit] = useState(false);
const [fecha,setFecha ] = useState('');
const [monto,setMonto ] = useState('');
const [descripcion,setDescripcion ] = useState('');
const [nombrer,setNombrer ] = useState('');
useEffect(() => {
    const baseURL="http://127.0.0.1:8000/api/categories";
    axios.get(baseURL).then((response) => {
      setCategoria(response.data);
      // Filtrar solo los objetos que tienen la propiedad 'id'


    });
    async  function verificarEdit(){

        try {
          const obtenerParametros = window.location.href;
          const dividirUrl = obtenerParametros.split("/")
          const obtenerUltimoValor = dividirUrl[dividirUrl.length - 1];
          console.log(obtenerUltimoValor);
  
          if (obtenerUltimoValor != "Crear_pago") {
            setisEdit(true);
            const peticion = await axios.get("http://127.0.0.1:8000/api/gastos/" + obtenerUltimoValor);
            setLastvaloer(obtenerUltimoValor);
            setFilteredCategory(peticion.data.id_categoria);
            setNombrer(peticion.data.nombre);
                        setFecha(peticion.data.fecha_gasto)
            setMonto(peticion.data.monto)
            setDescripcion(peticion.data.descripcion);
            
          }
        } catch (error) {
          console.log(error);      
        }
              
  
        }
  
        verificarEdit();
    console.log(categoria);
  }, []);







  const gyefr = async (e) => {



    e.preventDefault();
    setError("");
    if (fecha === "" || monto === "" || descripcion==="" || filteredCategory==="" || nombrer==="") {
     setError("Ningun campo debe estar vacio")
        return;
    }

    try {
        const value = localStorage.getItem('id');
        if (isEdit) {
          const peticion = await axios.put("http://127.0.0.1:8000/api/gastos/"+lastvaloer, {
            id_users:value,
            nombre:nombrer,
            id_categoria:filteredCategory,
            fecha_gasto:fecha,
            
            monto:monto,
            descripcion:descripcion
          });
          console.log(peticion.data);
          
          
        }else{
          console.log("desde handleSubmit");
          const peticion = await axios.post("http://127.0.0.1:8000/api/gastos", {
            nombre:nombrer,
            id_users:value,
id_categoria:filteredCategory,
fecha_gasto:fecha,
monto:monto,
descripcion:descripcion
          });
    
          console.log(peticion.data);
        
        }

     window.location.href = "/Pago"
        
      } catch (error) {
        setError("ocurrio un error en el servidor")
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
            Ingresar Pago
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
      


       <Box 
      sx={{
       margin: "auto",
       maxWidth: "800px",
       marginTop: "10%"
      }}
    >

       <form>
       <TextField

label="Nombre de la nuevva categoria"
sx={{
  width: "100%"
}}
variant="outlined"
type="text"
fullWidth
margin="normal"
required
value={nombrer}
onChange={(e) => setNombrer(e.target.value)}
/>



       <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Selecciona la categoria que pertenece el pago</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
          label="Selecciona la categoria que pertenece el pago"

        >
         {/* Mapear las categorías a opciones */}
         {categoria.map((categori) => (
          <MenuItem key={categori.id} value={categori.id}>
            {categori.nombre}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>

    <TextField
          id="outlined-number"
          label="Ingresa fecha de pago"
          type="date"
          fullWidth
              margin="normal"
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}

        />
            <TextField

              label="Monto"
              sx={{
                width: "100%"
              }}
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              required
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
             <TextField

label="Descripción"
sx={{
  width: "100%"
}}
variant="outlined"
type="text"
fullWidth
margin="normal"
required
value={descripcion}
onChange={(e) => setDescripcion(e.target.value)}
/>
            
            
            <Typography  color='error' gutterBottom>
             {error}
            </Typography>
            <Typography  color='primary' gutterBottom>
              {correcto}
            </Typography>
            <Box sx={{  marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={gyefr}>
                {isEdit ? 'Editar Categoria' : 'Crear categoria'  } 
              </Button>
            </Box>
          </form>
          </Box>
    
    

    </Box>
    </ThemeProvider>
  );
}

export default Crear_pago;
