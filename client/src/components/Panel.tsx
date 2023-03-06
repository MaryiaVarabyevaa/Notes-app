import React from 'react';
import { Box, Button } from '@mui/material';
import pic from '../assets/pic.png';

const Panel = () => {
  return (
    <Box sx={{
      width: '360px',
      height: '46px',
      background: '#EEEEEE',
      boxShadow: '0px -4px 10px rgba(1, 1, 1, 0.25)',
      borderRadius: '16px 16px 0px 0px',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Button sx={{
        background: '#FEFEFE',
        border: '1px solid #858585',
        borderRadius: '50%',
        minWidth: '40px',
        minHeight: '40px',
      }}>
        <img src={pic} alt="N"/>
      </Button>
    </Box>
  );
};

export default Panel;