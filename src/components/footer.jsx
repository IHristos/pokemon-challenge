import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    sx={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      py: 2,
      mt: 4,
      zIndex: 1300,
    }}
  >
    {/* Blurred background layer */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundColor: 'rgba(59,59,59,0.8)',
        backdropFilter: 'blur(10px)',
        pointerEvents: 'none',
      }}
    />
    {/* Text/content layer */}
    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <Typography variant='body2' color='white'>
        © {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  </Box>
);

export default Footer;
