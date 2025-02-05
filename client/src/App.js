// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css"; // Import CSS for styling

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h2>Welcome User</h2>
      <div className="button-container">
        <button className="home-btn" onClick={() => navigate("/register")}>
          New User
        </button>
        <button className="home-btn" onClick={() => navigate("/login")}>
          Existing User
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
