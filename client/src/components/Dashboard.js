// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Import CSS file

const Dashboard = () => {
  const [username, setUsername] = useState("Guest");
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found. Redirecting to home.");
        navigate("/");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.log("User not authenticated. Redirecting to home.");
          navigate("/");
          return;
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/remark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ remark }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to submit remark");
      }

      alert("Remark submitted successfully!");
      setRemark("");
    } catch (error) {
      console.error("Error submitting remark:", error);
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {username}!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          required
        />
        <button type="submit" disabled={!remark.trim()}>
          Submit
        </button>
      </form>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
