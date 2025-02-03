// src/components/Dashboard.js
import React, { useState } from "react";

const Dashboard = () => {
  const [remark, setRemark] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/remark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ remark }),
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dashboard;
