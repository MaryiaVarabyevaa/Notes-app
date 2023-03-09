import React from 'react';
import { Box, Typography } from '@mui/material';
import { size } from '../../helpers/size';
import { font } from '../../helpers/font';
import { IHintProps } from '../../types/hintProp';


const Hint = ({ x, y }: IHintProps) => {
  return (
    <Box sx={{
      ...size('224px', '29px'),
      background:' rgba(1, 1, 1, 0.75)',
      borderRadius: '1px 8px 2px',
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
    }}>
      <Typography sx={{
        ...font('500', '16px', '22px', '0', '#FEFEFE', 'Noto Sans'),
        padding: '4px 6px 3px 11px',
      }}>
            Right click to open settings
      </Typography>
    </Box>
  );
};

export default Hint;