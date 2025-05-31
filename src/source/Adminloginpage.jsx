import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import HomeNavbar from './HomeNavbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Adminloginpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (event) => {
    event.preventDefault();
    // Replace these values with your actual admin credentials
    if (username === 'admin' && password === 'admin') {
      setSuccess(true);
      setError('');
      setTimeout(() => {
        navigate('/customerdetails'); // Use navigate instead of history.push
      }, 2000); // Redirect after 2 seconds
    } else {
      setError('Invalid credentials');
      setSuccess(false);
    }
  };

  return (
    <div>
       <HomeNavbar />
    <div style={styles.loginContainer}>
     
      <div style={styles.cardContainer}>
        <Card style={styles.card}>
          <div style={styles.cardBody}>
            <div style={styles.cardImage}>
              <Card.Img 
                variant="top" 
                src="https://img.freepik.com/premium-photo/abstract-white-padlock-icon-futuristic-digital-security-background-light-blue-theme_1191615-8853.jpg" 
                style={styles.cardImg} 
              />
            </div>
            <div style={styles.cardForm}>
              <Card.Body>
                <h3><strong>ADMIN LOGIN</strong></h3>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">Login successful!</Alert>}
                <Form onSubmit={handleLogin}>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label><strong>USERNAME</strong></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label><strong>PASSWORD</strong></Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <br/>
                  <Button variant="success" type="submit">
                    <strong>LOGIN</strong>
                  </Button>
                </Form>
              </Card.Body>
            </div>
          </div>
        </Card>
      </div>
    </div>
    </div>
  );
}

// Internal CSS styles
const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '92vh',
    background: 'linear-gradient(to right, #000000, #434343)',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '50rem',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'row',
    height: '20rem', // Adjust height as needed
  },
  cardImage: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardForm: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Make sure image covers the full height
  },
};

export default Adminloginpage;
