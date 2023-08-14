import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const ReviewTitle = ({enteredTitle, onTitleChange}) => {

  //states declarations
  //constants and functions declarations

  return (
    <div>
    
    {/* JSX block */}
    <label htmlfor ="review-title">Enter review title:</label>
    <TextField
      id = "review-title"
      value = {enteredTitle}
      onChange = {onTitleChange}
      fullWidth
    />
    </div>
  );
}

export default ReviewTitle;
