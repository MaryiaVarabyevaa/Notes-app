import React, { useState, MouseEvent } from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE, NOTES_ROUTE } from '../../constants/routes';
import { ILink } from '../../types/navBar';
import { font } from '../../helpers/font';
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
  const [elem, setElem] = useState<HTMLElement | null>(null);
  const handleClick = (e: MouseEvent) => {
    const linkElem = e.target as HTMLElement;
    if (elem) {
      elem.style.color = '#858585';
    }
    linkElem.style.color = '#010101';
    setElem(linkElem);
  };


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
              onClick={(e) => handleClick(e)}
              to={link}
              style={{
                ...font('700', '24px', '33px', '0.05em', '#858585'),
                // color: `${isClicked? 'red': 'green'}`,
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