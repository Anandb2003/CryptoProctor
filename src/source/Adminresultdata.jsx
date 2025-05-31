import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Container, Alert, Card } from 'react-bootstrap';

function Adminresultdata() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/exams/all');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data);

        // Log the fetched submissions to the console
        console.log('Fetched Submissions:', data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <div>
      <AdminNavbar />
      <Container className="my-4">
        <h1><strong>EXAM RESULTS</strong></h1>
        {submissions.length === 0 ? (
          <Alert variant="info">No submissions found.</Alert>
        ) : (
          <div>
            {submissions.map(submission => {
              // Log each submission detail to the console
              console.log('Submission Details:', submission);

              // Result is a plain string, so no need to parse it
              const result = submission.result || 'No result available';
              
              return (
                <Card className="mb-3" key={submission.id}>
                  <Card.Header>
                    <strong>Submission ID:</strong> {submission.id} <br />
                    <strong>User Email:</strong> {submission.userEmail}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Exam Details</Card.Title>
                    <Card.Text>
                      <strong>Start Date:</strong> {JSON.parse(submission.examDetails).startDate} <br />
                      <strong>Start Time:</strong> {JSON.parse(submission.examDetails).startTime} <br />
                      <strong>End Time:</strong> {JSON.parse(submission.examDetails).endTime} <br />
                      <strong>Result:</strong> {result}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Submitted At: {new Date(submission.submittedAt).toLocaleString()}
                  </Card.Footer>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Adminresultdata;
