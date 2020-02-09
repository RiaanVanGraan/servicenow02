import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends Component {

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>ServiceNow!</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="./">Home</Nav.Link>
                        <Nav.Link href="./account">Account</Nav.Link>
                        <Nav.Link href="./login">Log In</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Header;
