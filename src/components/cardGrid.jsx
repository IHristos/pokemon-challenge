import { CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/cardGrid.css';
import PokemonCard from './pokemonCard';

const CardGrid = () => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(async (response) => {
        const { results } = response.data;
        const detailResponses = await Promise.all(
          results.map((pokemon) => axios.get(pokemon.url)),
        );
        const newPokemonData = {};
        detailResponses.forEach((res, index) => {
          const data = res.data;
          newPokemonData[data.id] = {
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default,
            types: data.types,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

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
