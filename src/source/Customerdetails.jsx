import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './AdminNavbar';

function Customerdetails() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:6900/api/users/details');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
        <AdminNavbar/>
    <Container>
      <Row className="mt-4">
        <Col>
          <h2><strong>CUSTOMER DETAILS</strong></h2>
          <Table striped bordered hover>
            <thead>
              <tr>
              <th><strong>PROFILE IMAGES</strong></th>
                <th><strong>NAME</strong></th>
                <th><strong>EMAIL</strong></th>
                <th><strong>PHONE NUMBER</strong></th>
             
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                     <td>
                    {user.profileImagePath ? (
                      <img
                        src={`/uploads/${user.profileImagePath}`} // Relative path to public folder
                        alt={user.name}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    ) : (
                      'No image'
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                 
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Customerdetails;
