import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import HomeNavbar from './HomeNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Customerregister() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.phone)) {
      setError('Please fill out all fields.');
      return;
    }
    if (step === 2 && (formData.password !== formData.confirmPassword)) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    data.append('confirmPassword', formData.confirmPassword);
    if (formData.profileImage) {
      data.append('profileImage', formData.profileImage);
    }

    try {
      const response = await axios.post('http://localhost:6900/api/users/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setSuccess(true);
        setError('');
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          profileImage: null,
        });
      }
    } catch (error) {
      setError(error.response?.data || 'An error occurred while submitting the form.');
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
                  src="https://png.pngtree.com/thumb_back/fh260/background/20230718/pngtree-illustration-of-technology-s-online-testing-with-a-laptop-books-and-image_3911808.jpg"
                  style={styles.cardImg}
                />
              </div>
              <div style={styles.cardForm}>
                <Card.Body>
                  <h2 style={{ fontWeight: 'bold' }}>
                    CUSTOMER REGISTER FORM
                  </h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {success && <Alert variant="success">Registration successful!</Alert>}
                  <Form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}>
                    {step === 1 && (
                      <>
                        <Form.Group controlId="formName">
                          <Form.Label><strong>FULL NAME</strong></Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

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

                        <Form.Group controlId="formPhone">
                          <Form.Label><strong>PHONE NUMBER</strong></Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </>
                    )}

                    {step === 2 && (
                      <>
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

                        <Form.Group controlId="formConfirmPassword">
                          <Form.Label><strong>CONFIRM PASSWORD</strong></Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formProfileImage">
                          <Form.Label><strong>PROFILE IMAGE</strong></Form.Label>
                          <Form.Control
                            type="file"
                            name="profileImage"
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </>
                    )}

                    {step === 1 && (
                      <Button variant="primary" onClick={handleNext}>
                        <strong>NEXT</strong>
                      </Button>
                    )}
                    {step === 2 && (
                      <>
                        <Button variant="primary" type="submit">
                          <strong>REGISTER</strong>
                        </Button>
                        <Button variant="secondary" style={styles.nextButton} onClick={() => setStep(1)}>
                          <strong>BACK</strong>
                        </Button>
                      </>
                    )}
                  </Form>

                  <div style={styles.linkContainer}>
                    <Link to="/login">Already registered? Click here to login.</Link>
                  </div>
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
    background: 'linear-gradient(to right, #CD5C5C, #F08080)', // Gradient background for the form
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
    border: '1px solid #F08080',
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
  },
  linkContainer: {
    marginTop: '1rem',
    textAlign: 'right',
  },
  nextButton: {
    marginLeft: '1rem',
  },
};

export default Customerregister;
