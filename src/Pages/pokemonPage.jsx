import { Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import mockData from '../mockData';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';

const PokemonPage = () => {
  const { pokemonId } = useParams();
  const [pokemon] = useState(mockData[`${pokemonId}`]);
  const capitalizedName = capitalizeFirstChar(pokemon.name);

  const getPokemon = () => {
    const { id, species, height, weight, types } = pokemon;
    const images = import.meta.glob('../assets/shiny/*.png', { eager: true });
    const imageKey = `../assets/shiny/${pokemon?.id}.png`;
    const pokemonFullImage = images[imageKey]?.default;

    return (
      <Typography variant='h1'>
        {`${id}.`}
        {capitalizedName}
        <img
          style={{ width: '300px', height: '300px' }}
          src={pokemonFullImage}
        />
        Height: {height}
        <br />
        Weight: {weight}
        <br />
        Types: {types.map((typeObj) => typeObj.type.name).join(', ')}
        <br />
        Species: {species.name}
      </Typography>
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
