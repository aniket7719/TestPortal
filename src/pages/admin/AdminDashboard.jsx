import React, { useEffect, useState } from "react";
import {
  fetchAdminTests,
  createTest,
} from "../../api/tests";
import axios from "axios";

const AdminDashboard = () => {
  const [tests, setTests] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const res = await fetchAdminTests();
      console.log("Fetched Tests:", res);
      if (!Array.isArray(res)) {
        throw new Error("Expected array of tests but got something else");
      }
      setTests(res);
    } catch (err) {
      console.error("Failed to load tests:", err);
      setTests([]);
    }
  };


  const handleCreateTest = async () => {
    if (!title.trim() || !description.trim()) {
      alert("All fields are required");
      return;
    }

    try {
      await createTest({
        title,
        description,
        durationMinutes: parseInt(durationMinutes),
      });
      setTitle("");
      setDescription("");
      setDurationMinutes(30);
      await loadTests();
      alert("✅ Test created successfully!");
    } catch (err) {
      console.error("Test creation error:", err.response?.data || err.message);
      alert("❌ Failed to create test.");
    }
  };

  const handleAddQuestion = async () => {
    if (
      !selectedTestId ||
      !questionText.trim() ||
      options.some((o) => !o) ||
      correctOption === ""
    ) {
      alert("Fill all question details");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://testportal-server.onrender.com/api/admin/tests-questions/${selectedTestId}/questions`,
        {
          questionText,
          options,
          correctAnswer: parseInt(correctOption),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectOption("");
      alert("✅ Question added!");
    } catch (err) {
      console.error("Add Question Error:", err.response?.data || err.message);
      alert("❌ Failed to add question.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Create Test Section */}
      <div className="mt-4 p-4 border rounded">
        <h4>Create New Test</h4>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Test Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Duration (minutes)"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          min={1}
        />
        <button className="btn btn-primary" onClick={handleCreateTest}>
          Create Test
        </button>
      </div>

      {/* List of Tests */}
      <div className="mt-4 p-4 border rounded">
        <h4>Available Tests</h4>
        <ul className="list-group">
          {tests.map((test) => (
            <li
              key={test.id}
              className={`list-group-item ${selectedTestId === test.id ? "active text-white" : ""
                }`}
              onClick={() => setSelectedTestId(test.id)}
              style={{ cursor: "pointer" }}
            >
              {test.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Add Question Section */}
      {selectedTestId && (
        <div className="mt-4 p-4 border rounded">
          <h4>Add Question to Test #{selectedTestId}</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Question Text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          {options.map((opt, i) => (
            <input
              key={i}
              className="form-control mb-2"
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[i] = e.target.value;
                setOptions(newOpts);
              }}
            />
          ))}
          <select
            className="form-control mb-2"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            <option value="">-- Select Correct Option --</option>
            {options.map((_, i) => (
              <option key={i} value={i}>
                Option {i + 1}
              </option>
            ))}
          </select>
          <button className="btn btn-success" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
