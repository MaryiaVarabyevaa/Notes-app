import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navBar/NavBar';
import Panel from './Panel';

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;