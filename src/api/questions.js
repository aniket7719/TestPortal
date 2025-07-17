import API from './axios';

// ✅ Get all questions for a specific test ID (Student)
export const getTestQuestions = async (testId) => {
  return await API.get(`/student/questions/${testId}`);
};

// ✅ Submit test answers
export const submitTestAnswers = async (data) => {
  return await API.post('/student/questions/submit', data);
};
