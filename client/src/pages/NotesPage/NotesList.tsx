import React, { MouseEvent, useEffect, useRef, useState, DragEvent } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addNote, getNotes, updateNoteInfo, updateQueueNumber } from '../../http/noteAPI';
import { INote } from '../../types/note';
import { flex } from '../../helpers/flex';
import { size } from '../../helpers/size';
import { getDate } from '../../helpers/getDate';
import { getColor } from '../../helpers/getColor';
import { getTags } from '../../helpers/getTags';
import { cloneArray } from '../../helpers/cloneArray';
import Note from './Note';
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
  const [editedItem, setEditedItem] = useState<HTMLElement | null>(null);
  const [editedNoteId, setEditedNoteId] = useState<number | null>(null);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<INote | null>(null);
  const [contextMenu, setContextMenu] = useState<IInitialContextMenu>(initialContextMenu);
  const [tag, setTag] = useState('');
  const lastNoteRef = useRef<HTMLInputElement>(null);
  const contextMenuRef = useRef<any>(null);

  const [headerValue, setHeaderValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const getAllNotes = async (): Promise<INote[]> => {
    // const notes = await getNotes(tag);
    const notes = await getNotes(tag);
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

  const updateNote = async (newColor?: string): Promise<void> => {
    if (editedNoteId) {
      const { index, copiedNotes } = cloneArray(notes, editedNoteId);
      const newNote: INote = {
        id: editedNoteId as number,
        header: headerValue,
        text: textValue,
        tags: getTags(textValue),
        queueNumber: notes[index].queueNumber,
        date: getDate(),
        color: newColor? newColor : notes[index].color,
      };
      await updateNoteInfo(newNote);
      copiedNotes[index] = newNote;
      setNotes(copiedNotes);
    }
  };

  const handleClick = async (e: Event) => {
    const elem = e.target as HTMLElement;
    const container = elem.closest('.container') as HTMLElement;
    const id = container?.id;

    if (contextMenu.show) {
      setContextMenu(initialContextMenu);
    }

    if (editedItem == null) {
      setEditedItem(container);
      setEditedNoteId(+id);
      if (container) container.style.boxShadow = '0 0 20px green';
    }
    if (editedItem != null && container === editedItem) {
      return;
    }
    if (editedItem != null && container && container !== editedItem) {
      await updateNote();
      setEditedItem(container);
      setEditedNoteId(+id);
      editedItem.style.boxShadow = '';
      container.style.boxShadow = '0 0 20px green';
    }

    if (!container && editedItem) {
      editedItem.style.boxShadow = '';
      await updateNote();
      setEditedItem(null);
      setEditedNoteId(null);
    }
  };

  const handleContextMenu = (e: any) => {
    const elem = e.target as HTMLElement;
    const container = elem.closest('.container') as HTMLElement;
    const id = container?.id;
    const { pageY, pageX } = e;

    if (container || elem === container || (editedItem && container !== editedItem)) {
      e.preventDefault();
      setEditedItem(container);
      setEditedNoteId(+id);
      setContextMenu({ show: true, x: pageX, y: pageY });
    }
    if (!container) {
      setContextMenu(initialContextMenu);
    }
  };

  useEffect(() => {
    getAllNotes().then((notes) => {
      setNotes(notes);
    });
  },[]);

  useEffect(() => {
    lastNoteRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isAdded]);

  useEffect(() => {
    document.body.addEventListener('click', handleClick);
    document.body.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.body.removeEventListener('click', handleClick);
      document.body.removeEventListener('contextmenu', handleContextMenu);
    };
  });

  const dragStartHandle = (e: DragEvent<HTMLDivElement>, note: INote) => {
    setCurrentNote(note);
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = async (e: DragEvent<HTMLDivElement>, note: INote): Promise<void> => {
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

  const closeContextMenu = () => {
    setContextMenu(initialContextMenu);
    setEditedNoteId(null);
    setEditedItem(null);
  };

  // const handleClose = () => {
  //   setOpenHint(false);
  // };
  //
  // const handleOpen = () => {
  //   setOpenHint(true);
  //   return true;
  // };

  // let timer: ReturnType<typeof setTimeout>;
  //
  // const handlerMouseMove = () => {
  //   clearTimeout(timer);
  //   timer = setTimeout(handleOpen, 2000);
  // };


  return (
    <Box sx={{ display: 'flex', gap: '30px' }}>
      <Box sx={{ width: '1140px', display: 'flex', gap: '30px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {
          notes.length !== 0 && notes.sort(sortFunc).map((note, index) => ( <Box
            className="container"
            id={`${note.id}`}
            onDragStart={(e) => dragStartHandle(e, note)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, note)}
            // onMouseMove={handlerMouseMove}
            draggable={true}
            ref={index === notes.length - 1? lastNoteRef : null}
            key={note.id} sx={{
              bgcolor: `${note.color}`,
              padding: '8px 15px 8px 14px',
              ...flex('column', 'space-between'),
              flex: '0 0 360px',
              cursor: 'grab',
              height: '600px',
            }}>
            <Note { ...{
              ...note,
              editedNoteId,
              editedItem,
              headerValue,
              setHeaderValue,
              textValue,
              setTextValue,
              contextMenuShown: contextMenu.show,
            } } />
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
            id={editedNoteId}
            setNotes={setNotes}
            closeContextMenu={closeContextMenu}
            updateNote={updateNote}
            ref={contextMenuRef}
          />
      }
    </Box>
  );
};

export default NotesList;