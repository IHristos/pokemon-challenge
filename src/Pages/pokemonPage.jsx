import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';

const PokemonPage = () => {
  const { pokemonId } = useParams();

  return (
    <>
      <Navbar />
      <div className='pokemon-page'>
        <h1>{`Pokemon Page for Pokemon: #${pokemonId}`}</h1>
      </div>
    </>
  );
};

export default PokemonPage;
