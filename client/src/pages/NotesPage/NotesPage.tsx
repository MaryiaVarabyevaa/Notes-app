import React from 'react';
import { Box, Input } from '@mui/material';
import NotesList from './NotesList';


const NotesPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '45px', margin: '45px 50px' }}>
      <Input placeholder="Type in here…" sx={{ width: '360px' }}/>
      <NotesList />
    </Box>
  );
};

export default NotesPage;