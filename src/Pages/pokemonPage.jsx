import { Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';

const PokemonPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    setPokemon(undefined);
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + name)
      .then(function (response) {
        setPokemon(response.data);
      })
      .catch(function () {
        setPokemon(false);
      });
  }, [name]);

  const getPokemon = () => {
    if (!pokemon) {
      return <Typography variant='h4'>Loading...</Typography>;
    }
    const { id, species, height, weight, types } = pokemon;
    const images = import.meta.glob('../assets/shiny/*.png', { eager: true });
    const imageKey = `../assets/shiny/${pokemon?.id}.png`;
    const pokemonFullImage = images[imageKey]?.default;
    const capitalizedName = capitalizeFirstChar(pokemon.name);

    return (
      <>
        <Typography variant='h1'>
          {`${id}.`}
          {capitalizedName}
          <img
            style={{ width: '300px', height: '300px' }}
            src={pokemonFullImage}
          />
        </Typography>
        <Typography variant='h2'>Pokemon Details:</Typography>
        <Typography variant='h3'>Height: {height}</Typography>
        <Typography variant='h3'>Weight: {weight}</Typography>
        <Typography variant='h3'>
          Types:{' '}
          {(types || [])
            .map((typeObj) => capitalizeFirstChar(typeObj.type.name))
            .join(', ')}
        </Typography>
        <Typography variant='h3'>
          Species: {capitalizeFirstChar(species.name)}
        </Typography>
      </>
    );
  };

  // I need to add an image for showing when the pokemon is not found (maybe the MissinNo pokemon card image, or the egg 0.png)

  return (
    <>
      <Navbar />
      {pokemon === undefined && <CircularProgress color='secondary' />}
      {pokemon && getPokemon()}
      {pokemon === false && (
        <>
          <img
            src={
              import.meta.glob('../assets/shiny/0.png', { eager: true })[
                '../assets/shiny/0.png'
              ]?.default
            }
            alt='Pokemon not found'
            style={{ width: '300px', height: '300px' }}
          />
          <Typography variant='h4'>Pokemon not found</Typography>
        </>
      )}
      {pokemon !== undefined && (
        <Button variant='contained' onClick={() => navigate('/')}>
          Back to Pokedex
        </Button>
      )}
      <div className='pokemon-page'>
        <h1>{`Pokemon Page for Pokemon: #${pokemon?.id || name}`}</h1>
      </div>
      <Footer />
    </>
  );
};

export default PokemonPage;
