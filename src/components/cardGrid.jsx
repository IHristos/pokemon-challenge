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

const CardGrid = ({ filter = '' }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [count, setCount] = useState(0); // Total number of pokemons
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // Get page from URL, default to 0
  const pageParam = parseInt(searchParams.get('page'), 10);
  const page = isNaN(pageParam) || pageParam < 0 ? 0 : pageParam;

  // Update URL when page changes
  const setPage = (newPage) => {
    setSearchParams((params) => {
      params.set('page', newPage);
      return params;
    });
  };

  useEffect(() => {
    setLoading(true);
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
  }, [page]);

  // Filter after fetching details
  const filteredEntries = pokemonData
    ? Object.entries(pokemonData).filter(([, pokemon]) =>
        pokemon.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : [];

  // Calculate total pages
  const totalPages = Math.ceil(count / cardsPerPage);

  // Helper to get page numbers to show
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }
    const pages = [];
    // Always show first page
    pages.push(0);
    // Sliding window logic
    if (page <= 1) {
      // Show 1,2,3,...last
      pages.push(1, 2, 3);
    } else if (page === 2) {
      // Show 1,2,3,4,...last
      pages.push(1, 2, 3, 4);
    } else if (page >= totalPages - 2) {
      // Near end: show last 4 pages
      for (let i = totalPages - 4; i < totalPages - 1; i++) {
        if (i > 0) pages.push(i);
      }
    } else {
      // Show 1 ... page-1, page, page+1 ... last
      pages.push(page - 1, page, page + 1);
    }
    // Always show last page
    if (totalPages > 1) pages.push(totalPages - 1);
    // Remove duplicates and sort
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
          <Grid container spacing={6} className='card-grid'>
            {filteredEntries.length === 0 ? (
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <h2>No Pokémon found.</h2>
              </Grid>
            ) : (
              filteredEntries.map(([, pokemon]) => (
                <Grid size={{ xs: 12, sm: 6, md: 2 }} key={pokemon.id}>
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
            {/* First page */}
            <Button
              onClick={() => setPage(0)}
              disabled={page === 0}
              sx={{ minWidth: 40 }}
            >
              <FirstPageIcon />
            </Button>
            {/* -10 pages */}
            <Button
              onClick={() => setPage(Math.max(0, page - 10))}
              disabled={page < 10}
              sx={{ minWidth: 40 }}
            >
              -10
            </Button>
            {/* Previous page */}
            <Button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              sx={{ minWidth: 40 }}
            >
              <ChevronLeftIcon />
            </Button>
            {/* Page numbers */}
            {getPageNumbers().map((p, idx, arr) => {
              // Add ellipsis if gap between numbers
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
            {/* Next page */}
            <Button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page === totalPages - 1}
              sx={{ minWidth: 40 }}
            >
              <ChevronRightIcon />
            </Button>
            {/* +10 pages */}
            <Button
              onClick={() => setPage(Math.min(totalPages - 1, page + 10))}
              disabled={page > totalPages - 11}
              sx={{ minWidth: 40 }}
            >
              +10
            </Button>
            {/* Last page */}
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
};

export default CardGrid;
