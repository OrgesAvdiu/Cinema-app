import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import Sidebar from './components/SideBar'; // Import Sidebar
import Dashboard from './components/Dashboard';
import HomePage from './pages/client/HomePage';
import CinemaView from './pages/admins/CinemaView';
import UserView from './pages/admins/UserView'; 
import MovieView from './pages/admins/MovieView';
import CategoryView from './pages/admins/CategoryView';
import CityView from './pages/admins/CityView';
import OffersView from './pages/admins/OffersView';
import RoomView from './pages/admins/RoomView';
import Cinema from './pages/client/Cinema'; // Import Cinema.js

const App = () => {
  return (
    <Router>
      <Navbar />
      <MainContent />
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/' && location.pathname !== '/cinema';

  return (
    <div style={{ display: 'flex' }}>
      {/* Conditionally render Sidebar except on HomePage and Cinema page */}
      {showSidebar && <Sidebar />}
      <div style={{ flex: 1, padding: '20px' }}> {/* Main content area */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cinema" element={<Cinema />} /> {/* Change to Cinema.js */}
          <Route path="/cinema-management" element={<CinemaView />} /> {/* Keep CinemaView for admin */}
          <Route path="/users" element={<UserView />} />
          <Route path="/movies" element={<MovieView />} />
          <Route path="/categories" element={<CategoryView />} />
          <Route path="/cities" element={<CityView />} />
          <Route path="/offers" element={<OffersView />} />
          <Route path="/room" element={<RoomView />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;