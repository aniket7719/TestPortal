// src/pages/student/TakeTestPage.jsx
import React, { useEffect, useState } from "react";
import { Button, Container, Card, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TakeTestPage = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(120);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/student/tests/${testId}/questions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const formatted = res.data.map((q) => ({
          ...q,
          options: [q.optionA, q.optionB, q.optionC, q.optionD],
        }));

        setQuestions(formatted);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Unable to load test questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testId]);

  useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions]);

  const handleOptionSelect = (index) => {
    setAnswers({ ...answers, [current]: index });
  };

  const handleSubmit = async () => {
    const payload = {
      answers: questions.map((q, i) => ({
        questionId: q.id,
        selectedAnswer: answers[i],
      })),
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://testportal-server.onrender.com/api/student/tests/${testId}/submit`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/student/result/${testId}`);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to submit test.");
    }
  };

  if (loading) return <Spinner className="m-5" animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (questions.length === 0) return <Alert variant="info">No questions found.</Alert>;

  const currentQ = questions[current];

  return (
    <Container className="mt-4">
      <h5>
        Time Left: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </h5>

      <Card className="p-3 shadow-sm">
        <h4>
          Q{current + 1}: {currentQ.questionText}
        </h4>
        <Row className="mt-3">
          {currentQ.options.map((opt, i) => (
            <Col md={6} key={i}>
              <Button
                variant={answers[current] === i ? "success" : "outline-secondary"}
                onClick={() => handleOptionSelect(i)}
                className="w-100 mb-2"
              >
                {opt}
              </Button>
            </Col>
          ))}
        </Row>

        <div className="d-flex justify-content-between mt-3">
          <Button disabled={current === 0} onClick={() => setCurrent(current - 1)}>
            Previous
          </Button>
          <Button
            onClick={() => setCurrent(current + 1)}
            disabled={current === questions.length - 1}
          >
            Next
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default TakeTestPage;
