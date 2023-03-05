import React, { Dispatch, SetStateAction, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { font } from '../../helpers/font';


const CssTextField = styled(TextField)({
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
    tagsList: string[];
    setTag: Dispatch<SetStateAction<string | null>>;
}

const SearchBar = ({ setTag, tagsList } : ISearchBar) => {

  const handleClick = (value: string) => {
    setTag(value);
  };

  return (<Autocomplete
    options={tagsList}
    onChange={(e, value) => handleClick(value as string)}
    autoHighlight
    sx={{ width: '360px', paddingLeft: '10px' }}
    renderOption={(props, option) => (
      <Typography
        component="li"
        sx={{ ...font('500', '16px', '22px', '0', '#010101', 'Noto Sans') }}
        {...props}
      >
        {option}
      </Typography>
    )}
    renderInput={(params) => <CssTextField {...params}
      placeholder="Search tag..."
      InputProps={{ ...params.InputProps,
        startAdornment: ( <InputAdornment position="start"> <SearchIcon />
        </InputAdornment> ),
        style: {
          ...font('500', '16px', '22px', '0', '#858585', 'Noto Sans'),
        },
      }}
    />
    }
  />);
};

export default SearchBar;