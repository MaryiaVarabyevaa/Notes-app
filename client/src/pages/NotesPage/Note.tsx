import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { INote } from '../../types/note';
import { font } from '../../helpers/font';

const Note = ({ ...note }: INote) => {
  const { id, date, text, header, tags } = note;

  return (
    <>
      <Stack spacing={1.5}>
        <Typography variant="h3" sx={{
          ...font('500', '24px', '36px', '0.05em', '#010101', 'inherit'),
        }}>
          { header }
        </Typography>
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
};

export default Note;