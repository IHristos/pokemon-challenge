import { Box, Typography } from '@mui/material';
import '../css/footer.css';

const Footer = () => (
  <Box
    className='footer-container'
    sx={{
      py: 2,
      mt: 4,
    }}
  >
    <Box
      className='footer-background'
      sx={{
        backgroundColor: 'rgba(59,59,59,0.8)',
        backdropFilter: 'blur(10px)',
      }}
    />
    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <Typography variant='body2' color='white'>
        © {new Date().getFullYear()} Max-Eyth-Schule (Projektarbeit) - Christos
        Ioannidis
      </Typography>
    </Box>
  </Box>
);

export default Footer;
