import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const ReviewBody = ({enteredReview, onReviewChange}) => {

  //states declarations
  //constants and functions declarations

  return (
    <div>
    {/* JSX block */}
    <label htmlFor = "review-body">Enter your review:</label>
    <TextField
      id = "review-body"
      value = {enteredReview}
      onChange = {onReviewChange}
      fullWidth
      multiline
      maxRows={4}
    />
    </div>
  );
}

export default ReviewBody;
