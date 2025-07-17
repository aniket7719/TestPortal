import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://testportal-server.onrender.com/api/auth/register",
        form
      );
      alert("Registration successful!");
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      const msg =
        err.response?.data ||
        "Registration failed! Make sure the email is unique.";
      alert(msg);
    }
  };

  const styles = {
    container: {
      background: "linear-gradient(to right, #fce4ec, #e0f7fa)",
      minHeight: "90vh",
      overflow: "hidden", // ✅ Prevent scrollbar
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
    },
    card: {
      maxWidth: "950px",
      width: "100%",
      borderRadius: "1.2rem",
      overflow: "hidden",
      backgroundColor: "#fff",
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
    },
    leftImage: {
      objectFit: "cover",
      height: "100%",
      width: "100%",
    },
    rightForm: {
      padding: "3rem",
    },
    inputIcon: {
      backgroundColor: "#fff",
      borderRight: "0",
    },
    inputField: {
      borderLeft: "0",
      boxShadow: "none",
    },
    socialBtn: {
      width: "42px",
      height: "42px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transition: "all 0.3s ease",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div className="row w-100" style={styles.card}>
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="/register.png"
            alt="Register"
            style={styles.leftImage}
          />
        </div>

        {/* Right Form */}
        <div className="col-md-6" style={styles.rightForm}>
          <h3 className="fw-bold mb-4 text-center text-success">Create Account</h3>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" style={styles.inputIcon}><FaUser /></span>
                <input
                  type="text"
                  className="form-control"
                  style={styles.inputField}
                  placeholder="Full Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" style={styles.inputIcon}><FaEnvelope /></span>
                <input
                  type="email"
                  className="form-control"
                  style={styles.inputField}
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text" style={styles.inputIcon}><FaLock /></span>
                <input
                  type="password"
                  className="form-control"
                  style={styles.inputField}
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            {/* Role */}
            <div className="mb-3">
              <select
                className="form-select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-success w-100 py-2 shadow-sm">Register</button>
          </form>

          {/* Link to Login */}
          <div className="text-center mt-3">
            <a href="/login" style={styles.link}>Already have an account?</a>
          </div>

          {/* Social Icons */}
          <div className="text-center mt-4">
            <div className="d-flex justify-content-center gap-3">
              <button type="button" className="btn btn-outline-primary shadow-sm" style={styles.socialBtn}>
                <FaFacebook />
              </button>
              <button type="button" className="btn btn-outline-info shadow-sm" style={styles.socialBtn}>
                <FaTwitter />
              </button>
              <button type="button" className="btn btn-outline-danger shadow-sm" style={styles.socialBtn}>
                <FaGoogle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
