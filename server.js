const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB
connectToDb();

// Basic test route
app.get("/", (req, res) => {
  res.send("✅ The server is up and running!");
});

// Define the server port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
