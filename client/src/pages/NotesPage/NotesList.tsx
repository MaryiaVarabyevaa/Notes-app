import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addNote, getNotes } from '../../http/noteAPI';
import { INote } from '../../types/note';
import { flex } from '../../helpers/flex';
import { size } from '../../helpers/size';
import { getDate } from '../../helpers/getDate';
import { getColor } from '../../helpers/getColor';
import Note from './Note';

const NotesList = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [newQueueNumber, setNewQueueNumber] = useState<number>(1);
  const [color, setColor] = useState<string>('');

  const getAllNotes = async (): Promise<INote[]> => {
    const notes = await getNotes();
    return notes;
  };

  useState(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
      const number = notes?.at(-1)?.queueNumber;
      const color = notes?.at(-1)?.color;
      if (number) setNewQueueNumber(number + 1);
      if (color) setColor(getColor(color));
    });
  });

  const handleClickAdd = async() => {
    const date = getDate();
    const newAdd = await addNote({ queueNumber: newQueueNumber, date, color });
    console.log(newAdd);;
    return newAdd;
  };

  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      {
        notes.length !== 0 && notes.map((note) => <Box key={note.id} sx={{
          bgcolor: `${note.color}`,
          padding: '8px 15px 0 14px',
          ...size('360px', '600px'),
          ...flex('column', 'space-between'),
        }}>
          <Note { ...note } />
        </Box>)
      }
      <Box sx={{
        border: '5px dashed #85E0A3',
        ...size('360px', '600px'),
        ...flex('row', 'center', 'center'),
      }}>
        <IconButton
          sx={{
            border: '4px solid #85E0A3',
            color: '#85E0A3',
            padding: '0',

          }}
          onClick={handleClickAdd}
        >
          <AddIcon sx={{ fontSize: 40, margin: '36px', color: '#85E0A3' }}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default NotesList;