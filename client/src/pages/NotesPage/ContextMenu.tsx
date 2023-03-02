import React, { Dispatch, SetStateAction } from 'react';
import { Box, Button } from '@mui/material';
import { size } from '../../helpers/size';
import { colors } from '../../helpers/getColor';
import { font } from '../../helpers/font';
import { deleteNote } from '../../http/noteAPI';
import { INote } from '../../types/note';

interface IContextMenu {
    x: number;
    y: number;
    id: number | null;
    closeContextMenu: () => void;
    notes: INote[];
    setNotes: Dispatch<SetStateAction<INote[]>>;
}

const ContextMenu = ({ x, y, id, notes, setNotes, closeContextMenu }: IContextMenu) => {

  const handleDelete = async () => {
    if (id) {
      const deletedNote = await deleteNote(id);
      if (deletedNote) {
        const index = notes.findIndex((note) => note.id === id);
        const copiedNotes = notes.slice();
        copiedNotes.splice(index, 1);
        setNotes(copiedNotes);
      }
      closeContextMenu();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '7px', background: '#858585', borderRadius: '25px 10px 10px 25px', ...size('336px', '40px'), position: 'absolute', top: `${y}px`, left: `${x}px` }}>
      <Box sx={{ borderRadius: '25px', bgcolor: '#010101', width: '239px', display: 'flex', gap: '5px', padding: '5px 17px' }}>
        {
          colors.map((color) => {
            return <Button key={color} sx={{ display: 'block-inline', padding: '0', bgcolor: `${color}`, border: '2px solid #010101', boxShadow: 'inset 0px 0px 0px 4px #FEFEFE', minWidth: '30px', minHeight: '30px', borderRadius: '50%' }}></Button>;
          })
        }
      </Box>
      <Button
        onClick={handleDelete}
        sx={{ ...font('500', '16px', '22px', '0.05em', '#FEFEFE', 'Noto Sans'), padding: '0', textTransform: 'none' }}
      >
          Remove
      </Button>
    </Box>
  );
};

export default ContextMenu;