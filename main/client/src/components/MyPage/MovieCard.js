import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MovieCard = ({ movie }) => {
  const { title } = movie;

  return (
    <Card style={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;

