import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCompare } from '../components/compareContext';

const CompareCard = ({ pokemon, onAddClick }) => (
  <Card
    sx={{
      width: 350,
      height: 450,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      m: 2,
    }}
  >
    {pokemon ? (
      <CardContent>
        <Typography variant='h5'>{pokemon.name}</Typography>
        {/* Add more details as needed */}
      </CardContent>
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

const ComparePage = () => {
  const { compareList } = useCompare();
  const navigate = useNavigate();

  return (
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
        onAddClick={() => navigate('/?compare=1')}
      />
      <CompareCard
        pokemon={compareList[1]}
        onAddClick={() => navigate('/?compare=1')}
      />
    </Box>
  );
};

CompareCard.propTypes = {
  pokemon: PropTypes.object,
  onAddClick: PropTypes.func.isRequired,
};

export default ComparePage;
