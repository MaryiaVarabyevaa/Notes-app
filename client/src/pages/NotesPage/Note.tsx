import React from 'react';
import { Box, Input, makeStyles, Stack, TextField, Typography } from '@mui/material';
import { INoteComponent } from '../../types/note';
import { font } from '../../helpers/font';


const classes = {
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
};

const Note =({ ...obj } : INoteComponent) => {

  const { id, date, text, header, tags, editedItem, editedNoteId, headerValue, setHeaderValue, textValue, setTextValue } = obj;
  return (
    <>
      <Stack spacing={1.5}>
        {
          editedItem && editedNoteId === id?
            <>
              <TextField
                variant="standard"
                multiline
                value={headerValue}
                onChange={(e) => setHeaderValue(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  style: {
                    ...font('500', '24px', '36px', '0.05em', '#010101', 'inherit'),
                    padding: '0px',
                  },
                }}
              />
              <TextField
                variant="standard"
                multiline
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  style: {
                    ...font('400', '16px', '24px', '0.05em', '#010101','inherit'),
                    padding: '0px',
                  },
                }}
              />
            </> :
            <>
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
            </>
        }
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