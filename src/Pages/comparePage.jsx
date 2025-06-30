import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/background';
import { useCompare } from '../components/compareContext';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';

const images = import.meta.glob('../assets/shiny/*.png', { eager: true });

const CompareCard = ({ pokemon, onAddClick }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const sprite = useRef(false);

  useEffect(() => {
    if (!pokemon) return;
    const imageKey = `../assets/shiny/${pokemon.id}.png`;
    const shinyImage = images[imageKey]?.default;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    setImgSrc(shinyImage || spriteUrl);
    sprite.current = false;
  }, [pokemon]);
  const handleImgError = () => {
    if (!pokemon) return;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    const defaultImage = images['../assets/shiny/0.png']?.default;
    if (!sprite.current && imgSrc !== spriteUrl && spriteUrl) {
      setImgSrc(spriteUrl);
      sprite.current = true;
    } else {
      setImgSrc(defaultImage);
    }
  };

  const noImageAvailable = images['../assets/shiny/0.png']?.default;
  const capitalizedName = pokemon ? capitalizeFirstChar(pokemon.name) : '';

  return (
    <Card
      sx={{
        width: 350,
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        m: 2,
        p: 0,
      }}
    >
      {pokemon ? (
        <>
          <CardContent sx={{ width: '100%' }}>
            <Typography variant='h5'>{capitalizedName}</Typography>
            <Typography variant='h5'>{pokemon.id}</Typography>
            <img
              style={{ width: '200px', height: '200px' }}
              src={imgSrc || noImageAvailable}
              alt={capitalizedName}
              onError={handleImgError}
            />
            {imgSrc === noImageAvailable && (
              <Typography variant='h6'>
                No Available Image for this Pokemon
              </Typography>
            )}
            <Typography variant='h6'>
              {pokemon.types && pokemon.types.length > 0
                ? pokemon.types
                    .map((t) => capitalizeFirstChar(t.type.name))
                    .join(', ')
                : 'Unknown type'}
            </Typography>
          </CardContent>
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 2, width: '100%', borderRadius: 0 }}
            onClick={() => onAddClick('/')}
          >
            Choose another Pokemon
          </Button>
        </>
      ) : (
        <Button
          onClick={onAddClick}
          sx={{ flexDirection: 'column', color: 'grey.500' }}
        >
          <AddIcon sx={{ fontSize: 80 }} />
          <Typography>Add pokemon to compare</Typography>
        </Button>
      )}
    </Card>
  );
};

const ComparePage = () => {
  const { compareList } = useCompare();
  const navigate = useNavigate();

  const handleAddClick = (index) => {
    navigate(`/?replaceIndex=${index}`);
  };

  return (
    <>
      <Background />
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CompareCard
          pokemon={compareList[0]}
          onAddClick={() => handleAddClick(0)}
        />
        <CompareCard
          pokemon={compareList[1]}
          onAddClick={() => handleAddClick(1)}
        />
      </Box>
      <Footer />
    </>
  );
};

CompareCard.propTypes = {
  pokemon: PropTypes.object,
  onAddClick: PropTypes.func.isRequired,
};

export default ComparePage;
