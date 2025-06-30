import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([null, null]);

  // Add or replace at a specific index
  const setPokemonAtIndex = (pokemon, index) => {
    setCompareList((prev) => {
      const newList = [...prev];
      newList[index] = pokemon;
      return newList;
    });
  };

  const addPokemonToCompare = (pokemon) => {
    setCompareList(([first, second]) => {
      if (!first) return [pokemon, null];
      if (!second) return [first, pokemon];
      return [second, pokemon];
    });
  };

  const clearCompare = () => setCompareList([null, null]);

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addPokemonToCompare,
        clearCompare,
        setPokemonAtIndex,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}

CompareProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
