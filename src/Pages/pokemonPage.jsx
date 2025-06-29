import { Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Background from '../components/background';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';
const PokemonPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  const navigate = useNavigate();
  const images = import.meta.glob('../assets/shiny/*.png', { eager: true });
  const [imgSrc, setImgSrc] = useState(null);
  const sprite = useRef(false);
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
  useEffect(() => {
    if (!pokemon) return;
    const imageKey = `../assets/shiny/${pokemon?.id}.png`;
    const shinyImage = images[imageKey]?.default;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;
    setImgSrc(shinyImage || spriteUrl);
    sprite.current = false;
  }, [pokemon]);
  const handleImgError = () => {
    if (!pokemon) return;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;
    const defaultImage = images['../assets/shiny/0.png']?.default;
    if (!sprite.current && imgSrc !== spriteUrl && spriteUrl) {
      setImgSrc(spriteUrl);
      sprite.current = true;
    } else {
      setImgSrc(defaultImage);
    }
  };
  const getPokemon = () => {
    if (!pokemon) {
      return <Typography variant='h4'>Loading...</Typography>;
    }
    const { id, species, height, weight, types } = pokemon;
    const noImageAvailable = images['../assets/shiny/0.png']?.default;
    const capitalizedName = capitalizeFirstChar(pokemon.name);
    return (
      <>
        <Typography variant='h1'>
          {`${id}.`}
          {capitalizedName}
          <img
            style={{ width: '300px', height: '300px' }}
            src={imgSrc || noImageAvailable}
            alt={capitalizedName}
            onError={handleImgError}
          />
          {imgSrc === noImageAvailable && (
            <Typography variant='h5'>
              No Available Image for this Pokemon
            </Typography>
          )}
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
      <Background />
      <Navbar />
      {pokemon === undefined && <CircularProgress color='secondary' />}
      {pokemon && getPokemon()}
      {pokemon === false && (
        <>
          <img
            src={
              import.meta.glob('../assets/shiny/missingNo.png', {
                eager: true,
              })['../assets/shiny/missingNo.png']?.default
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
