import React, { Dispatch, SetStateAction, KeyboardEvent } from 'react';
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

interface ISearchBar {
    tag: string;
    setTag: Dispatch<SetStateAction<string>>;
    setIsClickedEnter: Dispatch<SetStateAction<boolean>>;
}

const SearchBar = ({ tag, setTag, setIsClickedEnter } : ISearchBar) => {

  const clickKeyPress = (e: any) => {
    if(e.keyCode == 13){
      setIsClickedEnter(true);
    }
  };

  return (
    <CssTextField
      variant="outlined"
      id="custom-css-outlined-input"
      placeholder="Search tag..."
      value={tag}
      onKeyDown={(e) => clickKeyPress(e)}
      onChange={(e) => setTag(e.target.value)}
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