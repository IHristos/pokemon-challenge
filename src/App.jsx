import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/homepage';
import PokemonPage from './Pages/pokemonPage';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/pokemon/:pokemonId' element={<PokemonPage />} />
    </Routes>
  );
};

export default App;
