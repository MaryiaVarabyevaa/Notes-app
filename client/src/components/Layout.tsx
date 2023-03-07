import React from 'react';
import { Outlet } from 'react-router-dom';
import { useWindowDimensions } from '../hooks/useWindowDimensions';
import NavBar from './NavBar';
import Panel from './Panel';

const Layout = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      {
        width < 361?
          <>
            <Outlet />
            <Panel />
          </> :
          <>
            <NavBar />
            <Outlet />
          </>
      }
    </>
  );
};

export default Layout;