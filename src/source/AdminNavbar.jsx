import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa'; // Import logout icon
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css'; // Import your custom CSS file

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session, authentication tokens, etc.
    localStorage.removeItem('authToken'); // or any other logic to clear authentication

    // Redirect to login page
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
          <Nav.Link href="/customerdetails" className="nav-link">
            <strong>CUSTOMER DETAILS</strong>
          </Nav.Link>
          <Nav.Link href="/uploadquestions" className="nav-link">
            <strong>UPLOAD QUESTIONS</strong>
          </Nav.Link>
          <Nav.Link href="/adminquestions" className="nav-link">
            <strong>QUESTION DETAILS</strong>
          </Nav.Link>
          <Nav.Link href="/adminresultsubmission" className="nav-link">
            <strong>RESULT SUBMISSION</strong>
          </Nav.Link>
          <Nav.Link href="/adminresultdata" className="nav-link">
            <strong>RESULTS DATA</strong>
          </Nav.Link>
          <Nav.Link href="/securedata" className="nav-link">
            <strong>BLOCKCHAIN</strong>
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="nav-link logout-icon">
            <FaSignOutAlt size={24} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AdminNavbar;
