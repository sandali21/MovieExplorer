// src/pages/Search.js
import React, { useContext, useEffect, useState } from 'react';
import {
  Container, TextField, Grid, CircularProgress, Typography
} from '@mui/material';
import axios from 'axios';
import MovieCard from './MovieCard';
import { MovieContext } from '../context/MovieContext';

const API_KEY = 'e7c2b026cd5985c38d0f578b40bc86c3';

const Search = () => {
  const { searchQuery, setSearchQuery, setMovies, movies } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setMovies(res.data.results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) handleSearch(searchQuery);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <TextField
        label="Search Movies"
        fullWidth
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        sx={{ mb: 3}}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {movies.length === 0 ? (
            <Typography variant="body1"> </Typography>
          ) : (
            <Grid container spacing={4}>
              {movies.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={3}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default Search;
