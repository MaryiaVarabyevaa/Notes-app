import React, { useState, MouseEvent, useEffect, useLayoutEffect } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_ROUTE, NOTES_ROUTE } from '../constants/routes';
import { ILink } from '../types/navBar';
import { font } from '../helpers/font';

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
  const [elem, setElem] = useState<HTMLElement | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const main = document.body.querySelector('.main') as HTMLElement;
    const notes = document.body.querySelector('.notes') as HTMLElement;
    if (pathname === '/notes') {
      notes.style.color = '#010101';
      main.style.color = '#858585';
    } else {
      notes.style.color = '#858585';
      main.style.color = '#010101';
    }
  });

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
            links.map(({ text, link }, index) => <Link
              key={link}
              to={link}
              className={text === 'Home' ? 'main' : 'notes'}
              style={{
                ...font('700', '24px', '33px', '0.05em', '#858585'),
                textDecoration: 'none',
              }}
            >
              { text }
            </Link>)
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;