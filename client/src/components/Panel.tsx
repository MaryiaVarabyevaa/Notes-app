import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Button, Divider, Drawer, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';

import { Link, useLocation, useParams } from 'react-router-dom';
import NoteLink from '../assets/NoteLink.png';
import Vector from '../assets/Vector.png';
import Menu from '../assets/Menu.png';
import AddBtn from '../assets/AddBtn.png';
import { MAIN_ROUTE, NOTES_ROUTE } from '../constants/routes';
import { size } from '../helpers/size';
import { flex } from '../helpers/flex';

const linkStyle = {
  background: '#FEFEFE',
  border: '1px solid #858585',
  borderRadius: '50%',
  minWidth: '40px',
  minHeight: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Panel = () => {
  const { pathname } = useLocation();
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);


  return (
    <>
      <Box sx={{
        width: '360px',
        height: '46px',
        background: '#EEEEEE',
        boxShadow: '0px -4px 10px rgba(1, 1, 1, 0.25)',
        borderRadius: '16px 16px 0px 0px',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
        position: 'fixed', bottom: 0, left: 0, right: 0,
      }}>
        {pathname !== '/notes'? <Link
          to={NOTES_ROUTE}
          style={{
            ...linkStyle,
          }}>
          <img src={NoteLink} alt="N" style={{ ...size('18px', '25px') }}/>
        </Link> :
          <Box sx={{
            ...flex('row', 'center', 'center'),
            gap: '80px',
          }}>
            <Link
              to={MAIN_ROUTE}
              style={{ ...linkStyle }}>
              <img src={Vector} alt="Home" style={{ ...size('18px', '25px') }}/>
            </Link>
            <Button sx={{ ...linkStyle }}>
              <img src={Menu} alt="Menu" style={{ ...size('18px', '25px') }}/>
            </Button>
            <Button sx={{ ...linkStyle }}>
              <img src={AddBtn} alt="AddBtn" style={{ ...size('18px', '25px') }}/>
            </Button>
          </Box>
        }
      </Box>
    </>
  );
};

export default Panel;