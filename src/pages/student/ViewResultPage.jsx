// src/pages/student/ViewResultPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";
import { fetchUserResults } from "../../api/tests";

const ViewResultPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      fetchUserResults(userEmail)
        .then((res) => {
          setResults(res.data || []);
        })
        .catch((err) => console.error("Error fetching results:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (!results || results.length === 0) return <p>No results found.</p>;

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Test Results</h3>
      {results.map((result, i) => (
        <Card key={i} className="mb-4 p-3 shadow-sm">
          <h5>Test ID: {result.testId}</h5>
          <p><strong>Score:</strong> {result.score}</p>
          <div className="mt-3">
            <h6>Detailed Answers:</h6>
            {result.answers.map((ans, index) => (
              <Card key={index} className="mb-2 p-2 border">
                <p><strong>Q{index + 1}:</strong> {ans.question}</p>
                <p>
                  <strong>Your Answer:</strong>{" "}
                  <span className={ans.isCorrect ? "text-success" : "text-danger"}>
                    {ans.selectedAnswer}
                  </span>
                </p>
                <p>
                  <strong>Correct Answer:</strong>{" "}
                  <span className="text-success">{ans.correctAnswer}</span>
                </p>
              </Card>
            ))}
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default ViewResultPage;
