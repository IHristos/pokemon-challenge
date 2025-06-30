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
import '../css/cardGrid.css';
import '../css/iconStyle.css';
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
      sx={{
        position: 'relative',
        backgroundColor: 'rgba(36, 36, 36, 0.85)',
      }}
      onClick={() =>
        navigate(`/pokemon/${pokemon.name}`, { state: { id: pokemonId } })
      }
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
          variant='h5'
          component='div'
          sx={{
            textAlign: 'center',
            textShadow: '0 0 10px #98F9FB',
            color: '#fff',
          }}
        >
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
            color: '#fff',
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
          style={{
            marginTop: '40px',
            textAlign: 'center',
            textShadow: '0 0 5px #98F9FB',
            color: '#fff',
          }}
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
  showAddButton: PropTypes.bool,
  onAdd: PropTypes.func,
};

export default PokemonCard;
