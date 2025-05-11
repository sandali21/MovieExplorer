import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Button, CircularProgress } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import { fetchTrendingMovies, searchMovies } from '../utils/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

const Home = ({ darkMode, setDarkMode }) => {
  const { movies, setMovies, searchQuery } = useContext(MovieContext);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  


  useEffect(() => {
    const getTrending = async () => {
      setLoading(true);
      try {
        const response = await fetchTrendingMovies();
        setTrending(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!searchQuery) getTrending();
  }, [searchQuery]);

  // Fetch search results when searchQuery changes
  useEffect(() => {
    const getSearchResults = async () => {
      if (!searchQuery) return;
      setLoading(true);
      try {
        const response = await searchMovies(searchQuery, page);
        if (page === 1) {
          setMovies(response.data.results);
        } else {
          setMovies(prev => [...prev, ...response.data.results]);
        }
        setHasMore(response.data.page < response.data.total_pages);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [searchQuery, page, setMovies]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/> <br/>
      {username && (
        <Typography variant="h6" sx={{ mt: 2, ml: 8 }} align="left">
          Welcome back, {capitalize(username)} 👋
        </Typography>
      )}
      <br/>
      <SearchBar />
      <Typography variant="h6" gutterBottom sx={{ mt: 4, ml:8 }} align='left'>
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Movies'}
      </Typography> <br/>

      {loading && page === 1 ? (
        <CircularProgress sx={{ml:8}}/>
      ) : (
        <Grid container spacing={6} sx={{ml:8}}>
          {(searchQuery ? movies : trending).map(movie => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}

      {searchQuery && hasMore && (
        <Button variant="contained" onClick={loadMore} sx={{ mt: 4 }}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default Home;
