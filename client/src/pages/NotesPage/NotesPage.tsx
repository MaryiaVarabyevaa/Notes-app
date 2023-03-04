import React from 'react';
import { Box, TextField } from '@mui/material';
import NotesList from './NotesList';
import SearchBar from './SearchBar';


const NotesPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '45px', margin: '45px 50px' }}>
      <SearchBar />
      <NotesList />
      {/*<TextField*/}
      {/*    onFocus={() => console.log('focus')}*/}
      {/*    onBlur={() => console.log('blur')}*/}
      {/*/>*/}
    </Box>
  );
};

export default NotesPage;