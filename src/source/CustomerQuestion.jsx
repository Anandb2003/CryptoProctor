import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import CustomerNavbar from './CustomerNavbar';
import { useLocation } from 'react-router-dom';

function CustomerQuestion() {
  const location = useLocation();
  const { userEmail } = location.state || {}; // Retrieve userEmail from location state

  const [examDetails, setExamDetails] = useState(null);
  const [answers, setAnswers] = useState({});
  const [examId, setExamId] = useState(null); // Added state for examId
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noExam, setNoExam] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const fetchLatestExam = async () => {
      try {
        const response = await fetch('http://localhost:6900/api/exams/latest');
        if (!response.ok) {
          console.error('Failed to fetch exam details');
          setNoExam(true);
          return;
        }
        const data = await response.json();
        if (data && data.startDate && data.startTime && data.endTime && data.id) {
          setExamDetails(data);
          setExamId(data.id); // Store the examId

          const startTime = new Date(`${data.startDate}T${data.startTime}`);
          const endTime = new Date(`${data.startDate}T${data.endTime}`);

          if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
          }

          const currentTime = new Date();
          if (currentTime >= startTime && currentTime <= endTime) {
            const timeDiff = endTime - currentTime;
            setTimeRemaining(timeDiff);
            const timer = setInterval(() => {
              setTimeRemaining(prevTime => {
                if (prevTime <= 1000) {
                  clearInterval(timer);
                  setTimeExpired(true);
                  return 0;
                }
                return prevTime - 1000;
              });
            }, 1000);
          } else if (currentTime > endTime) {
            setTimeExpired(true);
          }
        } else {
          setNoExam(true);
        }
      } catch (error) {
        console.error('Error fetching exam details:', error);
        setNoExam(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestExam();
  }, []);

  const handleAnswerChange = (index, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [index]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timeExpired) {
      setSubmissionStatus('You are submitting after the time has expired.');
      console.log('Submission attempted after time expired:', {
        userEmail, // Log the user email
        answers,
        examDetails
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:6900/api/exams/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail,
          examId, // Include examId in the submission
          answers: JSON.stringify(answers), // Ensure answers is a JSON string
          examDetails: JSON.stringify(examDetails) // Ensure examDetails is a JSON string
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmissionStatus('Successfully submitted.');
      console.log('Submission successful:', {
        userEmail,
        answers,
        examDetails
      });
    } catch (error) {
      console.error('Error submitting answers:', error);
      setSubmissionStatus('One time only you can submit the answers');
    }
  };

  if (loading) return <p>Loading...</p>;

  const isExamNotStarted = examDetails && new Date(`${examDetails.startDate}T${examDetails.startTime}`) > new Date();
  const isExamOngoing = examDetails && !timeExpired && new Date(`${examDetails.startDate}T${examDetails.startTime}`) <= new Date();

  return (
    <div>
      <CustomerNavbar userEmail={userEmail} />
      <Container className="my-4">
        <h1>Exam Questions</h1>
        {submissionStatus && (
          <Alert variant={submissionStatus.includes('error') ? 'danger' : 'success'}>
            {submissionStatus}
          </Alert>
        )}
        {noExam ? (
          <Alert variant="info">There are no exams scheduled at the moment.</Alert>
        ) : (
          <>
            {examDetails && examDetails.startDate && examDetails.startTime && examDetails.endTime && (
              <div>
                <h2>Exam Start Time: {formatDateTime(new Date(`${examDetails.startDate}T${examDetails.startTime}`))}</h2>
                {isExamNotStarted ? (
                  <div>
                    <h2>Exam not started yet. Time remaining until the exam starts:</h2>
                    <h3>{formatTime(timeRemaining)}</h3>
                  </div>
                ) : (
                  <>
                    {isExamOngoing && <h2>Time Remaining: {formatTime(timeRemaining)}</h2>}
                    {timeExpired && <Alert variant="danger">Time's up! You can no longer submit answers.</Alert>}
                    {!timeExpired && (
                      <Form onSubmit={handleSubmit}>
                        {examDetails.subjectsAndQuestions && JSON.parse(examDetails.subjectsAndQuestions).map((subject, subjectIndex) => (
                          <Card key={subjectIndex} className="mb-3">
                            <Card.Header>Subject {subjectIndex + 1}: {subject.name}</Card.Header>
                            <Card.Body>
                              {subject.questions.map((question, questionIndex) => (
                                <Form.Group key={questionIndex}>
                                  <Form.Label>Question {questionIndex + 1}</Form.Label>
                                  <Form.Text className="text-muted">{question}</Form.Text>
                                  <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={answers[`${subjectIndex}-${questionIndex}`] || ''}
                                    onChange={(e) => handleAnswerChange(`${subjectIndex}-${questionIndex}`, e.target.value)}
                                    disabled={timeExpired}
                                  />
                                </Form.Group>
                              ))}
                            </Card.Body>
                          </Card>
                        ))}
                        <Button variant="primary" type="submit" disabled={timeExpired}>
                          <strong>SUBMIT ANSWER</strong>
                        </Button>
                      </Form>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
};

const formatDateTime = (date) => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default CustomerQuestion;
