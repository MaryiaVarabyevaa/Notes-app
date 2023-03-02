import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addNote, getNotes, updateNoteInfo, updateQueueNumber } from '../../http/noteAPI';
import { INote } from '../../types/note';
import { flex } from '../../helpers/flex';
import { size } from '../../helpers/size';
import { getDate } from '../../helpers/getDate';
import { getColor } from '../../helpers/getColor';
import Note from './Note';
import note from './Note';
import ContextMenu from './ContextMenu';

interface IInitialContextMenu {
  show: boolean;
  x: number;
  y: number;
}

const initialContextMenu: IInitialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};


const NotesList = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [editedItem, setEditedItem] = useState<HTMLDivElement | null>(null);
  const [editedNoteId, setEditedNoteId] = useState<number | null>(null);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<INote | null>(null);
  const [contextMenu, setContextMenu] = useState<IInitialContextMenu>(initialContextMenu);
  const [clickedNoteId, setClickedNoteId] = useState<number | null>(null);
  const lastNoteRef = useRef<HTMLInputElement>(null);
  const childRef = useRef(null);

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

  const updateNote = async () => {
    const noteIndex = notes.findIndex((note) => note.id === editedNoteId);
    const newNote = {
      id: editedNoteId as number,
      header: (childRef?.current as any).header || '' ,
      text: (childRef?.current as any).text || '',
      tags: notes[noteIndex].tags,
      queueNumber: notes[noteIndex].queueNumber,
      date: getDate(),
      color: notes[noteIndex].color,
    };
    await updateNoteInfo(newNote);
    const copiedNotes = notes.slice();
    copiedNotes[noteIndex] = newNote;
    setNotes(copiedNotes);
  };

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
    });
  },[]);

  useEffect(() => {
    lastNoteRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isAdded]);

  const handler = async (e: Event) => {
    // const elem = e.target as HTMLDivElement;
    // if (editedItem) {
    //   console.log(elem)
    //   console.log(editedItem);
    //
    //   if (!elem.classList.contains('container') && !editedItem.contains(elem)) {
    //     console.log('bbb')
    //     await updateNote();
    //     setEditedItem(null);
    //     setEditedNoteId(null);
    //   }
    // }
  };

  useEffect(() => {
    document.body.addEventListener('click', handler);
    // document.body.addEventListener('mouseover', closeContextMenu)
    return () => document.body.removeEventListener('click', handler);
  });

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

  const handleClick = async (e: MouseEvent, id: number) => {
    const elem = e.target as HTMLDivElement;
    if (editedItem === elem || editedItem?.contains(elem)) return;
    if (editedItem !== elem && editedItem !== null && !editedItem.contains(elem)) {
      console.log('aaaa');
      await updateNote();
    }
    setEditedItem(elem);
    setEditedNoteId(id);
  };

  const sortFunc = (a: INote, b: INote) => a.queueNumber - b.queueNumber;

  const handleContextMenu = (e: MouseEvent, id: number) => {
    e.preventDefault();
    const { pageY, pageX } = e;
    setClickedNoteId(id);
    setContextMenu({ show: true, x: pageX, y: pageY });
  };

  const closeContextMenu = () => {
    setContextMenu(initialContextMenu);
    setClickedNoteId(null);
  };

  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      <Box sx={{ width: '1140px', display: 'flex', gap: '30px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {
          notes.length !== 0 && notes.sort(sortFunc).map((note, index) => (<Box
            className="container"
            onContextMenu={(e)=> handleContextMenu(e, note.id)}
            onClick={(e) => handleClick(e, note.id)}
            onDragStart={(e) => dragStartHandle(e, note)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, note)}
            draggable={true}
            ref={index === notes.length - 1? lastNoteRef : null}
            key={note.id} sx={{
              bgcolor: `${note.color}`,
              padding: '8px 15px 0 14px',
              ...flex('column', 'space-between'),
              flex: '0 0 360px',
              cursor: 'grab',
              height: '600px',
            }}>
            <Note { ...{ ...note, isEdit: editedItem ? true : false, editedNoteId } } ref={childRef} />
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
      {
        contextMenu.show &&
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            notes={notes}
            id={clickedNoteId}
            setNotes={setNotes}
            closeContextMenu={closeContextMenu}
          />
      }
    </Box>
  );
};

export default NotesList;