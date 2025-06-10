import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        textAlign: 'center',
        padding: '20px',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#3f51b5',
        color: 'white',
      }}
    >
      <Typography variant='body2'>
        © {new Date().getFullYear()} All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
