import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../css/cardGrid.css';
import PokemonCard from './pokemonCard';

const cardsPerPage = 18;
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

const CardGrid = ({
  filter = '',
  sortOption = 'default',
  selectedTypes = [],
}) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page'), 10);
  const [internalPage, setInternalPage] = useState(0);

  const page = filter
    ? internalPage
    : isNaN(pageParam) || pageParam < 0
      ? 0
      : pageParam;

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then((response) => {
        setAllPokemonList(response.data.results);
      });
  }, []);

  const setPage = (newPage) => {
    if (filter) {
      setInternalPage(newPage);
    } else {
      setSearchParams((params) => {
        params.set('page', newPage);
        return params;
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    if (filter || sortOption !== 'default' || selectedTypes.length > 0) {
      const filterLower = filter.toLowerCase();
      const filterNum = Number(filterLower);

      let filteredList = allPokemonList.filter((p) => {
        if (filter && p.name.toLowerCase().includes(filterLower)) return true;
        if (filter && !isNaN(filterNum) && filterNum > 0) {
          const urlParts = p.url.split('/').filter(Boolean);
          const pokeId = Number(urlParts[urlParts.length - 1]);
          if (pokeId === filterNum) return true;
        }
        if (!filter) return true;
        return false;
      });

      Promise.all(filteredList.map((p) => axios.get(p.url))).then(
        (detailResponses) => {
          let detailedList = detailResponses.map((response) => response.data);
          if (
            selectedTypes.length > 0 &&
            selectedTypes.length < POKEMON_TYPES.length
          ) {
            detailedList = detailedList.filter((data) => {
              const pokemonTypes = data.types.map(
                (t) =>
                  t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1),
              );
              return selectedTypes.every((type) => pokemonTypes.includes(type));
            });
          }

          if (sortOption !== 'default') {
            if (sortOption === 'name-asc') {
              detailedList.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === 'name-desc') {
              detailedList.sort((a, b) => b.name.localeCompare(a.name));
            } else if (sortOption === 'id-asc') {
              detailedList.sort((a, b) => a.id - b.id);
            } else if (sortOption === 'id-desc') {
              detailedList.sort((a, b) => b.id - a.id);
            }
          }

          setCount(detailedList.length);
          const pageResults = detailedList.slice(
            page * cardsPerPage,
            (page + 1) * cardsPerPage,
          );

          let newPokemonData = {};
          pageResults.forEach((data) => {
            newPokemonData[data.id] = {
              id: data.id,
              name: data.name,
              sprite: data.sprites.front_default,
              types: data.types,
            };
          });
          setPokemonData(newPokemonData);
          setLoading(false);
        },
      );
    } else {
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon?limit=${cardsPerPage}&offset=${
            page * cardsPerPage
          }`,
        )
        .then(async (response) => {
          const { results, count } = response.data;
          setCount(count);
          const detailResponses = await Promise.all(
            results.map((pokemon) => axios.get(pokemon.url)),
          );
          const newPokemonData = {};
          detailResponses.forEach((response) => {
            const data = response.data;
            newPokemonData[data.id] = {
              id: data.id,
              name: data.name,
              sprite: data.sprites.front_default,
              types: data.types,
            };
          });
          setPokemonData(newPokemonData);
          setLoading(false);
        });
    }
  }, [page, filter, allPokemonList, sortOption, selectedTypes]);

  useEffect(() => {
    if (filter) setInternalPage(0);
  }, [filter]);

  const filteredEntries = pokemonData ? Object.entries(pokemonData) : [];
  const totalPages = Math.ceil(count / cardsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages = [];

    pages.push(0);

    if (page <= 1) {
      pages.push(1, 2, 3);
    } else if (page === 2) {
      pages.push(1, 2, 3, 4);
    } else if (page >= totalPages - 2) {
      for (let i = totalPages - 4; i < totalPages - 1; i++) {
        if (i > 0) pages.push(i);
      }
    } else {
      pages.push(page - 1, page, page + 1);
    }
    if (totalPages > 1) pages.push(totalPages - 1);

    const allPages = Array.from(new Set(pages)).filter(
      (p) => p >= 0 && p < totalPages,
    );
    allPages.sort((a, b) => a - b);
    return allPages;
  };

  return (
    <>
      {loading || !pokemonData ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1>Loading...</h1>
            <CircularProgress color='secondary' />
          </div>
        </div>
      ) : (
        <>
          <Grid container spacing={4} className='card-grid'>
            {filteredEntries.length === 0 ? (
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <h2>No Pokemon found.</h2>
              </Grid>
            ) : (
              filteredEntries.map(([, pokemon]) => (
                <Grid
                  size={{ xs: 12, sm: 8, md: 6, lg: 4, xl: 2 }}
                  key={pokemon.id}
                >
                  <PokemonCard
                    key={pokemon.id}
                    pokemonId={pokemon.id}
                    pokemon={pokemon}
                  />
                </Grid>
              ))
            )}
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '2rem 0',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => setPage(0)}
              disabled={page === 0}
              sx={{ minWidth: 40 }}
            >
              <FirstPageIcon />
            </Button>
            <Button
              onClick={() => setPage(Math.max(0, page - 10))}
              disabled={page < 10}
              sx={{ minWidth: 40 }}
            >
              -10
            </Button>
            <Button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              sx={{ minWidth: 40 }}
            >
              <ChevronLeftIcon />
            </Button>
            {getPageNumbers().map((p, idx, arr) => {
              const prev = arr[idx - 1];
              const showEllipsis = idx > 0 && p - prev > 1;
              return [
                showEllipsis ? <span key={`ellipsis-${p}`}>...</span> : null,
                <Button
                  key={p}
                  variant={p === page ? 'contained' : 'outlined'}
                  color={p === page ? 'primary' : 'inherit'}
                  onClick={() => setPage(p)}
                  sx={{ minWidth: 40 }}
                >
                  {p + 1}
                </Button>,
              ];
            })}
            <Button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              sx={{ minWidth: 40 }}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              onClick={() => setPage(Math.min(totalPages - 1, page + 10))}
              disabled={page > totalPages - 11}
              sx={{ minWidth: 40 }}
            >
              +10
            </Button>
            <Button
              onClick={() => setPage(totalPages - 1)}
              disabled={page === totalPages - 1}
              sx={{ minWidth: 40 }}
            >
              <LastPageIcon />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

CardGrid.propTypes = {
  filter: PropTypes.string,
  sortOption: PropTypes.string,
  selectedTypes: PropTypes.array,
};

export default CardGrid;
