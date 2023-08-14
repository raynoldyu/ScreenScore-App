import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing'; // Import your Landing component
import Search from '../Search'; // Import your Search component
import Review from '../Review';
import MyPage from '../MyPage'; // Import your MyPage component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Landing />} /> {/* Landing component will be rendered when the URL path is / */}
          <Route path="/Search" element={<Search />} /> {/* Search component will be rendered when the URL path is /Search */}
          <Route path="/Review" element={<Review />} /> {/* Review component will be rendered when the URL path is /Review */}
          <Route path="/MyPage" element={<MyPage />} /> {/* MyPage component will be rendered when the URL path is /MyPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

