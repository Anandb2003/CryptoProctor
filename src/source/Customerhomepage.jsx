import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Modal } from 'react-bootstrap';
import CustomerNavbar from './CustomerNavbar';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Customerhomepage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [examData, setExamData] = useState(null); // State for exams
  const [fetchingExams, setFetchingExams] = useState(false); // State to track fetching status
  const [resultsData, setResultsData] = useState(null); // State for exam results
  const [fetchingResults, setFetchingResults] = useState(false); // State to track fetching results
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [showResultsModal, setShowResultsModal] = useState(false); // State for results modal

  const userEmail = localStorage.getItem('userEmail') || '';
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    if (userEmail) {
      const fetchUserData = async () => {
        try {
          console.log("Fetching user data for:", userEmail); // Debugging statement
          const response = await axios.get('http://localhost:6900/api/users/profile', {
            params: { email: userEmail },
          });

          if (response.data && response.data.email === userEmail) {
            console.log("Response data:", response.data); // Debugging statement
            setUserData(response.data);
          } else {
            setError('User data does not match the provided email.');
          }
        } catch (err) {
          console.error("API error:", err.response ? err.response.data : err.message); // Debugging statement
          setError('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setError('No email found in localStorage.');
      setLoading(false);
    }
  }, [userEmail]);

  const handleEnterExam = () => {
    navigate('/customerquestions', { state: { userEmail } });
  };

  const fetchExams = async () => {
    setFetchingExams(true);
    try {
      const response = await axios.get('http://localhost:6900/api/exams');
      setExamData(response.data);
      setShowModal(true);
    } catch (err) {
      console.error("API error:", err.response ? err.response.data : err.message);
      setError('Failed to fetch exams.');
    } finally {
      setFetchingExams(false);
    }
  };

  const fetchResults = async () => {
    setFetchingResults(true);
    try {
      const response = await axios.get('http://localhost:6900/api/exams/by-email', {
        params: { email: userEmail },
      });
      setResultsData(response.data);
      setShowResultsModal(true);
    } catch (err) {
      console.error("API error:", err.response ? err.response.data : err.message);
      setError('Failed to fetch results.');
    } finally {
      setFetchingResults(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowResultsModal(false); // Ensure results modal is closed as well
  };

  const handleViewResults = () => {
    fetchResults(); // Fetch results when clicking "VIEW RESULTS"
  };

  return (
    <div>
      <CustomerNavbar userEmail={userEmail} />
      <div style={styles.container}>
        {loading && <p style={styles.message}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {userData && (
          <Card style={styles.card}>
            <Card.Img 
              variant="top" 
              src={`/uploads/${userData.profileImagePath}`} 
              style={styles.cardImg} 
              alt="Profile" 
            />
            <Card.Body>
              <Card.Title style={styles.title}>{userData.name}</Card.Title>
              <Card.Text>
                <strong>EMAIL:</strong> {userData.email}<br />
                <strong>PHONE NUMBER:</strong> {userData.phone}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {!userData && !loading && !error && (
          <p style={styles.message}>No user data available.</p>
        )}
        <div style={styles.buttonContainer}>
          <Button 
            variant="outline-primary" 
            onClick={handleEnterExam}
            style={styles.button}
          >
            <strong>ENTER FOR EXAM</strong>
          </Button>
          <Button 
            variant="outline-danger" 
            onClick={fetchExams}
            style={styles.button}
          >
            <strong>EXAM NOTIFICATIONS</strong>
          </Button>
          <Button 
            variant="outline-success" 
            onClick={handleViewResults}
            style={styles.button}
          >
            <strong>VIEW RESULTS</strong>
          </Button>
        </div>
        <Modal show={showModal} onHide={handleCloseModal} size="lg" style={styles.modal}>
          <Modal.Header closeButton>
            <Modal.Title><strong>NOTIFICATIONS</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {fetchingExams && <p>Loading exams...</p>}
            {examData && (
              <div style={styles.examsContainer}>
                {examData.map((exam) => (
                  <div key={exam.id} style={styles.examItem}>
                     <p><strong>EXAM CODE:</strong> {exam.id}</p>
                    <p><strong>EXAM DATE:</strong> {exam.startDate}</p>
                    <p><strong>START TIME:</strong> {exam.startTime}</p>
                    <p><strong>END TIME:</strong> {exam.endTime}</p>
                    <p><strong>Number of Subjects:</strong> {exam.numSubjects}</p>
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              <strong>CLOSE</strong>
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showResultsModal} onHide={handleCloseModal} size="lg" style={styles.modal}>
          <Modal.Header closeButton>
            <Modal.Title><strong>RESULTS</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {fetchingResults && <p>Loading results...</p>}
            {resultsData && (
              <div style={styles.resultsContainer}>
                {resultsData.map((result) => (
                  <div key={result.id} style={styles.resultItem}>
                    <p><strong>EXAM CODE:</strong> {result.examId}</p>
                    <p><strong>RESULT:</strong> {result.result}</p>
                    {/* Add other result details as needed */}
                  </div>
                ))}
              </div>
            )}
            {!resultsData && !fetchingResults && <p>No results available yet.</p>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              <strong>CLOSE</strong>
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  card: {
    width: '30rem',
    marginTop: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
  },
  cardImg: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'row', // Change to row for horizontal layout
    gap: '1rem', // Space between buttons
  },
  button: {
    borderRadius: '25px',
    padding: '0.5rem 2rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
  examsContainer: {
    marginTop: '1rem',
    width: '100%',
    textAlign: 'left',
  },
  examItem: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  resultsContainer: {
    marginTop: '1rem',
    width: '100%',
    textAlign: 'left',
  },
  resultItem: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  modal: {
    borderRadius: '10px',
  },
  message: {
    color: '#555',
  },
  error: {
    color: '#f44336',
  },
};

export default Customerhomepage;
