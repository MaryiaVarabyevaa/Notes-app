import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddBtn = () => {
  return (
    <Box sx={{
      width: '360px',
      height: '600px',
      border: '5px dashed #85E0A3',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <IconButton sx={{
        border: '4px solid #85E0A3',
        color: '#85E0A3',
        padding: '0',
      }}>
        <AddIcon sx={{ fontSize: 40, margin: '36px', color: '#85E0A3' }}/>
      </IconButton>
    </Box>
  );
};

export default AddBtn;