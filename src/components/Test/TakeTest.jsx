import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function TakeTest() {
  const { id } = useParams(); // testId
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds

  useEffect(() => {
    fetchTestQuestions();
  }, []);

  const fetchTestQuestions = async () => {
    try {
      const response = await api.get(`/tests/${id}/questions`);
      setQuestions(response.data.questions);
      setTimeLeft(response.data.duration * 60); // minutes to seconds
    } catch (error) {
      console.error("Error fetching test questions:", error);
    }
  };

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionSelect = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/tests/${id}/submit`, {
        answers,
      });
      navigate("/result", { state: { score: response.data.score } });
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  if (questions.length === 0) return <p className="mt-5 text-center">Loading test...</p>;

  const q = questions[current];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Question {current + 1} of {questions.length}</h4>
        <span className="badge bg-warning text-dark fs-5">
          ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </span>
      </div>

      <div className="card p-4 shadow-sm">
        <h5>{q.question}</h5>
        {q.options.map((option, index) => (
          <div className="form-check mt-2" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name={`q${q.id}`}
              id={`q${q.id}_opt${index}`}
              checked={answers[q.id] === option}
              onChange={() => handleOptionSelect(q.id, option)}
            />
            <label className="form-check-label" htmlFor={`q${q.id}_opt${index}`}>
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-secondary" disabled={current === 0} onClick={handlePrev}>
          Previous
        </button>
        {current === questions.length - 1 ? (
          <button className="btn btn-success" onClick={handleSubmit}>
            Submit Test
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
