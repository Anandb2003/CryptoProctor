import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Container, Table, Alert, Card, ListGroup, Form, Button } from 'react-bootstrap';

function Adminresultsubmission() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({}); // State to store results

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

  const handleResultChange = (id, value) => {
    setResults(prevResults => ({
      ...prevResults,
      [id]: value
    }));
  };

  const handleResultSave = async (id) => {
    try {
      const response = await fetch(`http://localhost:6900/api/exams/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ result: results[id] })
      });

      if (!response.ok) {
        throw new Error('Failed to save result');
      }

      // Optionally handle success
      alert('Result saved successfully!');
    } catch (err) {
      alert('Error saving result: ' + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <div>
      <AdminNavbar />
      <Container className="my-4">
        <h1>Exam Submissions</h1>
        {submissions.length === 0 ? (
          <Alert variant="info">No submissions found.</Alert>
        ) : (
          <div>
            {submissions.map(submission => (
              <Card className="mb-3" key={submission.id}>
                <Card.Header>
                  <strong>Submission ID:</strong> {submission.id} <br />
                  <strong>Exam ID:</strong> {submission.examId} <br />
                  <strong>User Email:</strong> {submission.userEmail}
                </Card.Header>
                <Card.Body>
                  <Card.Title>Exam Details</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Start Date:</strong> {JSON.parse(submission.examDetails).startDate}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Start Time:</strong> {JSON.parse(submission.examDetails).startTime}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>End Time:</strong> {JSON.parse(submission.examDetails).endTime}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Subjects and Questions:</strong>
                      <ul>
                        {JSON.parse(JSON.parse(submission.examDetails).subjectsAndQuestions).map((subject, subjectIndex) => (
                          <li key={subjectIndex}>
                            <strong>Subject:</strong> {subject.name}
                            <ul>
                              {subject.questions.map((question, questionIndex) => (
                                <li key={questionIndex}>{question}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Title className="mt-3">Answers</Card.Title>
                  <ListGroup variant="flush">
                    {Object.entries(JSON.parse(submission.answers)).map(([key, answer], index) => (
                      <ListGroup.Item key={index}>
                        <strong>Question {key}:</strong> {answer}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Card.Title className="mt-3">Result</Card.Title>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={results[submission.id] || ''}
                    onChange={(e) => handleResultChange(submission.id, e.target.value)}
                  />
                  <Button
                    variant="primary"
                    className="mt-2"
                    onClick={() => handleResultSave(submission.id)}
                  >
                    Save Result
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Submitted At: {new Date(submission.submittedAt).toLocaleString()}
                </Card.Footer>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Adminresultsubmission;
