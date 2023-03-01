import React from 'react';
import { Box, Button } from '@mui/material';
import NotesList from './NotesList';
import SearchBar from './SearchBar';


const NotesPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '45px', margin: '45px 50px' }}>
      <SearchBar />
      <NotesList />
    </Box>
  );
};

export default NotesPage;