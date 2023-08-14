import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MovieCard = ({ movie }) => {
  const { title, director, reviews, averageReviewScore } = movie;

  return (
    <Card style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Director: {director}
        </Typography>
        {reviews ? (
          <>
            <Typography variant="h6" gutterBottom>
              Reviews:
            </Typography>
            {reviews.split(',').map((review, index) => (
              <Typography key={index} variant="body2" gutterBottom>
                {review}
              </Typography>
            ))}
            <Typography variant="subtitle2" gutterBottom>
              Average Review Score: {averageReviewScore}
            </Typography>
          </>
        ) : (
          <Typography variant="body2">No reviews available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;