import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addNote, getNotes, updateQueueNumber } from '../../http/noteAPI';
import { INote } from '../../types/note';
import { flex } from '../../helpers/flex';
import { size } from '../../helpers/size';
import { getDate } from '../../helpers/getDate';
import { getColor } from '../../helpers/getColor';
import Note from './Note';

const NotesList = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<INote | null>(null);
  const lastNote = useRef<HTMLInputElement>(null);

  const getAllNotes = async (): Promise<INote[]> => {
    const notes = await getNotes();
    return notes;
  };

  const handleAddBtnClick = async(): Promise<void> => {
    const date = getDate();
    const queueNumber = notes.length === 0? 1 : notes?.at(-1)?.queueNumber as number + 1;
    const color = notes.length === 0? '' : notes?.at(-1)?.color as string;
    const newNote = await addNote({
      queueNumber,
      date,
      color: getColor(color),
    });
    const newNotes = [ ...notes, newNote ];
    setNotes(newNotes);
    setIsAdded(!isAdded);
  };

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
    });
  },[]);

  useEffect(() => {
    lastNote?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isAdded]);

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
    await updateQueueNumber(notesList);
    setNotes(notesList);
  };

  const sortFunc = (a: INote, b: INote) => a.queueNumber - b.queueNumber;

  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      <Box sx={{ width: '1140px', display: 'flex', gap: '30px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {
          notes.length !== 0 && notes.sort(sortFunc).map((note, index) => (<Box
            onDragStart={(e) => dragStartHandle(e, note)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, note)}
            draggable={true}
            ref={index === notes.length - 1? lastNote : null}
            key={note.id} sx={{
              bgcolor: `${note.color}`,
              padding: '8px 15px 0 14px',
              ...flex('column', 'space-between'),
              flex: '0 0 360px',
              cursor: 'grab',
              height: '600px',
            }}>
            <Note { ...note } />
          </Box>))
        }
      </Box>
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