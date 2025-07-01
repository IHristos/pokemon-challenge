import ash from '../assets/ash.png';
import pokeball1 from '../assets/pokeball1.png';
import pokeball2 from '../assets/pokeball2.png';
import '../css/background.css';

function Background() {
  return (
    <div className='background'>
      <img src={pokeball2} alt='Pokeball' className='pokeball1' />
      <img src={pokeball1} alt='Pokeball' className='pokeball2' />
      <img src={pokeball2} alt='Pokemon Group' className='pokeball3' />
      <img src={pokeball1} alt='Pokeball' className='pokeball4' />
      <img src={pokeball2} alt='Pokeball' className='pokeball5' />
      <img src={ash} alt='Ash' className='ash' />
    </div>
  );
}

export default Background;
