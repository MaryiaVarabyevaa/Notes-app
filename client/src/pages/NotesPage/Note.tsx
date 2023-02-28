import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const Note = () => {
  return (
    <Box sx={{
      width: '360px',
      height: '600px',
      bgcolor: '#FFAFA3',
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
        }}>Добро пожаловать!</Typography>
        <Typography variant="body2" sx={{
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0.05em',
          color: '#010101',
          fontFamily: 'inherit',
        }}>
                Записать — легко!


                Добавляйте заметки — вводите `#хэштеги`, чтобы добавить теги вашим записям.
                И они автоматически добавятся к
                заметке, а в описании соответствующие тегам слова будут выделены цветом! При этом в описании
                заметки знак `#` будет удален без вашего участия, останется только слово
                соответствующее введенному хештегу!
                It`s awesomenotes!
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
            2023.01.13
        </Typography>
        <Typography sx={{
          fontWeight: '300',
          fontSize: '14px',
          lineHeight: '21px',
          letterSpacing: '0.05em',
          color: '#1B18B4',
          fontFamily: 'inherit',
        }}>
            #хэштеги #awesomenotes
        </Typography>
      </Stack>
    </Box>
  );
};

export default Note;