import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { INote } from '../../types/note';

const Note = ({ ...note }: INote) => {
  const { id, color, date, text, header, tags, queueNumber } = note;
  return (
    <Box sx={{
      width: '360px',
      height: '600px',
      bgcolor: `${color}`,
      padding: '8px 15px 0 14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'inherit',
    }}>
      <Stack spacing={1.5}>
        <Typography variant="h3" sx={{
          fontWeight:' 500',
          fontSize: '24px',
          lineHeight: '36px',
          letterSpacing: '0.05em',
          color: '#010101',
          fontFamily: 'inherit',
        }}>
          { header }
        </Typography>
        <Typography variant="body2" sx={{
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0.05em',
          color: '#010101',
          fontFamily: 'inherit',
        }}>
          { text }
        </Typography>
      </Stack>
      <Stack>
        <Typography sx={{
          alignSelf: 'end',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '21px',
          textAlign: 'right',
          letterSpacing: '0.05em',
          color: '#858585',
          fontFamily: 'inherit',
        }}
        >
          { date }
        </Typography>
        <Box sx={{ display: 'flex', gap: '5px' }}>
          {
            tags.map((tag, index) => {
              return <Typography key={index} sx={{
                fontWeight: '300',
                fontSize: '14px',
                lineHeight: '21px',
                letterSpacing: '0.05em',
                color: '#1B18B4',
                fontFamily: 'inherit',
              }}>
                { tag }
              </Typography>;
            })
          }
        </Box>
      </Stack>
    </Box>
  );
};

export default Note;