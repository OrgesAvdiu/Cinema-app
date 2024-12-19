import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Navbar from './components/NavBar';
import Dashboard from './components/Dashboard';
import UserView from './pages/admins/UserView'; // Import UserView component
import MovieView from './pages/admins/MovieView';
import CategoryView from './pages/admins/CategoryView';
import CityView from './pages/admins/CityView';
import OffersView from './pages/admins/OffersView';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Define the route for Users */}
            <Route path="/users" element={<UserView />} />
            {/* Define the route for Movies */}
            <Route path="/movies" element={<MovieView />} />
            {/* You can add more routes like Settings, etc. */}
            <Route path="/categories" element={<CategoryView />} />
            {/* You can add more routes like Settings, etc. */}
            <Route path="/cities" element={<CityView />} />
            {/* You can add more routes like Settings, etc. */}
            <Route path="/offers" element={<OffersView />} />
            {/* You can add more routes like Settings, etc. */}
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
