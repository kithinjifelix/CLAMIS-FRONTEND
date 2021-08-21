import React, { useContext, useState } from 'react';
import { ListGroup, Dropdown, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ConfigContext} from "../../../../contexts/ConfigContext";
import useAuth from '../../../../hooks/useAuth';

import avatar1 from '../../../../assets/images/user/avatar-1.jpg';

const NavRight = () => {
    const configContext = useContext(ConfigContext);
    const { logout, user } = useAuth();
    const { rtlLayout } = configContext.state;

    const [listOpen, setListOpen] = useState(false);

    const handleLogout = async () => {
        try {
            //handleClose();
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <React.Fragment>
            <ListGroup as='ul' bsPrefix=' ' className="navbar-nav ml-auto" id='navbar-right'>
                <ListGroup.Item as='li' bsPrefix=' '>
                    <Dropdown alignRight={!rtlLayout} className="drp-user">
                        <Dropdown.Toggle as={Link} variant='link' to='#' id="dropdown-basic">
                            <i className="icon feather icon-settings"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight className="profile-notification">
                            <div className="pro-head">
                                <img src={avatar1} className="img-radius" alt="User Profile"/>
                                <span>{ user.firstName + " " + user.middleName + " " + user.lastName }</span>
                                <Link to='#' className="dud-logout" title="Logout" onClick={handleLogout}>
                                    <i className="feather icon-log-out"/>
                                </Link>
                            </div>
                            <ListGroup as='ul' bsPrefix=' ' variant='flush' className="pro-body">
                                <ListGroup.Item as='li' bsPrefix=' '><Link to='#' className="dropdown-item" onClick={handleLogout}><i className="feather icon-log-out"/> Logout</Link></ListGroup.Item>
                            </ListGroup>
                        </Dropdown.Menu>
                    </Dropdown>
                </ListGroup.Item>
            </ListGroup>
        </React.Fragment>
    );
};

export default NavRight;
