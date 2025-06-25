import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';

const PokemonPage = () => {
  const { name } = useParams();
  const location = useLocation();
  const pokemonId = location.state?.id || name;
  const [pokemon, setPokemon] = useState('');
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + pokemonId)
      .then(function (response) {
        setPokemon(response.data);
      });
  }, [pokemonId]);

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

  return (
    <>
      <Navbar />
      {getPokemon()}
      <div className='pokemon-page'>
        <h1>{`Pokemon Page for Pokemon: #${pokemonId}`}</h1>
      </div>
      <Footer />
    </>
  );
};

export default PokemonPage;
