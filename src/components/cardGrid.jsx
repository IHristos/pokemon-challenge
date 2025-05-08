import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from '@mui/material';
import mockData from '../mockData';

const getPokemonCard = (pokemonId) => {
  const [pokemonData, setPokemonData] = useState(mockData);
  console.log(pokemonData[`${pokemonId}`]);
   const { id, name } = pokemonData[`${pokemonId}`];
   const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pokemonId}>
      <Card className='card'>
        <CardMedia className='test' image={sprite} style={{ width: "130px", height: "130px", margin:"auto"}} />
        <CardContent>
          <Typography variant='h5' component='div'>
            {`${pokemonData[`${pokemonId}`].name}`}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {`ID: ${pokemonId}`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const CardGrid = () => {
  const [pokemonData, setPokemonData] = useState(mockData);
  return (
    <>
      {!pokemonData || pokemonData.length === 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress color='secondary' />
        </div>
      ) : (
        <Grid container spacing={2} className='card-grid'>
          {Object.keys(pokemonData).map((pokemonId) =>
            getPokemonCard(pokemonId),
          )}
        </Grid>
      )}
    </>
  );
};

export default CardGrid;
