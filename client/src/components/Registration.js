import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css"; // Import CSS file for styling

const Registration = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect after success
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />

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

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>
        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="login-link">
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
