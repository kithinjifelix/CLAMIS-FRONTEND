import React, { useContext } from 'react';
import { ListGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useWindowSize from "../../../../hooks/useWindowSize";
import { ConfigContext } from "../../../../contexts/ConfigContext";
import NavSearch from "./NavSearch";

const NavLeft = () => {
    const windowSize = useWindowSize();

    const configContext = useContext(ConfigContext);
    const { rtlLayout } = configContext.state;
    let dropdownRightAlign = false;
    if (rtlLayout) {
        dropdownRightAlign = true;
    }

    let navItemClass = ['nav-item'];
    if (windowSize.width <= 575) {
        navItemClass = [...navItemClass, 'd-none'];
    }

    return (
        <React.Fragment>
            <ListGroup as='ul' bsPrefix=' ' className="navbar-nav mr-auto">
            </ListGroup>
        </React.Fragment>
    );
};

export default NavLeft;
