import React, { useState } from 'react';
import { Container, Form, Button, Col, Row, Card, Alert } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

function UploadQuestions() {
  const [timer, setTimer] = useState(false);
  const [numSubjects, setNumSubjects] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].numQuestions = value;
    setSubjects(updatedSubjects);
  };

  const handleQuestionChange = (subjectIndex, questionIndex, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].questions[questionIndex] = value;
    setSubjects(updatedSubjects);
  };

  const handleSubjectNameChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].name = value;
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert subjects and questions into JSON format
    const subjectsAndQuestions = JSON.stringify(subjects);

    const formData = {
      startTime,
      endTime,
      startDate,
      numSubjects,
      subjectsAndQuestions
    };

    try {
      const response = await fetch('http://localhost:6900/api/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage('Questions uploaded successfully!');
        setErrorMessage('');  // Clear any previous error message
      } else {
        const errorResult = await response.text();
        setSuccessMessage('');  // Clear any previous success message
        setErrorMessage(`Error: ${errorResult}`);
      }
    } catch (error) {
      setSuccessMessage('');  // Clear any previous success message
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <Container className="my-4">
        <Card>
          <Card.Header as="h5">Upload Questions</Card.Header>
          <Card.Body>
            {successMessage && (
              <Alert variant="success">
                {successMessage}
              </Alert>
            )}
            {errorMessage && (
              <Alert variant="danger">
                {errorMessage}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="timerCheckbox">
                <Form.Check 
                  type="checkbox" 
                  label="Enable Timer" 
                  checked={timer} 
                  onChange={(e) => setTimer(e.target.checked)} 
                />
              </Form.Group>

              {timer && (
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="startTime">
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control 
                        type="time" 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="endTime">
                      <Form.Label>End Time</Form.Label>
                      <Form.Control 
                        type="time" 
                        value={endTime} 
                        onChange={(e) => setEndTime(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="startDate">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                      />
                    </Form.Group>
                  </Col>
                </Row>
              )}

              <Form.Group controlId="numSubjects">
                <Form.Label>Number of Subjects</Form.Label>
                <Form.Control 
                  type="number" 
                  min="1" 
                  value={numSubjects} 
                  onChange={(e) => {
                    const count = parseInt(e.target.value, 10);
                    setNumSubjects(count);
                    setSubjects(Array(count).fill(null).map(() => ({
                      name: '',  // Initialize subject name
                      numQuestions: 0,
                      questions: []
                    })));
                  }} 
                />
              </Form.Group>

              {subjects.map((subject, subjectIndex) => (
                <Card className="mb-3" key={subjectIndex}>
                  <Card.Header>Subject {subjectIndex + 1}</Card.Header>
                  <Card.Body>
                    <Form.Group controlId={`subjectName${subjectIndex}`}>
                      <Form.Label>Subject Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        value={subject.name} 
                        onChange={(e) => handleSubjectNameChange(subjectIndex, e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId={`numQuestions${subjectIndex}`}>
                      <Form.Label>Number of Questions</Form.Label>
                      <Form.Control 
                        type="number" 
                        min="0" 
                        value={subject.numQuestions} 
                        onChange={(e) => handleSubjectChange(subjectIndex, parseInt(e.target.value, 10))}
                      />
                    </Form.Group>
                    {Array.from({ length: subject.numQuestions }).map((_, questionIndex) => (
                      <Form.Group controlId={`question${subjectIndex}-${questionIndex}`} key={questionIndex}>
                        <Form.Label>Question {questionIndex + 1}</Form.Label>
                        <Form.Control 
                          type="text" 
                          value={subject.questions[questionIndex] || ''} 
                          onChange={(e) => handleQuestionChange(subjectIndex, questionIndex, e.target.value)}
                        />
                      </Form.Group>
                    ))}
                  </Card.Body>
                </Card>
              ))}

              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UploadQuestions;
