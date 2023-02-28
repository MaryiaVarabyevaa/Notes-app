import React from 'react';
import { Box } from '@mui/material';
import Note from './Note';
import AddBtn from './AddBtn';

const NotesList = () => {
  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      <Note />
      <Note />
      <AddBtn />
    </Box>
  );
};

export default NotesList;