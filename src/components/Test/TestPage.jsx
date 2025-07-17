import React, { useEffect, useState } from 'react';
import { getTestQuestions, submitTestAnswers } from '../api/questions';

const TestPage = ({ testId, userId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      const res = await getTestQuestions(testId);
      setQuestions(res.data);
    }
    fetchQuestions();
  }, [testId]);

  const handleOptionChange = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const handleNext = () => setCurrentIndex(currentIndex + 1);

  const handleSubmit = async () => {
    const res = await submitTestAnswers({
      userId,
      testId,
      answers,
    });
    alert('Test submitted!');
  };

  if (!questions.length) return <p>Loading...</p>;

  const q = questions[currentIndex];

  return (
    <div>
      <h3>Q{currentIndex + 1}: {q.questionText}</h3>
      {q.options.map((opt, idx) => (
        <div key={idx}>
          <label>
            <input
              type="radio"
              name={q.id}
              value={opt}
              checked={answers[q.id] === opt}
              onChange={() => handleOptionChange(q.id, opt)}
            />
            {opt}
          </label>
        </div>
      ))}

      {currentIndex < questions.length - 1 ? (
        <button onClick={handleNext}>Next</button>
      ) : (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default TestPage;
