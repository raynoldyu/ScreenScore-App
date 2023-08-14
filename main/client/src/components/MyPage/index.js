import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MovieCard from './MovieCard';

const MyPage = () => {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleGetRecommendations = () => {
    if (movieTitle.trim() !== '') {
      fetch(`/api/getRecommendationsByGenre?title=${encodeURIComponent(movieTitle)}`)
        .then((response) => response.json())
        .then((data) => {
          setRecommendations(data);
        })
        .catch((error) => console.error('Error fetching movie recommendations:', error));
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie Review Website
          </Typography>
          <Button color="inherit" onClick={() => navigate('/Search')}>
            Search
          </Button>
          <Button color="inherit" onClick={() => navigate('/Review')}>
            Review
          </Button>
          <Button color="inherit" onClick={() => navigate('/')}>
            Landing
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Enter Movie Title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleGetRecommendations}>
          Get Recommendations
        </Button>
      </div>

      {recommendations.length > 0 && (
        <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" gutterBottom>
            Movie Recommendations
          </Typography>
          {recommendations.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPage;

                   
