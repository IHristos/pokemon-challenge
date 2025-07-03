import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '../components/background';
import { useCompare } from '../components/compareContext';
import CompareHexagon from '../components/compareHexagon';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';

const images = import.meta.glob('../assets/shiny/*.png', { eager: true });
const typeIcons = import.meta.glob('../assets/typeIcons/*.svg', {
  eager: true,
});

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
        height: 'auto',
        minHeight: 450,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: pokemon ? 'space-between' : 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        m: 2,
        p: 0,
      }}
    >
      {pokemon ? (
        <>
          <CardContent sx={{ width: '100%' }}>
            <Typography
              variant='body3'
              sx={{ textAlign: 'center', marginTop: 6, marginLeft: '10px' }}
            >
              ID: {pokemon.id}
            </Typography>
            <Typography variant='h5' sx={{ textAlign: 'center' }}>
              {capitalizedName}
            </Typography>
            <img
              style={{
                width: '200px',
                height: '200px',
                display: 'block',
                margin: '0 auto',
              }}
              src={imgSrc || noImageAvailable}
              alt={capitalizedName}
              onError={handleImgError}
            />
            {imgSrc === noImageAvailable && (
              <Typography variant='h6' sx={{ textAlign: 'center' }}>
                No Available Image for this Pokemon
              </Typography>
            )}
            <Typography
              variant='h6'
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
                marginTop: 6,
              }}
            >
              {pokemon.types && pokemon.types.length > 0
                ? pokemon.types.map((t) => {
                    const typeName = t.type.name;
                    const iconKey = `../assets/typeIcons/${typeName}.svg`;
                    const iconSrc = typeIcons[iconKey]?.default;
                    return (
                      <span
                        key={typeName}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: 8,
                        }}
                      >
                        {iconSrc && (
                          <span className={`type-icon-bg ${typeName}`}>
                            <img
                              src={iconSrc}
                              alt={typeName}
                              className='type-icon'
                            />
                          </span>
                        )}
                        {capitalizeFirstChar(typeName)}
                      </span>
                    );
                  })
                : 'Unknown type'}
            </Typography>
            {pokemon.stats && (
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  marginTop: 6,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {[
                    'hp',
                    'attack',
                    'defense',
                    'special-attack',
                    'special-defense',
                    'speed',
                  ].map((statKey) => (
                    <Typography
                      key={statKey}
                      variant='body1'
                      sx={{ textAlign: 'left', minWidth: 120 }}
                    >
                      {capitalizeFirstChar(statKey.replace('-', ' '))}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {[
                    'hp',
                    'attack',
                    'defense',
                    'special-attack',
                    'special-defense',
                    'speed',
                  ].map((statKey) => {
                    const statObj = pokemon.stats.find(
                      (s) => s.stat.name === statKey,
                    );
                    return (
                      <Typography
                        key={statKey}
                        variant='body1'
                        sx={{ textAlign: 'right', minWidth: 30 }}
                      >
                        {statObj ? statObj.base_stat : 'N/A'}
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            )}
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            color: 'grey.500',
            alignItems: 'center',
            justifyContent: 'center',
          }}
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
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          gap: { xs: 2, md: 4 },
          width: '100vw',
          boxSizing: 'border-box',
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <CompareCard
          pokemon={compareList[0]}
          onAddClick={() => handleAddClick(0)}
        />
        <Box
          sx={{
            width: { xs: 280, sm: 320, md: 400 },
            height: { xs: 280, sm: 320, md: 400 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: { xs: 2, md: 0 },
          }}
        >
          <CompareHexagon pokemon1={compareList[0]} pokemon2={compareList[1]} />
        </Box>
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
