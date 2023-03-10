import React from 'react';
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { font } from '../helpers/font';
import { IRootState } from '../types/rootState';
import { setCurrentTagAction } from '../store/tagsReducer';
import { ISearchBarProp } from '../types/searchBarProp';


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
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});


const SearchBar = ({ handleClose }: ISearchBarProp) => {
  const dispatch = useDispatch();
  const tags = useSelector((state: IRootState) => state.tagsReducer.tags);
  const handleClick = (value: string) => {
    dispatch(setCurrentTagAction(value));
    handleClose();
  };

  return <>
    {
      tags && <Autocomplete
        options={tags}
        onChange={(e, value) => handleClick(value as string)}
        autoHighlight
        sx={{
          width: '360px',
          paddingLeft: '10px',
          '@media (max-height: 870px)': {
            paddingTop: '10px',
          },
          '@media (max-width: 360px)': {
            width: '340px',
            padding: 0,
          },
        }}
        renderOption={(props, option: any) => (
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
      />
    }
  </>;
};

export default SearchBar;