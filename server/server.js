const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Change this to a secure key

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_app",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// User Registration
app.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, username, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error in registration:", err);
      res.status(500).send("Error registering user");
    } else {
      res.status(200).send("User registered successfully");
    }
  });
});

// User Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).send("Login failed");
    }

    if (results.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = results[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  });
});

// Submit Remark
app.post("/remark", (req, res) => {
  const { remark } = req.body;

  const sql = "INSERT INTO remarks (text) VALUES (?)";
  db.query(sql, [remark], (err, result) => {
    if (err) {
      console.error("Error saving remark:", err);
      res.status(500).send("Failed to save remark");
    } else {
      res.status(200).send("Remark submitted");
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
