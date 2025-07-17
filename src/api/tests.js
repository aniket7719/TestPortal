import axios from 'axios';

const BASE_URL = 'https://testportal-server.onrender.com/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

const safeRequest = async (axiosCall) => {
  try {
    const res = await axiosCall();
    return res.data;
  } catch (err) {
    console.error('❌ API Error:', err.response?.data || err.message);
    throw err;
  }
};

export const createTest = (testData) =>
  safeRequest(() => axios.post(`${BASE_URL}/admin/tests`, testData, getAuthHeaders()));

export const getTestById = (testId) =>
  safeRequest(() => axios.get(`${BASE_URL}/admin/tests/${testId}`, getAuthHeaders()));

export const deleteTest = (testId) =>
  safeRequest(() => axios.delete(`${BASE_URL}/admin/tests/${testId}`, getAuthHeaders()));

export const updateTest = (testId, updatedData) =>
  safeRequest(() => axios.put(`${BASE_URL}/admin/tests/${testId}`, updatedData, getAuthHeaders()));

export const fetchAllTests = () =>
  safeRequest(() => axios.get(`${BASE_URL}/student/tests`, getAuthHeaders()));

export const fetchAdminTests = () =>
  safeRequest(() => axios.get(`${BASE_URL}/admin/tests`, getAuthHeaders()));

// ✅ Add this for ViewResultPage
export const fetchUserResults = () =>
  safeRequest(() => axios.get(`${BASE_URL}/student/results`, getAuthHeaders()));
