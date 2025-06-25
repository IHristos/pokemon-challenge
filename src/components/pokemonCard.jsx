import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../css/cardGrid.css';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';

const PokemonCard = ({ pokemonId, pokemon }) => {
  const navigate = useNavigate();
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;
  const capitalizedName = capitalizeFirstChar(pokemon.name);

  console.log(pokemonId); // For debugging. Needs to be deleted when the project is finished.
  console.log(pokemon); // For debugging. Needs to be deleted when the project is finished.

  return (
    <Card
      className='card'
      onClick={() =>
        navigate(`/pokemon/${pokemon.name}`, { state: { id: pokemonId } })
      }
    >
      <CardMedia
        className='pokemon-card-media'
        image={sprite}
        sx={{ width: 200, height: 200, mx: 'auto' }}
      />
      <CardContent>
        <Typography variant='h5' component='div' sx={{ textAlign: 'center' }}>
          {capitalizedName ?? 'Unknown'}
        </Typography>
        <Typography variant='h5' component='div' sx={{ textAlign: 'center' }}>
          {(pokemon?.types || [])
            .map((typeObj) => capitalizeFirstChar(typeObj?.type?.name))
            .join(', ') || 'Unknown'}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          ID: {pokemon?.id ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

PokemonCard.propTypes = {
  pokemonId: PropTypes.number,
  pokemon: PropTypes.object,
};

export default PokemonCard;
