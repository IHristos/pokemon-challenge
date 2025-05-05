import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Pokemon App
      </Typography>
      <List>
        <ListItem button>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='Pokemons' />
        </ListItem>
        <ListItem button>
          <ListItemText primary='About' />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position='sticky' sx={{ backgroundColor: '#0099FF' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant='h6'
          component='div'
          sx={{
            flexGrow: 1,
            textAlign: { xs: 'right', sm: 'left' },
          }}
        >
          Pokemon App
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <nav>
            <ul
              className='navbar-list'
              style={{
                display: 'flex',
                gap: '16px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              <li className='navbar-item'>Home</li>
              <li className='navbar-item'>Pokemons</li>
              <li className='navbar-item'>About</li>
            </ul>
          </nav>
        </Box>
      </Toolbar>

      <Drawer
        anchor='left'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
