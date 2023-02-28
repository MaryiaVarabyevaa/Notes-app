import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { MAIN_ROUTE, NOTES_ROUTE } from '../../constants/routes';
import { ILink } from '../../types/navBar';
import NavLink from './NavLink';


const links: ILink[] = [
  {
    text: 'Home',
    link: MAIN_ROUTE,
  },
  {
    text: 'Notes',
    link: NOTES_ROUTE,
  },
];


const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          height: '80px',
          background: '#EEEEEE',
          boxShadow: '0px 4px 10px rgba(1, 1, 1, 0.25)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', height: 'inherit', gap: '64px' }}>
          {
            links.map(({ text, link }, index) => <NavLink text={text} link={link} key={index}/>)
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;