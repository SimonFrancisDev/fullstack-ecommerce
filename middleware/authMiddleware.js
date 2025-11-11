const jwt = require("jsonwebtoken");
const User = require("../models/User"); // require User model

// Protect middleware: normal users
const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Attention: Not authorized, token invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure your env var name is correct

    // attach user info to request
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Attention: Not authorized, token invalid" });
  }
};

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Attention: Not Authorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Attention: Admin Access required" });
  }

  next();
};

module.exports = { protect, adminOnly };
