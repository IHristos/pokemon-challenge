import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Background from '../components/background';
import { useCompare } from '../components/compareContext';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import '../css/pokemonPage.css';
import { capitalizeFirstChar } from '../utils/capitalizeFirstChar';

const PokemonPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(undefined);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [typeEffectiveness, setTypeEffectiveness] = useState({
    strengths: [],
    weaknesses: [],
    resistant: [],
    vulnerable: [],
  });
  const navigate = useNavigate();
  const images = import.meta.glob('../assets/shiny/*.png', { eager: true });
  const typeIcons = import.meta.glob('../assets/typeIcons/*.svg', {
    eager: true,
  });
  const [imgSrc, setImgSrc] = useState(null);
  const sprite = useRef(false);
  const { addPokemonToCompare } = useCompare();

  useEffect(() => {
    setPokemon(undefined);
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + name)
      .then(function (response) {
        setPokemon(response.data);
      })
      .catch(function () {
        setPokemon(false);
      });
  }, [name]);

  useEffect(() => {
    if (!pokemon) return;
    const imageKey = `../assets/shiny/${pokemon?.id}.png`;
    const shinyImage = images[imageKey]?.default;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;
    setImgSrc(shinyImage || spriteUrl);
    sprite.current = false;
  }, [pokemon]);

  useEffect(() => {
    if (!pokemon) return;
    axios.get(pokemon.species.url).then((speciesRes) => {
      const evoUrl = speciesRes.data.evolution_chain.url;
      axios.get(evoUrl).then((evoRes) => {
        const evoList = [];
        function traverse(chain) {
          if (!chain) return;
          evoList.push(chain.species);
          if (chain.evolves_to && chain.evolves_to.length > 0) {
            chain.evolves_to.forEach(traverse);
          }
        }
        traverse(evoRes.data.chain);
        setEvolutionChain(evoList);
      });
    });
  }, [pokemon]);

  useEffect(() => {
    if (!pokemon) return;
    const fetchTypeData = async () => {
      const typeUrls = (pokemon.types || []).map((t) => t.type.url);
      const typeData = await Promise.all(
        typeUrls.map((url) => axios.get(url).then((res) => res.data)),
      );

      const strengths = new Set();
      const weaknesses = new Set();
      const resistant = new Set();
      const vulnerable = new Set();
      typeData.forEach((type) => {
        type.damage_relations.double_damage_to.forEach((t) =>
          strengths.add(t.name),
        );
        type.damage_relations.double_damage_from.forEach((t) =>
          weaknesses.add(t.name),
        );
        type.damage_relations.half_damage_from.forEach((t) =>
          resistant.add(t.name),
        );
        type.damage_relations.half_damage_to.forEach((t) =>
          vulnerable.add(t.name),
        );
      });
      setTypeEffectiveness({
        strengths: Array.from(strengths),
        weaknesses: Array.from(weaknesses),
        resistant: Array.from(resistant),
        vulnerable: Array.from(vulnerable),
      });
    };
    fetchTypeData();
  }, [pokemon]);

  const handleImgError = () => {
    if (!pokemon) return;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;
    const defaultImage = images['../assets/shiny/0.png']?.default;
    if (!sprite.current && imgSrc !== spriteUrl && spriteUrl) {
      setImgSrc(spriteUrl);
      sprite.current = true;
    } else {
      setImgSrc(defaultImage);
    }
  };

  const handleAddToCompare = async (poke) => {
    if (!poke) return;
    if (poke.stats) {
      addPokemonToCompare(poke);
    } else {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${poke.name || poke.id}`,
        );
        addPokemonToCompare(res.data);
      } catch (e) {
        console.error('Error fetching Pokemon data:', e);
      }
    }
  };

  const getPokemon = () => {
    if (!pokemon) {
      return <Typography variant='h4'>Loading...</Typography>;
    }

    const { id, species, height, weight, types } = pokemon;
    const noImageAvailable = images['../assets/shiny/0.png']?.default;
    const capitalizedName = capitalizeFirstChar(pokemon.name);
    return (
      <>
        {/* Pokemon Card Section */}
        <div
          className='pokemon-page-container'
          style={{ position: 'relative' }}
        >
          <IconButton
            className='pokemon-page-add-btn'
            onClick={() => handleAddToCompare(pokemon)}
            title='Add to Compare'
          >
            <AddIcon color='action' />
          </IconButton>
          <Typography variant='h2' sx={{ mb: 2 }}>
            {`${id}. ${capitalizedName}`}
          </Typography>
          <img
            className='pokemon-page-image'
            src={imgSrc || noImageAvailable}
            alt={capitalizedName}
            onError={handleImgError}
          />
          {imgSrc === noImageAvailable && (
            <Typography variant='h5'>
              No Available Image for this Pokemon
            </Typography>
          )}
          <div className='pokemon-page-details'>
            <Typography variant='h4' component='h2'>
              Pokemon Details:
            </Typography>
            <div className='pokemon-details-grid'>
              <div className='pokemon-details-label'>
                <Typography variant='h6' component='h3'>
                  Height:
                </Typography>
                <Typography variant='h6' component='h3'>
                  Weight:
                </Typography>
                <Typography variant='h6' component='h3'>
                  Types:
                </Typography>
                <Typography variant='h6' component='h3'>
                  Species:
                </Typography>
                <Typography variant='h6' component='h3'>
                  Abilities:
                </Typography>
              </div>
              <div className='pokemon-details-value'>
                <Typography variant='h6' component='h3'>
                  {height}
                </Typography>
                <Typography variant='h6' component='h3'>
                  {weight}
                </Typography>
                <Typography variant='h6' component='h3'>
                  {(types || [])
                    .map((typeObj) => capitalizeFirstChar(typeObj.type.name))
                    .join(', ')}
                </Typography>
                <Typography variant='h6' component='h3'>
                  {capitalizeFirstChar(species.name)}
                </Typography>
                <Typography variant='h6' component='h3'>
                  {(pokemon.abilities || [])
                    .map((a) => capitalizeFirstChar(a.ability.name))
                    .join(', ')}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        {/* Type Effectiveness Section */}
        {pokemon && (
          <div className='pokemon-type-effectiveness'>
            <Typography variant='h4' sx={{ mt: 4, mb: 2 }}>
              Type Effectiveness
            </Typography>
            <div className='type-effectiveness-grid'>
              <div className='type-effectiveness-label'>Strengths:</div>
              <div className='type-effectiveness-values'>
                {typeEffectiveness.strengths.length === 0
                  ? 'None'
                  : typeEffectiveness.strengths.map((type) => {
                      const iconKey = `../assets/typeIcons/${type}.svg`;
                      const iconSrc = typeIcons[iconKey]?.default;
                      return iconSrc ? (
                        <Tooltip key={type} title={capitalizeFirstChar(type)}>
                          <span className={`type-icon-bg ${type}`}>
                            <img
                              src={iconSrc}
                              alt={type}
                              className='type-icon'
                            />
                          </span>
                        </Tooltip>
                      ) : (
                        <span key={type}>{capitalizeFirstChar(type)}</span>
                      );
                    })}
              </div>
              <div className='type-effectiveness-label'>Weaknesses:</div>
              <div className='type-effectiveness-values'>
                {typeEffectiveness.weaknesses.length === 0
                  ? 'None'
                  : typeEffectiveness.weaknesses.map((type) => {
                      const iconKey = `../assets/typeIcons/${type}.svg`;
                      const iconSrc = typeIcons[iconKey]?.default;
                      return iconSrc ? (
                        <Tooltip key={type} title={capitalizeFirstChar(type)}>
                          <span className={`type-icon-bg ${type}`}>
                            <img
                              src={iconSrc}
                              alt={type}
                              className='type-icon'
                            />
                          </span>
                        </Tooltip>
                      ) : (
                        <span key={type}>{capitalizeFirstChar(type)}</span>
                      );
                    })}
              </div>
              <div className='type-effectiveness-label'>Resistant:</div>
              <div className='type-effectiveness-values'>
                {typeEffectiveness.resistant.length === 0
                  ? 'None'
                  : typeEffectiveness.resistant.map((type) => {
                      const iconKey = `../assets/typeIcons/${type}.svg`;
                      const iconSrc = typeIcons[iconKey]?.default;
                      return iconSrc ? (
                        <Tooltip key={type} title={capitalizeFirstChar(type)}>
                          <span className={`type-icon-bg ${type}`}>
                            <img
                              src={iconSrc}
                              alt={type}
                              className='type-icon'
                            />
                          </span>
                        </Tooltip>
                      ) : (
                        <span key={type}>{capitalizeFirstChar(type)}</span>
                      );
                    })}
              </div>
              <div className='type-effectiveness-label'>Vulnerable:</div>
              <div className='type-effectiveness-values'>
                {typeEffectiveness.vulnerable.length === 0
                  ? 'None'
                  : typeEffectiveness.vulnerable.map((type) => {
                      const iconKey = `../assets/typeIcons/${type}.svg`;
                      const iconSrc = typeIcons[iconKey]?.default;
                      return iconSrc ? (
                        <Tooltip key={type} title={capitalizeFirstChar(type)}>
                          <span className={`type-icon-bg ${type}`}>
                            <img
                              src={iconSrc}
                              alt={type}
                              className='type-icon'
                            />
                          </span>
                        </Tooltip>
                      ) : (
                        <span key={type}>{capitalizeFirstChar(type)}</span>
                      );
                    })}
              </div>
            </div>
          </div>
        )}
        {/* Pokemon Evolutionp Section */}
        {evolutionChain.length > 0 && (
          <div className='pokemon-evolution-section'>
            <Typography variant='h4' sx={{ mt: 4, mb: 2 }}>
              Evolution
            </Typography>
            <div className='pokemon-evolution-cards'>
              {evolutionChain.map((evo) => {
                const match = evo.url.match(/\/(\d+)\/?$/);
                const evoId = match ? match[1] : '';
                const shinyImg =
                  images[`../assets/shiny/${evoId}.png`]?.default;
                const apiSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`;
                const fallbackImg = images['../assets/shiny/0.png']?.default;
                return (
                  <div
                    className='pokemon-evolution-card'
                    key={evoId}
                    style={{ position: 'relative' }}
                  >
                    <IconButton
                      className='pokemon-evolution-add-btn'
                      onClick={() =>
                        handleAddToCompare({
                          id: Number(evoId),
                          name: evo.name,
                        })
                      }
                      title='Add to Compare'
                    >
                      <AddIcon color='action' />
                    </IconButton>
                    <img
                      src={shinyImg || apiSprite}
                      alt={capitalizeFirstChar(evo.name)}
                      className='pokemon-evolution-img'
                      style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/pokemon/${evo.name}`)}
                      onError={(e) => {
                        if (e.target.src !== apiSprite) {
                          e.target.src = apiSprite;
                        } else if (fallbackImg) {
                          e.target.src = fallbackImg;
                        }
                      }}
                    />
                    <Typography variant='body2'>#{evoId}</Typography>
                    <Typography variant='body1'>
                      {capitalizeFirstChar(evo.name)}
                    </Typography>
                  </div>
                );
              })}
            </div>
            <div className='pokemon-page-back-container'>
              <Button
                className='pokemon-page-back'
                variant='contained'
                onClick={() => navigate('/')}
              >
                Back to Pokedex
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <Background />
      <Navbar />
      {pokemon === undefined && (
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
            <CircularProgress color='error' />
          </div>
        </div>
      )}
      {pokemon && getPokemon()}
      {pokemon === false && (
        <div className='pokemon-page-container'>
          <img
            className='pokemon-page-image'
            src={
              import.meta.glob('../assets/shiny/missingNo.png', {
                eager: true,
              })['../assets/shiny/missingNo.png']?.default
            }
            alt='Pokemon not found'
          />
          <Typography variant='h4'>Pokemon not found</Typography>
        </div>
      )}
      <Footer />
    </>
  );
};
export default PokemonPage;
