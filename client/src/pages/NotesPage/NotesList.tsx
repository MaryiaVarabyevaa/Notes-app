import React, { useState } from 'react';
import { Box } from '@mui/material';
import { getNotes } from '../../http/noteAPI';
import { INote } from '../../types/note';
import Note from './Note';
import AddBtn from './AddBtn';

const NotesList = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const getAllNotes = async (): Promise<INote[]> => {
    const notes = await getNotes();
    return notes;
  };

  useState(() => {
    getAllNotes().then((notes) => setNotes(notes));
  });

  console.log(notes);
  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      {
        notes.length !== 0 && notes.map((note) => <Note { ...note }/>)
      }
      <AddBtn />
    </Box>
  );
};

export default NotesList;