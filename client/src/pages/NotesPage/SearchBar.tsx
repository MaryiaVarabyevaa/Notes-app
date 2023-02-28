import React from 'react';
import { InputAdornment, makeStyles, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      sx={{
        width: '360px',
      }}
      placeholder="Search tag..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          color: '#858585',
          height: '40px',
          padding: 0,
        },
      }}
    />
  );
};

export default SearchBar;