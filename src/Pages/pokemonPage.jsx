import { Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Background from '../components/background';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import '../css/pokemonPage.css';
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
        <div className='pokemon-page-container'>
          <Typography variant='h2' sx={{ mb: 2 }}>
            {`${id}. ${capitalizedName}`}
          </Typography>
          <img
            className='pokemon-page-image'
            src={imgSrc || noImageAvailable}
            alt={capitalizedName}
            onError={handleImgError}
          />
          {imgSrc === noImageAvailable && (
            <Typography variant='h5'>
              No Available Image for this Pokemon
            </Typography>
          )}
          <div className='pokemon-page-details'>
            <Typography variant='h4' component='h2'>
              Pokemon Details:
            </Typography>
            <div className='pokemon-details-grid'>
              <div className='pokemon-details-label'>
                <Typography variant='h6' component='h3'>
                  Height:
                </Typography>
                <Typography variant='h6' component='h3'>
                  Weight:
                </Typography>
                <Typography variant='h6' component='h3'>
                  Types:
                </Typography>
                <Typography variant='h6' component='h3'>
                  Species:
                </Typography>
              </div>
              <div className='pokemon-details-value'>
                <Typography variant='h6' component='h3'>
                  {height}
                </Typography>
                <Typography variant='h6' component='h3'>
                  {weight}
                </Typography>
                <Typography variant='h6' component='h3'>
                  {(types || [])
                    .map((typeObj) => capitalizeFirstChar(typeObj.type.name))
                    .join(', ')}
                </Typography>
                <Typography variant='h6' component='h3'>
                  {capitalizeFirstChar(species.name)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className='pokemon-page-back-container'>
          <Button
            className='pokemon-page-back'
            variant='contained'
            onClick={() => navigate('/')}
          >
            Back to Pokedex
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Background />
      <Navbar />
      {pokemon === undefined && (
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
            <CircularProgress color='error' />
          </div>
        </div>
      )}
      {pokemon && getPokemon()}
      {pokemon === false && (
        <div className='pokemon-page-container'>
          <img
            className='pokemon-page-image'
            src={
              import.meta.glob('../assets/shiny/missingNo.png', {
                eager: true,
              })['../assets/shiny/missingNo.png']?.default
            }
            alt='Pokemon not found'
          />
          <Typography variant='h4'>Pokemon not found</Typography>
        </div>
      )}
      <Footer />
    </>
  );
};
export default PokemonPage;
