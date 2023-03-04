import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { font } from '../../helpers/font';


const CssTextField = styled(TextField)({
  width: '360px',
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#858585',
    },
    // '&:hover fieldset': {
    //   borderColor: '#85E0A3',
    // },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const SearchBar = () => {

  return (
    <CssTextField
      variant="outlined"
      id="custom-css-outlined-input"
      placeholder="Search tag..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          height: '40px',
          padding: '11px 17px',
          ...font('500', '16px', '22px', '0', '#858585', 'Noto Sans'),
        },
      }}
    />
  );
};

export default SearchBar;