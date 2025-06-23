import { Route, Routes } from 'react-router-dom';
import './App.css';
import ComparePage from './Pages/comparePage';
import PokedexPage from './Pages/pokedexPage';
import PokemonPage from './Pages/pokemonPage';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PokedexPage />} />
      <Route path='/pokemon/:pokemonId' element={<PokemonPage />} />
      <Route path='/compare' element={<ComparePage />} />
    </Routes>
  );
};

export default App;
