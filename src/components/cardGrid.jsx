import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';

const pokemonCard = () => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className='card'>
        <CardContent>
          <Typography variant='h5' component='div'>
            Pokemon Name
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Pokemon Details
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const CardGrid = () => {
  return (
    <Grid container spacing={2} className='card-grid'>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
      <Grid className='grid-item' item xs={12} sm={6} md={4}>
        {pokemonCard()}
      </Grid>
    </Grid>
  );
};

export default CardGrid;
