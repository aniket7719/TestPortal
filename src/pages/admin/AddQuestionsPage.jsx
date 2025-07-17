// src/pages/admin/AddQuestionsPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const AddQuestionsPage = () => {
  const { testId } = useParams();
  const [questionData, setQuestionData] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prev) => ({
      ...prev,
      [name]: name === "correctAnswer" ? parseInt(value) : value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updated = [...questionData.options];
    updated[index] = value;
    setQuestionData((prev) => ({ ...prev, options: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:8080/api/admin/tests/${testId}/questions`,
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Question added successfully.");
      setError("");
      setQuestionData({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add question.");
      setSuccess("");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h3>Add Question to Test #{testId}</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              name="questionText"
              value={questionData.questionText}
              onChange={handleChange}
              placeholder="Enter the question"
              required
            />
          </Form.Group>

          <Row>
            {questionData.options.map((opt, index) => (
              <Col md={6} key={index}>
                <Form.Group className="mb-3">
                  <Form.Label>Option {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Select
              name="correctAnswer"
              value={questionData.correctAnswer}
              onChange={handleChange}
              required
            >
              {questionData.options.map((_, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary">
            Add Question
          </Button>
        </Form>

        {success && <Alert className="mt-3" variant="success">{success}</Alert>}
        {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
      </Card>
    </Container>
  );
};

export default AddQuestionsPage;
