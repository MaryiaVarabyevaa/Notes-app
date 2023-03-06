import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { getNotes, getUniqueTags } from '../../http/noteAPI';
import { INote } from '../../types/note';
import NotesList from './NotesList';
import SearchBar from './SearchBar';
import Hint from './Hint';


const NotesPage = () => {
  const [tag, setTag] = useState<string | null>(null);
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [notes, setNotes] = useState<INote[]>([]);

  const getAllNotes = async (): Promise<INote[]> => {
    const hashTag = tag? tag : '';
    const notes = await getNotes(hashTag);
    return notes;
  };

  const getTags = async (): Promise<string[]> => {
    const tags = await getUniqueTags();
    return tags;
  };

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
    });
  },[tag]);

  useEffect(() => {
    getTags().then((tags) => setTagsList(Array.from(tags)));
  }, [notes]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '35px', margin: '45px 50px' }}>
      <SearchBar setTag={setTag} tagsList={tagsList} />
      <NotesList notes={notes} setNotes={setNotes} />
    </Box>
  );
};

export default NotesPage;