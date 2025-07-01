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
    <Box className='footer-background' />
    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <Typography variant='body2' color='white'>
        © {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  </Box>
);

export default Footer;
