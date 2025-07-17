import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h3 style={styles.logo}>Test Portal</h3>
      <div style={styles.links}>
        {role === "ADMIN" && <Link style={styles.link} to="/admin">Admin Dashboard</Link>}
        {role === "STUDENT" && <Link style={styles.link} to="/student">Student Dashboard</Link>}
        {role === "STUDENT" && <Link style={styles.link} to="/test">Take Test</Link>}
        {isLoggedIn ? (
          <button style={styles.button} onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    background: '#282c34',
    color: 'white'
  },
  logo: {
    margin: 0
  },
  links: {
    display: 'flex',
    gap: '15px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  button: {
    background: 'transparent',
    color: 'white',
    border: '1px solid white',
    padding: '5px 10px',
    cursor: 'pointer'
  }
};

export default Navbar;
