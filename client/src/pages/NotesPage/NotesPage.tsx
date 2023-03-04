import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import NotesList from './NotesList';
import SearchBar from './SearchBar';


const NotesPage = () => {
  const [tag, setTag] = useState('');
  const [isClickedEnter, setIsClickedEnter] = useState(false);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '45px', margin: '45px 50px' }}>
      <SearchBar tag={tag} setTag={setTag} setIsClickedEnter={setIsClickedEnter}/>
      <NotesList
          tag={tag}
          isClickedEnter={isClickedEnter}
          setIsClickedEnter={setIsClickedEnter}
          setTag={setTag}
      />
    </Box>
  );
};

export default NotesPage;