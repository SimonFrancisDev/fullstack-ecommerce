// File: server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const authRoutes = require("./routes/authRoutes");
const prodRoutes = require("./routes/productRoutes.js"); // New product routes import

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for cross-origin requests

// Connect to MongoDB
connectToDb();

// --- ROUTE INTEGRATION ---
app.use("/api/auth", authRoutes); 
app.use("/api/products", prodRoutes); // Integrated product routes

// Basic test route
app.get("/", (req, res) => {
    res.send("✅ The server is up and running!");
});
// --- END ROUTE INTEGRATION ---

// Define the server port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});