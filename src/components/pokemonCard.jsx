import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../css/cardGrid.css';

const PokemonCard = ({ pokemonId, pokemon }) => {
  const navigate = useNavigate();
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  console.log(pokemonId); // For debugging. Needs to be deleted when the project is finished.
  console.log(pokemon); // For debugging. Needs to be deleted when the project is finished.

  return (
    <Card className='card' onClick={() => navigate(`/pokemon/${pokemonId}`)}>
      <CardMedia
        className='pokemon-card-media'
        image={sprite}
        sx={{ width: 200, height: 200, mx: 'auto' }}
      />
      <CardContent>
        <Typography variant='h5' component='div'>
          {capitalizedName ?? 'Unknown'}
        </Typography>
        <Typography variant='h5' component='div'>
          {(pokemon?.types || [])
            .map((typeObj) => typeObj?.type?.name)
            .join(', ') || 'Unknown'}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          ID: {pokemon?.id ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

// This is an example that will probably will be used later when the data structure is more defined.
// PokemonCard.propTypes = {
//   PokemonId: PropTypes.number.isRequired,
//   Pokemon: PropTypes.shape({
//     Id: PropTypes.number.isRequired,
//     Name: PropTypes.string.isRequired,
//     Types: PropTypes.arrayOf(
//       PropTypes.shape({
//         Type: PropTypes.shape({
//           Name: PropTypes.string.isRequired,
//         }).isRequired,
//       }),
//     ).isRequired,
//   }).isRequired,
// };
PokemonCard.propTypes = {
  pokemonId: PropTypes.number,
  pokemon: PropTypes.object, // Flexible for now
};

export default PokemonCard;
