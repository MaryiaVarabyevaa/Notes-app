import React, { useLayoutEffect } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { INoteComponent } from '../../types/note';
import { font } from '../../helpers/font';
import { getTextItems } from '../../helpers/getTextItems';
import { splitTag } from '../../helpers/splitTag';

const Note =({ ...obj }: INoteComponent) => {
  const { id, date, text, header, tags, editedItem, editedNoteId, headerValue, setHeaderValue, textValue, setTextValue, contextMenuShown } = obj;

  useLayoutEffect(() => {
    if (id === editedNoteId) {
      setHeaderValue(header);
      setTextValue(text);
    }
  }, [editedItem]);


  return (
    <>
      <Stack spacing={1.5}>
        {
          editedItem && editedNoteId === id && !contextMenuShown?
            <>
              <TextField
                variant="standard"
                multiline
                rows={2}
                value={headerValue}
                onChange={(e) => setHeaderValue(e.target.value)}
                placeholder="Enter header"
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
                placeholder="Enter Text"
                rows={19}
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
                minHeight:'36px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                width: '331px',
              }}>
                { header }
              </Typography>
              <Typography variant="body2" sx={{
                ...font('400', '16px', '24px', '0.05em', '#010101','inherit'),
                height: '490px',
                width: '331px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowY: 'auto',
              }}
              >
                {
                  text.length === 0? '' : getTextItems(text).map((item: string, index) => {
                    return typeof item === 'string' && !item.includes('#')? item + ' ' : (
                      <>
                        {
                          splitTag(item).map((elem) => {
                            return !elem.includes('#')? elem :
                              <span style={{ color: elem.includes('#')? '#1B18B4' : 'inherit' }}>
                                {elem.replace(/#/gi, '')}
                              </span>;
                          })
                        }
                      </>
                    );
                  })
                }
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
        <Box sx={{ display: 'flex', gap: '5px', minHeight: '22px' }}>
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