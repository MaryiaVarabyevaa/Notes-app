import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ILink } from '../../types/navBar';
import { font } from '../../helpers/font';

const NavLink = ({ text, link }: ILink) => {
  const [isClickedNotes, setIsClickedNotes] = useState();

  const handleClick = () => {

  };
  return (
    <Link
      to={link}
      style={{
        ...font('700', '24px', '33px', '0.05em', '#858585'),
        textDecoration: 'none',
      }}
    >
      { text }
    </Link>
  );
};

export default NavLink;