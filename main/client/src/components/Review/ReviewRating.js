import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import Typography from '@mui/material/Typography';
import { FormLabel, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material';

const ReviewRating = ({selectedRating, onRatingChange}) => {

  //states declarations
  //constants and functions declarations

  return (
    <div>
    {/* JSX block */}
      <FormControl component ="fieldset">
        <RadioGroup
          aria-label = "rating"
          name = "rating"
          value = {selectedRating}
          onChange={onRatingChange}
        >
          <FormControlLabel value = "1" control = {<Radio />} label = "1" />
          <FormControlLabel value = "2" control = {<Radio />} label = "2" />
          <FormControlLabel value = "3" control = {<Radio />} label = "3" />
          <FormControlLabel value = "4" control = {<Radio />} label = "4" />
          <FormControlLabel value = "5" control = {<Radio />} label = "5" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default ReviewRating;
