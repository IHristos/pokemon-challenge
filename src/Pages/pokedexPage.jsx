import { useState } from 'react';
import Background from '../components/background';
import CardGrid from '../components/cardGrid';
import FilterBar from '../components/filterBar';
import Footer from '../components/footer';
import Navbar from '../components/navbar';

const PokedexPage = () => {
  const [filter, setFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSortChange = (e) => {
    if (e.target.value === 'id-asc') {
      setSortOption('');
    } else {
      setSortOption(e.target.value);
    }
  };
  const handleTypeChange = (e) => setSelectedTypes(e.target.value);

  const POKEMON_TYPES = [
    'Bug',
    'Dark',
    'Dragon',
    'Electric',
    'Fairy',
    'Fighting',
    'Fire',
    'Flying',
    'Ghost',
    'Grass',
    'Ground',
    'Ice',
    'Normal',
    'Poison',
    'Psychic',
    'Rock',
    'Steel',
    'Water',
  ];

  return (
    <>
      <Background />
      <Navbar></Navbar>
      <FilterBar
        filter={filter}
        handleFilterChange={handleFilterChange}
        sortOption={sortOption}
        handleSortChange={handleSortChange}
        selectedTypes={selectedTypes}
        handleTypeChange={handleTypeChange}
        POKEMON_TYPES={POKEMON_TYPES}
      />
      <CardGrid
        filter={filter}
        sortOption={sortOption}
        selectedTypes={selectedTypes}
      />
      <Footer />
    </>
  );
};

export default PokedexPage;
