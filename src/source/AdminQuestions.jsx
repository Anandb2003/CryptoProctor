import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from './AdminNavbar';

function AdminQuestions() {
  const [examDetails, setExamDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/exams');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setExamDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:6900/api/exams/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the deleted exam from state
      setExamDetails(examDetails.filter(exam => exam.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <AdminNavbar />
      <Container className="my-4">
        <h1><strong>ALL EXAMS AND QUESTION DETAILS</strong></h1>
        {examDetails.length === 0 ? (
          <p>No exam details found.</p>
        ) : (
          examDetails.map(exam => (
            <Card key={exam.id} className="mb-3">
              <Card.Header as="h5">
                Exam ID: {exam.id}
                <Button
                  variant="link"
                  onClick={() => handleDelete(exam.id)}
                  style={{ float: 'right' }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Title>Exam Details</Card.Title>
                <Card.Text>
                  <strong>Start Date:</strong> {exam.startDate}<br />
                  <strong>Start Time:</strong> {exam.startTime}<br />
                  <strong>End Time:</strong> {exam.endTime}<br />
                  <strong>Number of Subjects:</strong> {exam.numSubjects}
                </Card.Text>
                {exam.subjectsAndQuestions && (
                  <ListGroup variant="flush">
                    {JSON.parse(exam.subjectsAndQuestions).map((subject, index) => (
                      <ListGroup.Item key={index}>
                        <h5>Subject {index + 1}: {subject.name}</h5>
                        <p><strong>Number of Questions:</strong> {subject.numQuestions}</p>
                        <ul>
                          {subject.questions.map((question, qIndex) => (
                            <li key={qIndex}>Question {qIndex + 1}: {question}</li>
                          ))}
                        </ul>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </div>
  );
}

export default AdminQuestions;
