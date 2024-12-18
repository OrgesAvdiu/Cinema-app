import React from 'react';
import StatsCard from './StatsCard';
import Chart from './Chart';
import { Container, Grid } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Users" value="1500" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Revenue" value="$10,000" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Active Users" value="1200" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="New Sign Ups" value="50" />
        </Grid>
      </Grid>
      <Chart />
    </Container>
  );
};

export default Dashboard;
