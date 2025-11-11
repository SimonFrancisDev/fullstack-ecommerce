const express = require('express');
const { register, login, getProfile } = require('../controllers/authCtrl.js');
// You will need to import and use your authentication middleware here, e.g.,
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.post("/register", register);
router.post("/login", login)

// Add authentication middleware (e.g., protect) before getProfile
// router.get("/profile", protect, getProfile); 
router.get("/profile", getProfile); // Keeping it as is for now, but requires middleware

module.exports = router;