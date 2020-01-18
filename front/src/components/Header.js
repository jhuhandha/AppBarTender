import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import { Link } from "react-router-dom";

import services from './../services/api';
import image from './../assets/bartender-assets/logo.png';

const salir = () =>{
    new services().removeToken();
    window.location.href = "/";
}

export default (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div style={{ marginBottom: '2%' }}>
            <Navbar style={{ backgroundColor: "#bc2d2c" }} light expand="md">
                <div className="container">
                    <NavbarBrand href="/">
                        <img src={image} style={{ width: 150 }} />
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {props.menu.map((e, i) => <NavItem key={i}>
                                <Link className="nav-link" style={{ color: 'white' }} to={e.path}>{e.name}</Link>
                            </NavItem>)}
                        </Nav>
                        <NavbarText>
                            <NavLink style={{ color: 'white' }} href="#" onClick={salir}>Salir</NavLink>
                        </NavbarText>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    )
}