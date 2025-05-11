import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import { Movie as MovieIcon, Favorite, AccountCircle, Logout, Brightness4, Brightness7  } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';


const Header = ( { darkMode, setDarkMode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" component={Link} to="/">
          <MovieIcon />
        </IconButton>

        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
            ml: 1,
          }}
          align='left'
        >
          Movie Explorer
        </Typography>

        <Box sx={{ display: 'flex', gap: 5 }}>
        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/favorites" color="inherit" startIcon={<Favorite />}>
            Favorites
          </Button>

          {!isLoggedIn ? (
            <Button component={Link} to="/login" color="inherit" startIcon={<AccountCircle />}>
              Login
            </Button>
          ) : (
            <>
              <Button onClick={handleLogout} color="inherit" startIcon={<Logout />}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
