import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Container, Alert, Table, Button, Spinner } from 'react-bootstrap';

function Securedata() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingVerification, setLoadingVerification] = useState(null); // Track which submission is being verified
  const [verificationResult, setVerificationResult] = useState({}); // Store results for each submission
  const [statusMessage, setStatusMessage] = useState(''); // State for status message

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/exams/all');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleVerifyData = async (id) => {
    setLoadingVerification(id); // Set loading state for specific submission
    setStatusMessage('Loading...'); // Set status message
    setVerificationResult((prev) => ({ ...prev, [id]: null })); // Clear previous results for this submission
    
    try {
      setStatusMessage('Verifying...'); // Update status message
      const response = await fetch(`http://localhost:6900/api/exams/verify/${id}`);
      if (!response.ok) {
        throw new Error('Failed to verify data');
      }
      const message = await response.text();
      setVerificationResult((prev) => ({ ...prev, [id]: message }));
    } catch (err) {
      setVerificationResult((prev) => ({ ...prev, [id]: `Error: ${err.message}` }));
    } finally {
      setTimeout(() => {
        setStatusMessage('Verified'); // Update status message to Verified
        setLoadingVerification(null); // Reset loading state after 10 seconds
      }, 10000);
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  if (error) return <Alert variant="danger" className="text-center alert">Error: {error}</Alert>;

  return (
    <div>
      <AdminNavbar />
      <Container className="my-4">
        <h1 className="title"><strong>BLOCKCHAIN BLOCKS</strong></h1>
        {submissions.length === 0 ? (
          <Alert variant="info" className="text-center alert">No submissions found.</Alert>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>BLOCK HASH</th>
                  <th>BLOCKHASH</th>
                  <th>BLOCK HASH</th>
                  <th>BLOCK HASH</th>
                  <th>BLOCK HASH</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(submission => (
                  <tr key={submission.id}>
                    <td>{submission.id}</td>
                    <td>{submission.userEmailHash}</td>
                    <td>{submission.answersHash}</td>
                    <td>{submission.examDetailsHash}</td>
                    <td>{submission.resultHash}</td>
                    <td>{submission.combinedHash}</td>
                    <td>
                      {loadingVerification === submission.id ? (
                        <Spinner animation="border" variant="primary" />
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleVerifyData(submission.id)}
                          className="mb-2 verify-button"
                        >
                          <strong>VERIFY DATA INTEGRITY</strong>
                        </Button>
                      )}
                      {verificationResult[submission.id] && (
                        <div className="result-text">
                          {verificationResult[submission.id]}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {statusMessage && (
          <div className="status-message">
            {statusMessage}
          </div>
        )}
      </Container>
      <style jsx>{`
        .title {
          margin-bottom: 1.5rem;
          text-align: center;
          color: #343a40;
        }

        .alert {
          text-align: center;
        }

        .custom-table {
          background-color: #f8f9fa; /* Light grey background */
          border-radius: 0.25rem; /* Rounded corners */
        }

        .custom-table th, .custom-table td {
          text-align: center;
          vertical-align: middle;
        }

        .custom-table th {
          background-color: #73706a; /* Bootstrap primary color */
          color: white;
        }

        .table-responsive {
          overflow-x: auto; /* Ensure horizontal scroll for responsiveness */
        }

        .verify-button {
          margin-bottom: 0.5rem;
        }

        .result-text {
          color: #28a745; /* Green color for success messages */
          font-weight: bold;
          margin-top: 0.5rem;
        }

        .loading-text {
          text-align: center;
          margin: 2rem;
        }

        .status-message {
          text-align: center;
          font-size: 1.25rem;
          font-weight: bold;
          color: #007bff;
          margin-top: 1rem;
          animation: fadeInOut 5s ease-in-out;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default Securedata;
