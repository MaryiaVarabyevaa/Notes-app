import React from 'react';
import { Box, Typography } from '@mui/material';

const headerLength = '80px';

const WelcomePage = () => {

  return (
    <Box
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      }}
      style={{
        minHeight: `calc(100vh - ${headerLength})`,
      }}
    >
      <Typography sx={{
        color: '#010101',
        fontWeight: '400',
        fontSize: '85px',
        fontFamily: 'inherit',
        lineHeight:' 126px',
        letterSpacing: '0.05em',
        textTransform:' uppercase',
      }}
      >
        Welcome!
      </Typography>
    </Box>
  );
};

export default WelcomePage;