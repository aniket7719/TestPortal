import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  return response.data;
};
export const register = async (formData) => {
  const response = await axios.post(`${API_URL}/register`, formData);
  return response.data;
};
