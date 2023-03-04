import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useState, MouseEvent } from 'react';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { INoteComponent } from '../../types/note';
import { font } from '../../helpers/font';


const Note = forwardRef(({ ...obj }: INoteComponent, ref) => {
  const { id, date, text, header, tags, editedItem, editedNoteId, headerValue, setHeaderValue, textValue, setTextValue } = obj;
  // const [currentText, setCurrentText] = useState<string>('');

  useLayoutEffect(() => {
    if (id === editedNoteId) {
      setHeaderValue(header);
      setTextValue(text);
    }
  }, [editedItem]);


  // const func = (text: string) => {
  //   const arr = text.split(' ');
  //   const newArr = [];
  //   let str = '';
  //   for (let i = 0; i < arr.length; i++) {
  //     if ([arr[i].startsWith('#')]) {
  //       if (str === '') {
  //         newArr.push(arr[i] + ' ');
  //       } else {
  //         newArr.push(str, arr[i] + ' ');
  //       }
  //
  //       str = '';
  //     } else {
  //       str += arr[i] + ' ';
  //     }
  //
  //     if (i === arr.length - 1) {
  //       console.log('ssssssssss');
  //       newArr.push(str);
  //     }
  //   }
  //   return newArr;
  // };
  //
  // console.log(func(text));

  return (
    <>
      <Stack spacing={1.5}>
        {
          editedItem && editedNoteId === id?
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
                // whiteSpace: 'normal',
                // wordBreak: 'break-word',
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
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowY: 'auto',
              }}
              >
                {
                  text.split(' ').map((item, index) => {
                    return !item.includes('#')?
                      <span key={index} >{item + ' '}</span> : <span
                        style={{ color: '#1B18B4' }}
                        key={index}
                      >
                        { item.replace(/#/gi, '') + ' '}
                      </span>;
                  })
                }
                {/*{text}*/}
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
});

export default Note;