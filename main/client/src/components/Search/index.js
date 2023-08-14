import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MovieCard from './MovieCard';

const Search = () => {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState('');
  const [actorName, setActorName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: movieTitle,
        actor: actorName,
        director: directorName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => console.error('Error fetching search results:', error));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie Review Website
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Landing
          </Button>
          <Button color="inherit" onClick={() => navigate('/Review')}>
            Review
          </Button>
          <Button color="inherit" onClick={() => navigate('/MyPage')}>
            MyPage
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Movie Title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Actor's Name (First + Last)"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Director's Name (First + Last)"
          value={directorName}
          onChange={(e) => setDirectorName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
        {searchResults.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;