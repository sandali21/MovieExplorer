import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Grid, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';

const Favorites = ({darkMode, setDarkMode}) => {
  const { favorites } = useContext(MovieContext);

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/> <br/> <br/>
      <Typography variant="h5" gutterBottom align='left' sx={{ml:6}}>
      Your Favorite Movies
      </Typography> <br/>

      {favorites.length === 0 ? (
        <Typography variant="body1">You haven't added any favorite movies yet.</Typography>
      ) : (
        <Grid container spacing={6} sx={{ml:6}}>
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <MovieCard movie={movie} isFavorite />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Favorites;
