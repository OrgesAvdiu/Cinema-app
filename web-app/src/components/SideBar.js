import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <div style={{ width: '200px', backgroundColor: '#f4f4f4', height: '100vh', padding: '10px' }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/movies">
          <ListItemText primary="Movies" />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button component={Link} to="/cities">
          <ListItemText primary="Cities" />
        </ListItem>
        <ListItem button component={Link} to="/offers">
          <ListItemText primary="Offers" />
        </ListItem>
        <ListItem button component={Link} to="/room">
          <ListItemText primary="Room" />
        </ListItem>
        <ListItem button component={Link} to="/cinema">
          <ListItemText primary="Cinema" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
