import { CircularProgress, Grid } from '@mui/material';
import { useState } from 'react';
import '../css/cardGrid.css';
import mockData from '../mockData';
import PokemonCard from './pokemonCard';

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1>Loading...</h1>
            <CircularProgress color='secondary' />
          </div>
        </div>
      ) : (
        <Grid container spacing={6} className='card-grid'>
          {Object.entries(pokemonData).map(([pokemonId, pokemon]) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={pokemonId}>
              <PokemonCard
                key={pokemonId}
                pokemonId={pokemonId}
                pokemon={pokemon}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default CardGrid;
