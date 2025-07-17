import axios from "axios";

const api = axios.create({
  baseURL: "https://testportal-server.onrender.com/api", // ✅ Your backend base path
});

// ✅ Automatically attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
