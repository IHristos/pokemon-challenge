import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { useState } from 'react';
import CardGrid from '../components/cardGrid';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const PokedexPage = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <>
      <Navbar></Navbar>
      <div>
        <SearchIcon />
        <TextField
          onChange={handleFilterChange}
          variant='outlined'
          label='Search Pokémon'
          placeholder='Enter Pokémon name or ID'
          sx={{
            marginTop: '20px',
            width: '300px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'maroon',
              '& fieldset': {
                borderColor: 'darkred',
              },
              '&:hover fieldset': {
                borderColor: 'darkred',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'seashell',
              },
              '& input': {
                color: 'seashell',
              },
            },
          }}
        />
      </div>
      <CardGrid filter={filter} />
      <Footer />
    </>
  );
};

export default PokedexPage;
