const express = require("express");
require("dotenv").config();
const app = express();
const pool = require("../config/db");
const PORT = process.env.DB_PORT || 3000;
const exampleRoutes = require("./routes/example");

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Backend!");
});

// Sample api
app.use("/api", exampleRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
