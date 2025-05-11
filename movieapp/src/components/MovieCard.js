import React, { useContext } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const { favorites, toggleFavorite } = useContext(MovieContext);

  const isFav = favorites.some((fav) => fav.id === movie.id);

  return (
    <Card sx={{ maxWidth: 200, borderRadius: 2, position: 'relative' }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="350"
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Image'
          }
          alt={movie.title}
        />
      </Link>

      <CardContent sx={{ paddingBottom: '16px' }}>
        <Typography variant="subtitle1" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          📅 {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'} | ⭐ {movie.vote_average}
        </Typography>
      </CardContent>

      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
        <IconButton onClick={() => toggleFavorite(movie)} color="error">
          {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
};

export default MovieCard;

