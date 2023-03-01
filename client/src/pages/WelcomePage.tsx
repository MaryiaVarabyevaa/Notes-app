import React from 'react';
import { Box, Typography } from '@mui/material';
import { font } from '../helpers/font';
import { flex } from '../helpers/flex';

const headerLength = '80px';

const WelcomePage = () => {

  return (
    <Box
      sx={{
        ...flex('row', 'center', 'center'),
      }}
      style={{
        minHeight: `calc(100vh - ${headerLength})`,
      }}
    >
      <Typography sx={{
        ...font('400', '85px', '126px', '0.05em', '#010101', 'inherit'),
        textTransform:' uppercase',
      }}
      >
        Welcome!
      </Typography>
    </Box>
  );
};

export default WelcomePage;