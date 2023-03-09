import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Drawer, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, getUniqueTags } from '../../http/noteAPI';
import { INote, INoteState, IRootState } from '../../types/note';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import SearchBar from '../../components/SearchBar';
import { addNoteAction, setNotesAction } from '../../store/noteReducer';
import { ITagState } from '../../types/tag';
import { setTagsAction } from '../../store/tagsReducer';
import NotesList from './NotesList';


const headerLength = '80px';

const NotesPage = () => {
  const { width } = useWindowDimensions();
  const notes = useSelector((state: IRootState) => state.noteReducer.notes);
  const currentTag = useSelector((state: IRootState) => state.tagsReducer.currentTag);
  const dispatch = useDispatch();
    // const [currentPage, setCurrentPage] = useState();
    // const [fetching, setFetching] = useState(true);
    //
    // useEffect(() =>{
    //   const box = document.body.querySelector('.box') as HTMLElement;
    //   box.addEventListener('scroll', scrollHandler);
    //   return () => box.addEventListener('scroll', scrollHandler);
    // }, []);
    //
    // const scrollHandler = (e: any) => {
    //   console.log('scroll');
    // };


    const getAllNotes = async (): Promise<INote[]> => {
    const hashTag = currentTag? currentTag : '';
    const notes = await getNotes(hashTag);
    return notes;
  };

  const getTags = async (): Promise<string[]> => {
    const tags = await getUniqueTags();
    return tags;
  };

  useEffect(() => {
    getAllNotes().then((notes) => dispatch(setNotesAction(Array.from(notes))));
  },[currentTag]);

  useEffect(() => {
    getTags().then((tags) => dispatch(setTagsAction(Array.from(tags))));
  }, [notes]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '35px',
      padding: '45px 50px',
      '@media (max-width: 870px)': {
        padding: 0,
        paddingTop: '20px',
        alignItems: 'center',
      },
      '@media (max-width: 360px)': {
        padding: 0,
      },
    }}
    style={{
      height: `calc(100vh - ${headerLength})`,
      overflowY: 'hidden', whiteSpace: 'nowrap',
    }}
    >
      {
        width > 360 && <SearchBar />
      }
      <NotesList />
    </Box>
  );
};

export default NotesPage;