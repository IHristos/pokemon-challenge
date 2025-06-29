import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../css/cardGrid.css';
import '../css/iconStyle.css';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';
const PokemonCard = ({ pokemonId, pokemon }) => {
  const navigate = useNavigate();
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;
  const typeIcons = import.meta.glob('../assets/typeIcons/*.svg', {
    eager: true,
  });
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
      <CardContent>
        <Typography variant='h5' component='div' sx={{ textAlign: 'center' }}>
          {capitalizedName ?? 'Unknown'}
        </Typography>
        <CardMedia
          className='pokemon-card-media'
          image={sprite}
          sx={{ width: 200, height: 200, mx: 'auto' }}
        />
        <Typography
          variant='h5'
          component='div'
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {(pokemon?.types || []).map((typeObj) => {
            const typeName = typeObj?.type?.name;
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
                    <img src={iconSrc} alt={typeName} className='type-icon' />
                  </span>
                )}
                {capitalizeFirstChar(typeName)}
              </span>
            );
          })}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          style={{ marginTop: '40px', textAlign: 'center' }}
        >
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
