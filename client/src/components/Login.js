import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file for styling

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT token
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign-In</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error if exists */}
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={user.username}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-btn">
            Log in
          </button>
        </form>
        
        <button className="create-btn" onClick={() => navigate("/register")}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;

