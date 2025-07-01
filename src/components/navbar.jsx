import {
  Menu as MenuIcon,
  CatchingPokemonSharp as PokemonIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/navbar.css';
import '../index.css';

const pages = ['HOME', 'COMPARE', 'ABOUT'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavClick = (page) => {
    if (page === 'HOME') navigate('/');
    else if (page === 'COMPARE') navigate('/compare');
    else if (page === 'ABOUT') navigate('/about');
  };

  return (
    <AppBar position='sticky' sx={{ backgroundColor: 'rgb(59, 59, 59)' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <PokemonIcon
            className='pokemon-icon'
            onClick={() => navigate('/')}
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 5,
            }}
          />
          <Typography
            className='navbar-title'
            variant='h5'
            noWrap
            onClick={() => navigate('/')}
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
          >
            POKEDEX APP
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton color='inherit' onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
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
              {pages.map((page) => {
                const isActive =
                  (page === 'HOME' && location.pathname === '/') ||
                  (page === 'COMPARE' && location.pathname === '/compare') ||
                  (page === 'ABOUT' && location.pathname === '/about');
                return (
                  <MenuItem
                    key={page}
                    className={`menu-items-small${isActive ? ' active' : ''}`}
                    onClick={() => {
                      handleNavClick(page);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography>{page}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <PokemonIcon
            className='pokemon-icon'
            onClick={() => navigate('/')}
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 3,
            }}
          />
          <Typography
            variant='h5'
            noWrap
            className='navbar-title'
            onClick={() => navigate('/')}
            sx={{
              display: { xs: 'flex', md: 'none' },
            }}
          >
            POKEDEX APP
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {pages.map((page) => {
              const isActive =
                (page === 'HOME' && location.pathname === '/') ||
                (page === 'COMPARE' && location.pathname === '/compare') ||
                (page === 'ABOUT' && location.pathname === '/about');
              return (
                <Button
                  key={page}
                  className={`navbar-btn${isActive ? ' active' : ''}`}
                  onClick={() => {
                    handleNavClick(page);
                    handleCloseNavMenu();
                  }}
                  sx={{
                    my: 2,
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>
          <Box sx={{ flexGrow: 0 }}></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
