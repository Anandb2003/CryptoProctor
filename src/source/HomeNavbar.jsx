import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './HomeNavbar.css'; // Import your custom CSS file

function HomeNavbar() {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand href="/" className="navbar-brand">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>EXAMTECHPRO</strong></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/login" className="nav-link"><strong>CUSTOMER</strong></Nav.Link>
          <Nav.Link href="/adminlogin" className="nav-link"><strong>ADMIN</strong></Nav.Link>
          <Nav.Link href="/contactinfo" className="nav-link"><strong>CONTACT INFO</strong></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomeNavbar;
