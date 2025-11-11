const jwt = require('jsonwebtoken')
const User = require('../models/User.js');

// STEP ONE: Generate token
const generateToken = (user) => {
    return jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRETE_KEY,
        {expiresIn: process.env.SCRETE_KEY_EXPIRY}
    );
};

// STEP TWO: Implement register functionality
const register = async function(req, res, next) {
    try {
        // Assign a default role if not provided (best practice is schema default)
        const {firstname, lastname, email, password} = req.body;
        const role = req.body.role || 'user'; // Default to 'user'

        if(!firstname || !lastname || !email || !password) {
            return res.status(400).json({message: "Attention: All input fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: "Attention: A User with the submitted email already exist"});
        }

        const newUser = new User({
            firstname,
            lastname, 
            email, 
            password,
            role // Now defined with a default if missing
        })

        // NOTE: Ensure your User Model has pre('save') middleware for password HASHING!
        await newUser.save();

        const token = generateToken(newUser);
        
        // FIX: Response structure corrected to include token in the body
        res.status(201).json({
            message: "Registration successful!",
            token: token, 
            user: {
                id: newUser._id, 
                firstname: newUser.firstname, 
                lastname: newUser.lastname, 
                email: newUser.email, 
                role: newUser.role
            }
        });
    } catch(err) {
        // Use next(err) for better error handling flow in Express
        next(err); 
    }
};

// login controller
const login = async function(req, res, next) {
    try {
        const {email, password} = req.body

        if(!email || !password)  {
            return res.status(400).json({message: "Attention: Email or password is required"})
        }

        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({message: "Attention: Invalid email"})

        // Assuming user.matchPassword() is a method on your Mongoose User model
        const isMatch = await user.matchPassword(password)
        if(!isMatch) return res.status(400).json({message: "Attention: Invalid password"})

        const token = generateToken(user);
        res.json({
            message: "Attention: Login Successful, You will be redirected in home page in 5 seconds",
            token: token, // Changed 'data' to 'token' for clarity
        })
    } catch(err) {
        // Use next(err) for consistent error handling
        next(err)
    }
}


const getProfile = async function(req, res, next) {
    try {
        // req.user.id is set by the authentication middleware (which is missing/needed)
        const user = await User.findById(req.user.id).select("-password");
        if(!user) return res.status(404).json({message: `Attention: User Not Found`})

        res.json(user)
    }
    catch(err) {
        next(err)
    }
};

// CRITICAL FIX: Export all functions via an object
module.exports = {
    register,
    login,
    getProfile,
    // generateToken is local, no need to export unless used elsewhere
};