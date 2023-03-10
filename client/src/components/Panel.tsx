import React, { useEffect } from 'react';
import { Box, Button, Drawer } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NoteLink from '../assets/NoteLink.png';
import Home from '../assets/Home.png';
import Menu from '../assets/Menu.png';
import AddBtn from '../assets/AddBtn.png';
import { MAIN_ROUTE, NOTES_ROUTE } from '../constants/routes';
import { size } from '../helpers/size';
import { flex } from '../helpers/flex';
import { getUniqueTags } from '../http/noteAPI';
import { IRootState } from '../types/note';
import { setCurrentTagAction, setTagsAction } from '../store/tagsReducer';
import { addNoteAction } from '../store/noteReducer';
import { addNewNote } from '../helpers/addNewNote';
import SearchBar from './SearchBar';

const linkStyle = {
  background: '#FEFEFE',
  border: '1px solid #858585',
  borderRadius: '50%',
  minWidth: '40px',
  minHeight: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const Panel = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const notes = useSelector((state: IRootState) => state.noteReducer.notes);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
    dispatch(setCurrentTagAction(''));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getTags = async (): Promise<string[]> => {
    const tags = await getUniqueTags();
    return tags;
  };
  useEffect(() => {
    getTags().then((tags) => dispatch(setTagsAction(Array.from(tags))));
  } );

  const list = () => (
    <Box
      sx={{
        width: 'auto',
        height: '324px',
        padding: '10px 10px 274px 10px',
        background: 'rgba(254, 254, 254, 0.9)',
        boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <SearchBar handleClose={handleClose} />
    </Box>
  );

  const handleAdd = async () => {
    const newNote = await addNewNote(notes);
    dispatch(addNoteAction(newNote));
  };

  return (
    <>
      <Box sx={{
        width: '360px',
        maxWidth: '870px',
        height: '46px',
        background: '#EEEEEE',
        boxShadow: '0px -4px 10px rgba(1, 1, 1, 0.25)',
        borderRadius: '16px 16px 0px 0px',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1111110101000,
      }}>
        {pathname !== '/notes'? <Link
          to={NOTES_ROUTE}
          style={{
            ...linkStyle,
          }}>
          <img src={NoteLink} alt="Note" style={{ ...size('18px', '25px') }}/>
        </Link> :
          <Box sx={{
            ...flex('row', 'center', 'center'),
            gap: '80px',
          }}>
            <Link
              to={MAIN_ROUTE}
              style={{ ...linkStyle }}>
              <img src={Home} alt="Home" style={{ ...size('18px', '25px') }}/>
            </Link>
            <Button sx={{ ...linkStyle }} onClick={handleOpen}>
              <img src={Menu} alt="Menu" style={{ ...size('18px', '25px') }}/>
            </Button>
            <Button sx={{ ...linkStyle }} onClick={handleAdd} className="add-btn">
              <img src={AddBtn} alt="AddBtn" className="add-btn" style={{ ...size('18px', '25px') }}/>
            </Button>
          </Box>
        }
      </Box>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        sx={{
          background: 'rgba(254, 254, 254, 0.9)',
          boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.25)',
        }}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default Panel;