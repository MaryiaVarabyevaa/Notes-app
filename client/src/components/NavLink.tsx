import React from 'react';
import {ILink} from "../types/navBar";
import {Link} from "react-router-dom";

const NavLink = ({text, link}: ILink) => {

    return (
        <Link
            to={link}
            style={{
                color: '#858585',
                fontWeight: '700',
                fontSize: '24px',
                lineHeight: '33px',
                letterSpacing: '0.05em',
                textDecoration: 'none'
            }}
            onClick={(e) => {
                // const elem = e.target as HTMLElement;
                // elem.classList.toggle("clicked");
                // if (elem.classList.contains("clicked")) {
                //     elem.style.color = "#010101"
                // } else {
                //     elem.style.color = '#858585'
                // }
            }}
        >
            { text }
        </Link>
    );
};

export default NavLink;