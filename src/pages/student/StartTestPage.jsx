// src/pages/student/StartTestPage.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const StartTestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/student/take-test/${testId}`);
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm text-center">
        <h2>Ready to Start the Test?</h2>
        <p>Click the button below to begin.</p>
        <Button onClick={handleStart} variant="primary">
          Start Test
        </Button>
      </Card>
    </Container>
  );
};

export default StartTestPage;
