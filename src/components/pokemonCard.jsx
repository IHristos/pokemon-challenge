import AddIcon from '@mui/icons-material/Add';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../css/iconStyle.css';
import '../css/pokemonCard.css';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';

const PokemonCard = ({ pokemonId, pokemon, showAddButton = false, onAdd }) => {
  const navigate = useNavigate();
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;
  const typeIcons = import.meta.glob('../assets/typeIcons/*.svg', {
    eager: true,
  });
  const capitalizedName = capitalizeFirstChar(pokemon.name);

  return (
    <Card
      className='card'
      // onClick={() =>
      //   navigate(`/pokemon/${pokemon.name}`, { state: { id: pokemonId } })
      // }
    >
      {showAddButton && (
        <IconButton
          className='add-button'
          onClick={(e) => {
            e.stopPropagation();
            onAdd && onAdd(pokemon);
          }}
        >
          <AddIcon color='action' />
        </IconButton>
      )}
      <CardContent>
        <Typography
          className='pokemon-name-text'
          variant='h5'
          component='div'
          onClick={() =>
            navigate(`/pokemon/${pokemon.name}`, { state: { id: pokemonId } })
          }
        >
          {capitalizedName ?? 'Unknown'}
        </Typography>
        <CardMedia
          className='pokemon-card-media'
          image={sprite}
          onClick={() =>
            navigate(`/pokemon/${pokemon.name}`, { state: { id: pokemonId } })
          }
        />
        <Typography
          className='pokemon-types-container'
          variant='h5'
          component='div'
        >
          {(pokemon?.types || []).map((typeObj) => {
            const typeName = typeObj?.type?.name;
            const iconKey = `../assets/typeIcons/${typeName}.svg`;
            const iconSrc = typeIcons[iconKey]?.default;
            return (
              <span className='pokemon-types-text' key={typeName}>
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
        <Typography className='pokemon-id-text' variant='body2'>
          ID: {pokemon?.id ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

PokemonCard.propTypes = {
  pokemonId: PropTypes.number,
  pokemon: PropTypes.object,
  showAddButton: PropTypes.bool,
  onAdd: PropTypes.func,
};

export default PokemonCard;
