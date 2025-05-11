// App.js
import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import MoviePage from './pages/MoviePage';
import Favorites from './pages/Favorites';
import { MovieProvider } from './context/MovieContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? 'dark' : 'light' } }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode}/>} />
            <Route path="/movie/:id" element={<MoviePage darkMode={darkMode} setDarkMode={setDarkMode}/>} />
            <Route path="/favorites" element={<Favorites darkMode={darkMode} setDarkMode={setDarkMode}/>} />
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
