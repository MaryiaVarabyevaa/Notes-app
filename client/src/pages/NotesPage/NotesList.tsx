import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addNote, getNotes, updateOrder } from '../../http/noteAPI';
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
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<INote | null>(null);

  const getAllNotes = async (): Promise<INote[]> => {
    const notes = await getNotes();
    return notes;
  };

  const handleAddBtnClick = async(): Promise<number> => {
    const date = getDate();
    const newNote = await addNote({ queueNumber: newQueueNumber, date, color });
    return newNote;
  };

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
      const number = notes?.at(-1)?.queueNumber;
      const color = notes?.at(-1)?.color;
      if (number) setNewQueueNumber(number + 1);
      if (color) setColor(getColor(color));
    });
  },[]);

  const dragStartHandle = (e: React.DragEvent<HTMLDivElement>, note: INote) => {
    setCurrentNote(note);
  };

  const dragOverHandler = (e:React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

  };

  const dropHandler = async (e:React.DragEvent<HTMLDivElement>, note: INote): Promise<void> => {
    e.preventDefault();
    const notesList = notes.map((item) => {
      if (item.id === note.id) {
        return { ...item, queueNumber: currentNote?.queueNumber };
      }
      if (item.id === currentNote?.id) {
        return { ...item, queueNumber: note.queueNumber };
      }
      return item;
    }) as INote[];
    await updateOrder(notesList);
    setNotes(notesList);
  };

  const sortFunc = (a: INote, b: INote) => a.queueNumber - b.queueNumber;

  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      {
        notes.length !== 0 && notes.sort(sortFunc).map((note) => (<Box
          onDragStart={(e) => dragStartHandle(e, note)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, note)}
          draggable={true}
          key={note.id} sx={{
            bgcolor: `${note.color}`,
            padding: '8px 15px 0 14px',
            ...size('360px', '600px'),
            ...flex('column', 'space-between'),
            cursor: 'grab',
          }}>
          <Note { ...note } />
        </Box>))
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
          onClick={handleAddBtnClick}
        >
          <AddIcon sx={{ fontSize: 40, margin: '36px', color: '#85E0A3' }}/>
        </IconButton>
      </Box>
    </Box>
  );
};

export default NotesList;