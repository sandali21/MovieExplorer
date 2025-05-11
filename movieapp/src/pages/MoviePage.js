import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography, Box, Chip, Grid, CardMedia, CircularProgress, IconButton
} from '@mui/material';
import { getMovieDetails } from '../utils/api';

import { StarRate } from '@mui/icons-material';

import Header from '../components/Header';

const MoviePage = ({ darkMode, setDarkMode }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getMovieDetails(id);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 5, ml:5 }} />;

  if (!movie) return <Typography variant="subtitle1" sx={{ mt: 5, ml:5 }}>Movie Not Found</Typography>;

  const trailer = movie.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/> <br/>
      <Grid container sx={{ml:6, mt:2, mb:4}}>
        <Grid item xs={1}>
        </Grid>
        <Grid item xs={3}>
            <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}} align='left'>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </Typography> <br/>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              height="500"
              width="300"
              sx={{ borderRadius: 2 }}
            />
            <IconButton edge="start" color='inherit' sx={{fontSize:24, color:'#ffd801'}}>
              <StarRate sx={{fontSize:60, mr:1}} /> {movie.vote_average} / 10       
            </IconButton>
            <Box sx={{ mt: 2, mb:2 }} align='left'>
            {movie.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
        </Grid>

        <Grid item xs={2}>
        </Grid>

        <Grid item xs={6} sx={{ml:8, mt:6}}> 
          <div>
          <Typography variant="body2"  align='left' width={800}>
            {movie.overview}
          </Typography>

          <Typography variant="body1" sx={{ mt: 3 , fontWeight:'bold'}} align='left'>
          Cast: 
          </Typography>
          <Typography variant="body2" align='left'>
            {movie.credits.cast.slice(0, 5).map((actor) => actor.name).join(', ')}
          </Typography>
          </div> 

          {trailer && (
          <div>
          <Typography variant="body1" sx={{ mt: 3 , fontWeight:'bold'}} align='left'>
            Watch the Trailer
          </Typography> <br/>
          <Box
            component="iframe"
            width="450px"
            height="320px"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
            sx={{ borderRadius: 2 }}
          />
          </div>
          )}
          
        </Grid>
      </Grid>
      </div>
  );
};

export default MoviePage;
