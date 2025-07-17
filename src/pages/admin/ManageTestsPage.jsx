// src/pages/admin/ManageTestsPage.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageTestsPage = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchTests = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No token found. Please log in again.");
    return;
  }

  try {
    const res = await axios.get("http://localhost:8080/api/admin/tests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // ✅ Make sure response is an array
    if (Array.isArray(res.data)) {
      setTests(res.data);
    } else {
      console.error("Invalid response format. Expected array, got:", res.data);
      setTests([]); // fallback to empty array
    }

  } catch (err) {
    console.error("Error fetching tests:", err);
    alert("Failed to fetch tests.");
    setTests([]); // fallback to empty array on error
  }
};

  useEffect(() => {
    fetchTests();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this test?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/tests/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTests((prev) => prev.filter((t) => t.id !== id));
      setSuccess("Test deleted successfully.");
      setError("");
    } catch (err) {
      setError("Failed to delete test.");
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h3>Manage All Tests</h3>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : tests.length === 0 ? (
          <Alert variant="info">No tests available.</Alert>
        ) : (
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Test Title</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={test.id}>
                  <td>{index + 1}</td>
                  <td>{test.title}</td>
                  <td>{test.description}</td>
                  <td>{test.durationMinutes} min</td>
                  <td>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        navigate(`/admin/tests/${test.id}/add-questions`)
                      }
                    >
                      Questions
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(test.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default ManageTestsPage;
