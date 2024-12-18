import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatsCard = ({ title, value }) => {
  return (
    <Card style={{ margin: '10px', width: '200px' }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
