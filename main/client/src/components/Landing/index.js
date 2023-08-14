import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';


  const Landing = () => {
    const navigate = useNavigate();

    return (
      <div>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Movie Review Website
          </Typography>
          <Button color="inherit" onClick={() => navigate('/Search')}>
            Search
          </Button>
          <Button color="inherit" onClick={() => navigate('/Review')}>
            Review
          </Button>
          <Button color="inherit" onClick={() => navigate('/MyPage')}>
            MyPage
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{ margin: '20px', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Movie Review Website
        </Typography>
        <Typography variant="body1">
          This is a platform for movie enthusiasts to explore and review their favorite movies.
          <br />
          You can search for movies by title, actor, and director using the Search page.
          <br />
          Share your thoughts and reviews on movies using the Review page.
          <br />
          Check out personalized movie recommendations on My Page.
          <br />
        </Typography>
      </div>
      </div>
    )
}
export default Landing;