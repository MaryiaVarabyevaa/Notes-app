import React, { DragEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { Reorder, useMotionValue } from 'framer-motion';
import { motion } from 'framer-motion';
import { updateNoteInfo, updateQueueNumber } from '../../http/noteAPI';
import { INote, IRootState } from '../../types/note';
import { flex } from '../../helpers/flex';
import { getDate } from '../../helpers/getDate';
import { getTags } from '../../helpers/getTags';
import { cloneArray } from '../../helpers/cloneArray';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { addNoteAction, setEditedNoteIdAction, setNotesAction, updateNoteAction } from '../../store/noteReducer';
import { addNewNote } from '../../helpers/addNewNote';
import { size } from '../../helpers/size';
import { font } from '../../helpers/font';
import Note from './Note';
import ContextMenu from './ContextMenu';
import Hint from './Hint';

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


const initialHint: IInitialContextMenu = {
  show: false,
  x: 0,
  y: 0,
};

const NotesList = () => {
  const [editedItem, setEditedItem] = useState<HTMLElement | null>(null);
  const [currentNote, setCurrentNote] = useState<INote | null>(null);
  const [contextMenu, setContextMenu] = useState<IInitialContextMenu>(initialContextMenu);
  const [hint, setHint] = useState<IInitialContextMenu>(initialHint);
  const lastNoteRef = useRef<HTMLDivElement>(null);
  const [headerValue, setHeaderValue] = useState<string>('');
  const [textValue, setTextValue] = useState<string>('');
  const dispatch = useDispatch();
  const notes = useSelector((state: IRootState) => state.noteReducer.notes);
  const isAdded = useSelector((state: IRootState) => state.noteReducer.isAdded);
  const editedNoteId = useSelector((state: IRootState) => state.noteReducer.editedNoteId);
  const { width } = useWindowDimensions();

  const [notesList, setNotesList] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [fetching, setFetching] = useState(true);

  useEffect(() =>{
    const box = document.body.querySelector('.box') as HTMLElement;
    box.addEventListener('scroll', scrollHandler);
    return () => box.addEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = (e: any) => {
    console.log('scroll');
  };

  const handleAddBtnClick = async(): Promise<void> => {
    if (editedItem && editedNoteId) {
      editedItem.style.boxShadow = '';
      setEditedItem(null);
      dispatch(setEditedNoteIdAction(null));
    }
    const newNote = await addNewNote(notes);
    dispatch(addNoteAction(newNote));
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
      dispatch(updateNoteAction(newNote));
      copiedNotes[index] = newNote;
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
      dispatch(setEditedNoteIdAction(+id));
      if (container) container.style.boxShadow = '0 0 10px green';
    }
    if (editedItem != null && container === editedItem ) {
      container.style.boxShadow = '0 0 10px green';
      return;
    }
    if (editedItem != null && container && container !== editedItem) {
      await updateNote();
      setEditedItem(container);
      dispatch(setEditedNoteIdAction(+id));
      editedItem.style.boxShadow = '';
      container.style.boxShadow = '0 0 10px green';
    }

    if (!container && editedItem && !elem.classList.contains('tag')) {
      editedItem.style.boxShadow = '';
      await updateNote();
      setEditedItem(null);
      dispatch(setEditedNoteIdAction(null));
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
      dispatch(setEditedNoteIdAction(+id));
      setContextMenu({ show: true, x: pageX, y: pageY });
      if (editedItem && container !== editedItem) editedItem.style.boxShadow = '';
    }

    if (!container) {
      setContextMenu(initialContextMenu);
    }
  };

  useEffect(() => {
    if (lastNoteRef.current && editedNoteId) {
      lastNoteRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      lastNoteRef.current.style.boxShadow = '0 0 10px green';
      setEditedItem(lastNoteRef.current);
    }
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
    const notesList = notes.map((item: INote) => {
      if (item.id === note.id) {
        return { ...item, queueNumber: currentNote?.queueNumber };
      }
      if (item.id === currentNote?.id) {
        return { ...item, queueNumber: note.queueNumber };
      }
      return item;
    }) as INote[];
    await updateQueueNumber(notesList);
    dispatch(setNotesAction(notesList));
  };

  const sortFunc = (a: INote, b: INote) => a.queueNumber - b.queueNumber;

  const closeContextMenu = () => {
    setContextMenu(initialContextMenu);
    dispatch(setEditedNoteIdAction(null));
    setEditedItem(null);
  };


  let timer: ReturnType<typeof setTimeout>;

  const handlerMouseMove = (e: MouseEvent) => {
    // e.preventDefault();
    // const { pageY, pageX } = e;
    // const elem = e.target as HTMLElement;
    // elem.style.cursor = 'grab';
    // setHint(initialHint);
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //   elem.style.cursor = 'default';
    //   setHint({ show: true, x: pageX + 10, y: pageY + 10 } );
    // }, 3000);
  };


  return (
    <Box sx={{ display: 'flex', gap: '30px',
      // maxHeight: '100px',
      // height: '60vh',
      // flexGrow: 1,
      // maxHeight: '600px',
      height: '620px',
      // height: 'auto',
      overflowY: 'auto',
      // overflowX: 'auto',
      // whiteSpace: 'nowrap',
      '@media (max-width: 870px)': {
        height: 'auto',
        // flex: '0 0 600px',
        // height: '600px',
        // width: '360px',
        // overflowY: 'auto',
        // overflowX: 'auto',
        // whiteSpace: 'nowrap',
        // overflowY: 'hidden',
        flexDirection: 'column',
      },
    }}>
      <Box className="box" sx={{
        width: '1160px',
        display: 'flex',
        gap: '30px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        padding: '10px',
        '@media (max-width: 870px)': {
          width: '360px',
          height: '600px',
          flexDirection: 'column',
          margin: '0 auto',
          alignItems: 'center',
          padding: 0,
          gap: '10px',
        },
      }}>
        {
          (notes && notes.length !== 0) && notes.sort(sortFunc).map((note: INote, index: number) => ( <Box
            className="container"
            id={`${note.id}`}
            onDragStart={(e) => dragStartHandle(e, note)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, note)}
            onMouseMove={handlerMouseMove}
            draggable={true}
            ref={index === notes.length - 1? lastNoteRef : null}
            key={note.id} sx={{
              bgcolor: `${note.color}`,
              padding: '8px 15px 8px 14px',
              ...flex('column', 'space-between'),
              flex: '0 0 360px',
              cursor: 'grab',
              height: '600px',
              '@media (max-width: 360px)': {
                width: '360px',
                // flex: '0 0 600px',
                // maxHeight: '600px',
              },
            }}>
            <Note { ...{
              ...note,
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
      {
        width > 360 && <Box sx={{
          border: '5px dashed #85E0A3',
          // ...size('360px', '600px'),
          // maxHeight: '600px',
          ...flex('row', 'center', 'center'),
          flex: '0 0 360px',
          // marginTop: '10px',
          margin: '10px 0',
          '@media (max-width: 870px)': {
            flex: '0 1 200px',
          },
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
      }
      {
        contextMenu.show &&
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            id={editedNoteId}
            closeContextMenu={closeContextMenu}
            updateNote={updateNote}
          />
      }
      {
        hint.show && !contextMenu.show &&
          <Hint x={hint.x} y={hint.y} />
      }
    </Box>
  );
};

export default NotesList;