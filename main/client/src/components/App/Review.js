import React, { useState, useEffect } from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
import { Typography, Grid, Button } from '@mui/material';

const Review = () => {
  const [userID, setUserID] = useState('1');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('/getMovies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setEnteredReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSubmit = async () => {
    const errors = [];

    if (!selectedMovie) {
      errors.push('Select your movie');
    }

    if (!enteredTitle) {
      errors.push('Enter your review title');
    }

    if (!enteredReview) {
      errors.push('Enter your review');
    }

    if (!selectedRating) {
      errors.push('Select the rating');
    }

    if (errors.length > 0) {
      setErrorMessage(errors);
    } else {
      setErrorMessage([]);
      setConfirmationMessage('Your review has been received');

      const reviewData = {
        movieID: selectedMovie,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
        
      };

      try {
        const response = await fetch('/addReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        });
        // Handle response if needed
      } catch (error) {
        console.error('Error adding review:', error);
      }

      setSelectedMovie('');
      setEnteredTitle('');
      setEnteredReview('');
      setSelectedRating('');
      setUserID('1');
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h3">Review a movie</Typography>
      </Grid>
      <Grid item xs={12}>
        <MovieSelection movies={movies} selectedMovie={selectedMovie} onMovieChange={handleMovieChange} />
      </Grid>
      <Grid item xs={12}>
        <ReviewTitle enteredTitle={enteredTitle} onTitleChange={handleTitleChange} />
      </Grid>
      <Grid item xs={12}>
        <ReviewBody enteredReview={enteredReview} onReviewChange={handleReviewChange} />
      </Grid>
      <Grid item xs={12}>
        <ReviewRating selectedRating={selectedRating} onRatingChange={handleRatingChange} />
      </Grid>
      {errorMessage.length > 0 && (
        <Grid item xs={12}>
          {errorMessage.map((error, index) => (
            <Typography key={index} color="error">{error}</Typography>
          ))}
        </Grid>
      )}
      {confirmationMessage && (
        <Grid item xs={12}>
          <Typography>{confirmationMessage}</Typography>
          <Typography>Selected Movie: {selectedMovie}</Typography>
          <Typography>Review Title: {enteredTitle}</Typography>
          <Typography>Review Body: {enteredReview}</Typography>
          <Typography>Rating: {selectedRating}</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Review