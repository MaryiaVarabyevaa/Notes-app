import React, { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addNote, getNotes, updateOrder } from '../../http/noteAPI';
import { INote } from '../../types/note';
import { flex } from '../../helpers/flex';
import { size } from '../../helpers/size';
import { getDate } from '../../helpers/getDate';
import { getColor } from '../../helpers/getColor';
import { font } from '../../helpers/font';
import Note from './Note';

const NotesList = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [newQueueNumber, setNewQueueNumber] = useState<number>(1);
  const [color, setColor] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<INote | null>(null);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

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
    console.log('ls');
    console.log(isUpdated);
    getAllNotes().then((notes) => {
      setNotes(notes);
      const number = notes?.at(-1)?.queueNumber;
      const color = notes?.at(-1)?.color;
      if (number) setNewQueueNumber(number + 1);
      if (color) setColor(getColor(color));
    });
  },[isUpdated]);



  // const handleChangeBtnClick = (id: number) => {
  //   setIsEdit(!isEdit);
  // };

  const dragStartHandle = (e:any, note: INote) => {
    setCurrentNote(note);
  };

  const dragEndHandler = (e:any) => {

  };

  const dragOverHandler = (e:any) => {
    e.preventDefault();

  };

  const dropHandler = async (e:any, note: INote) => {
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
    setIsUpdated(!isUpdated);
    setNotes(notesList);
  };

  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      {
        notes.length !== 0 && notes.map((note) => (<Box
          // onClick={() => handleChangeBtnClick(note.id)}
          onDragStart={(e) => dragStartHandle(e, note)}
          onDragLeave={(e) => dragEndHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
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
          {/*<Note { ...note } />*/}
          <Stack spacing={1.5}>
            <Typography variant="h3" sx={{
              ...font('500', '24px', '36px', '0.05em', '#010101', 'inherit'),
            }}>
              { note.header }
            </Typography>
            <Typography variant="body2" sx={{
              ...font('400', '16px', '24px', '0.05em', '#010101','inherit'),
            }}>
              { note.text }
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={{
              ...font('400', '14px', '21px', '0.05em', '#858585','inherit'),
              alignSelf: 'end',
              textAlign: 'right',
            }}
            >
              { note.date }
            </Typography>
            <Box sx={{ display: 'flex', gap: '5px' }}>
              {
                note.tags.map((tag, index) => {
                  return <Typography key={index} sx={{
                    ...font('300', '14px', '21px', '0.05em', '#1B18B4','inherit'),
                  }}>
                    { tag }
                  </Typography>;
                })
              }
            </Box>
          </Stack>
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