import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { Select, MenuItem } from '@mui/material';

const MovieSelection = ({movies, selectedMovie, onMovieChange}) => {

  //states declarations
  //constants and functions declarations

  return (
    <div>
      <Typography>Select a movie:</Typography>
      <Select
        id="movie-select"
        value={selectedMovie}
        onChange={onMovieChange}
        fullWidth
      >
        {movies.map((movie) => (
          <MenuItem key={movie.id} value={movie.id}>
            {movie.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default MovieSelection
