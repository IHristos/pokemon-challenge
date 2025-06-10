import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import '../css/cardGrid.css';

const PokemonCard = ({ pokemonId, pokemon }) => {
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  console.log(pokemonId); // For debugging. Needs to be deleted when the project is finished.
  console.log(pokemon); // For debugging. Needs to be deleted when the project is finished.

  return (
    <Card className='card'>
      <CardMedia
        className='test'
        image={sprite}
        style={{ width: '200px', height: '200px', margin: 'auto' }}
      />
      <CardContent>
        <Typography variant='h5' component='div'>
          {`${pokemon.name}`}
        </Typography>
        <Typography variant='h5' component='div'>
          {`${pokemon.types.map((typeObj) => typeObj.type.name).join(', ')}`}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {`ID: ${pokemon.id}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
