// src/pages/admin/CreateTestPage.jsx
import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createTest } from "../../api/tests"; // ✅ import API helper

const CreateTestPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    durationMinutes: 30,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "durationMinutes" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    try {
      const response = await createTest(formData);
      setSuccess("Test created successfully!");
      setError("");

      // Navigate after short delay
      setTimeout(() => {
        navigate(`/admin/tests/${response.data.id}/add-questions`);
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to create test. Please try again."
      );
      setSuccess("");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h3>Create New Test</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Test Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter test title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Test Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration (in minutes)</Form.Label>
            <Form.Control
              type="number"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleChange}
              min={1}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Create Test
          </Button>
        </Form>

        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card>
    </Container>
  );
};

export default CreateTestPage;
