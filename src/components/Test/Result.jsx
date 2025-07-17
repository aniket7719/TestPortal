import React, { useEffect, useState } from 'react';

import { getStudentResults, getDetailedResult } from '../../api/result';
const Result = ({ resultId }) => {
  const [review, setReview] = useState(null);

  useEffect(() => {
    async function fetchReview() {
      const res = await getDetailedResult(resultId);
      setReview(res.data);
    }
    fetchReview();
  }, [resultId]);

  if (!review) return <p>Loading review...</p>;

  return (
    <div>
      <h2>Review</h2>
      {review.questions.map((q, i) => (
        <div key={i} style={{ marginBottom: '1rem' }}>
          <strong>Q{i + 1}: {q.questionText}</strong>
          <div>Your answer: {q.givenAnswer}</div>
          <div>Correct answer: {q.correctAnswer}</div>
          <div style={{ color: q.isCorrect ? 'green' : 'red' }}>
            {q.isCorrect ? 'Correct' : 'Wrong'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Result;
