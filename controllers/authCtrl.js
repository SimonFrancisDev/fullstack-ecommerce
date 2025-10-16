const jwt = require('jsonwebtoken')
const User = require('../models/User.js');

// STEP ONE: Generate token
const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, role:user.role},
        process.env.JWT_SECRETE_KEY,
        {expiresIn: process.env.SCRETE_KEY_EXPIRY}
    );
};

// STEP TWO: Implement register functionality
module.exports = async function register(req, res, next) {
    try {
        const {firstname, lastname, email, password} = req.body;
    }
    catch() {}

}