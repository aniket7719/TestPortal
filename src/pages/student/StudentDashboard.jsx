import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchAllTests } from "../../api/tests";

const StudentDashboard = () => {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentTests = async () => {
      try {
        const res = await fetchAllTests();
        console.log("Fetched Tests:", res);

        let testArray = [];

        if (Array.isArray(res)) {
          testArray = res;
        } else if (res && Array.isArray(res.data)) {
          testArray = res.data;
        } else if (res && Array.isArray(res.tests)) {
          testArray = res.tests;
        } else {
          throw new Error("Expected array of tests but got: " + typeof res);
        }

        setTests(testArray);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load tests");
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentTests();
  }, []);

  const startTest = (testId) => {
    navigate(`/student/start-test/${testId}`);
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h3>Welcome to the Student Dashboard</h3>
        <p>Select a test to begin:</p>

        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <Spinner animation="border" />
        ) : tests.length === 0 ? (
          <Alert variant="info">No tests available for you at this time.</Alert>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Test Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={test.id || index}>
                  <td>{index + 1}</td>
                  <td>{test.description}</td>
                  <td>{test.durationMinutes} min</td>
                  <td>{test.title}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => startTest(test.id)}
                    >
                      Start Test
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

export default StudentDashboard;
