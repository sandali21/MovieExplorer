import React, { useState } from 'react';
import {
  TextField, Button, Typography, Box, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

import img from '../images/login.png';

const Login = ({darkMode, setDarkMode}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'sandali' && password === '123456') {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/'); 
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/> <br/> <br/>
      <div style={{display:'flex', flexDirection:'row', justifyContent:"flex-start"}}> 
      <div>
      <img src={img} alt='' style={{marginTop:50, marginLeft:20}}/>
      </div>
      <div>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 , width:'100%', ml:10, mt:8}}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Paper>
      </div>
      </div>
    </div>
  );
};

export default Login;