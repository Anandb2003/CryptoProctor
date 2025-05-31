import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import HomeNavbar from './HomeNavbar';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CustomersLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.get('http://localhost:6900/api/users/login', {
        params: formData, // This will add email and password as query parameters
      });

      if (response.status === 200) {
        const { email } = response.data; // Adjust according to your API response
        localStorage.setItem('authToken', 'your-auth-token'); // Save auth token
        localStorage.setItem('userEmail', email); // Save user email
        setSuccess(true);
        setError('');
        navigate('/customerhomepage'); // Redirect to the desired route
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('Invalid email or password.');
            break;
          case 401:
            setError('Unauthorized. Please check your credentials.');
            break;
          default:
            setError('An unexpected error occurred. Please try again later.');
        }
      } else {
        setError('Network error. Please try again.');
      }
      setSuccess(false);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <HomeNavbar />
      <div style={styles.container}>
        <div style={styles.cardContainer}>
          <Card style={styles.card}>
            <div style={styles.cardBody}>
              <div style={styles.cardImage}>
                <Card.Img
                  variant="top"
                  src="https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-countdown-to-the-college-entrance-examination-image_790187.jpg"
                  style={styles.cardImg}
                />
              </div>
              <div style={styles.cardForm}>
                <Card.Body>
                  <h2 style={styles.title}><strong>CUSTOMER LOGIN</strong></h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">Login successful!</Alert>}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                      <Form.Label><strong>EMAIL</strong></Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label><strong>PASSWORD</strong></Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <div style={styles.linkContainer}>
                    <Link to="/customerregister">Not registered? click here for register.</Link>
                  </div>

                    <Button 
                      variant="primary" 
                      type="submit" 
                      style={styles.submitButton} 
                      disabled={loading}
                    >
                      {loading ? (
                        <div style={styles.spinnerContainer}>
                          <Spinner animation="border" size="sm" />
                          <span style={styles.spinnerText}>Loading...</span>
                        </div>
                      ) : (
                        <strong>LOGIN</strong>
                      )}
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
  container: {
    padding: '2rem',
    background: 'linear-gradient(to right, #76d7c4, #58d68d)', // Gradient background for the form
    minHeight: '92vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '70rem',
    border: '1px solid #76d7c4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'row',
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
    objectFit: 'cover',
    borderRadius: '8px 0 0 8px',
  },
  submitButton: {
    marginTop: '1rem',
    position: 'relative', // Needed for spinner positioning
    overflow: 'hidden',   // Ensure spinner does not overflow
  },
  spinnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  spinnerText: {
    marginLeft: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
};

export default CustomersLogin;
