// src/components/CustomerNavbar.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

function CustomerNavbar({ userEmail, setUserEmail }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  
    navigate('/');
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand className="navbar-brand">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>EXAMTECHPRO</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href={`/customerhomepage`} className="nav-link">
            <strong>HOME PAGE</strong>
          </Nav.Link>
          <Nav.Item className="nav-item">
            <span className="nav-link email-display">{userEmail}</span>
          </Nav.Item>
          <Nav.Link onClick={handleLogout} className="nav-link logout-icon">
            <FaSignOutAlt size={24} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomerNavbar;
