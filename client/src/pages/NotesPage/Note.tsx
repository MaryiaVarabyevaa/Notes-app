import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { INote } from '../../types/note';
import { font } from '../../helpers/font';

interface INoteNew extends INote {
  ref: any;
  isEdit?: boolean;
  editedNoteId?: number | null;
}

const Note = forwardRef(({ ...note } : INoteNew, ref) => {
  const { id, date, text, header, tags, isEdit, editedNoteId } = note;
  const headerRef = useRef(null);
  const [headerValue, setHeaderValue] = useState<string>(header);
  const [textValue, setTextValue] = useState<string>(text);

  useImperativeHandle(ref, () => ({
    header: headerValue,
    text: text,
  }));

  const handleClick = (e: any) => {
    setHeaderValue(e.target.value);
  };


  return (
    <>
      <Stack spacing={1.5}>
        {
          isEdit && id === editedNoteId?
            <TextField value={headerValue} onChange={(e) => handleClick(e)} /> :
            <Typography variant="h3" sx={{
              ...font('500', '24px', '36px', '0.05em', '#010101', 'inherit'),
            }}>
              { header }
            </Typography>
        }
        <Typography variant="body2" sx={{
          ...font('400', '16px', '24px', '0.05em', '#010101','inherit'),
        }}>
          { text }
        </Typography>
      </Stack>
      <Stack>
        <Typography sx={{
          ...font('400', '14px', '21px', '0.05em', '#858585','inherit'),
          alignSelf: 'end',
          textAlign: 'right',
        }}
        >
          { date }
        </Typography>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          {
            tags.map((tag, index) => {
              return <Typography key={index} sx={{
                ...font('300', '14px', '21px', '0.05em', '#1B18B4','inherit'),
              }}>
                { tag }
              </Typography>;
            })
          }
        </Box>
      </Stack>
    </>
  );
});

export default Note;