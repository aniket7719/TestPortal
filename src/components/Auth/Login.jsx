import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaFacebook,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      alert("Login successful");

      const { token, role } = res.data;
      const cleanRole = role.startsWith("ROLE_") ? role.replace("ROLE_", "") : role;
      localStorage.setItem("token", token);
      localStorage.setItem("role", cleanRole);

      // ✅ FIXED: use cleanRole to navigate
      if (cleanRole === "STUDENT") {
        navigate("/student");
      } else if (cleanRole === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ background: "linear-gradient(to right, #e0f7fa, #fce4ec)", minHeight: "90vh", padding: "2rem" }}>
      <div className="row shadow-lg" style={{ maxWidth: "950px", width: "100%", borderRadius: "1.2rem", overflow: "hidden", backgroundColor: "#fff" }}>
        <div className="col-md-6 d-none d-md-block p-0">
          <img src="/Login.png" alt="Login" style={{ objectFit: "cover", height: "100%", width: "100%" }} />
        </div>
        <div className="col-12 col-md-6" style={{ padding: "3rem" }}>
          <h3 className="fw-bold mb-4 text-center text-primary">Welcome Back</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text"><FaEnvelope /></span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text"><FaLock /></span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 shadow-sm">Log In</button>
          </form>
          <div className="text-center mt-3">
            <a href="/register" style={{ color: "#007bff", textDecoration: "none" }}>Create an account</a>
          </div>
          <div className="text-center mt-4">
            <div className="d-flex justify-content-center gap-3">
              <button type="button" className="btn btn-outline-primary shadow-sm"><FaFacebook /></button>
              <button type="button" className="btn btn-outline-info shadow-sm"><FaTwitter /></button>
              <button type="button" className="btn btn-outline-danger shadow-sm"><FaGoogle /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
