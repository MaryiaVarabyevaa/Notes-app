import React, { useLayoutEffect } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../types/note';
import { font } from '../../helpers/font';
import { getTextItems } from '../../helpers/getTextItems';
import { updateTags } from '../../http/noteAPI';
import { getDate } from '../../helpers/getDate';
import { cloneArray } from '../../helpers/cloneArray';
import { updateNoteAction } from '../../store/noteReducer';
import { INoteProp } from '../../types/noteProp';
import { editText } from '../../helpers/editText';
import { splitTag } from '../../helpers/splitTag';
import { HASH } from '../../constants/tags';



const Note =({ ...obj }: INoteProp) => {
  const { id, date, text, header, tags, color, queueNumber, editedItem, headerValue, setHeaderValue,
    textValue, setTextValue, contextMenuShown,
  } = obj;
  const dispatch = useDispatch();
  const notes = useSelector((state: IRootState) => state.noteReducer.notes);
  const editedNoteId = useSelector((state: IRootState) => state.noteReducer.editedNoteId);

  useLayoutEffect(() => {
    if (id === editedNoteId) {
      setHeaderValue(header);
      setTextValue(text);
    }
  }, [editedItem]);

  const handleDeleteTag = async (tagValue: string): Promise<void> => {
    if (id === editedNoteId) {
      const newText = editText(text, tagValue);
      const newTags = tags.filter((tag) => tag !== tagValue);
      const date = getDate();

      setTextValue(newText);
      const { index, copiedNotes } = cloneArray(notes, editedNoteId);
      copiedNotes[index].text = newText;
      copiedNotes[index].tags = newTags;
      copiedNotes[index].date = date;
      const updatedNote = {
        id,
        header,
        text: newText,
        tags: newTags,
        date,
        color,
        queueNumber,
      };
      dispatch(updateNoteAction(updatedNote));
      await updateTags({
        id,
        date,
        text: newText,
        tags: newTags,
      });
    }
  };


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
                '@media (max-width: 360px)': {
                  ...font('500', '26px', '39px', '0.05em', '#010101', 'inherit'),
                },
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
                '@media (max-width: 360px)': {
                  ...font('400', '18px', '27px', '0.05em', '#010101', 'inherit'),
                },
              }}
              >
                {
                  (text && text.length === 0)? '' : getTextItems(text).map((item: string, index) => {
                    return typeof item === 'string' && !item.startsWith('#')? item + ' ' : (
                      <>
                        {
                          splitTag(item).map((tagItem: string) => {
                            return !tagItem.startsWith(HASH)? <>{ tagItem }</> :
                              <span key={new Date().valueOf()} style={{ color: item.startsWith('#')? '#1B18B4' : 'inherit' }}>
                                { tagItem.replace(/#/gi, '') }
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
            tags && tags.map((tag) => {
              return <Typography key={tag} className="tag" sx={{
                ...font('300', '14px', '21px', '0.05em', '#1B18B4','inherit'),
                cursor: `${id === editedNoteId}`? 'pointer' : 'grab',
              }}
              onClick={() => handleDeleteTag(tag) }
              >
                {'#' + tag }
              </Typography>;
            })
          }
        </Box>
      </Stack>
    </>
  );
};

export default Note;