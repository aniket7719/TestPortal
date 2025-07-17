import API from './axios';

// Get result summary for a specific student
export const getStudentResults = (userId) => API.get(`/results/student/${userId}`);

// Get full detailed review of one test attempt
export const getDetailedResult = (resultId) => API.get(`/results/detail/${resultId}`);