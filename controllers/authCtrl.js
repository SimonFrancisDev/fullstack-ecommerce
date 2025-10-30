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

        if(!firstname||!lastname||!email||!password) {
            return res.status(400).json({message: "Attention: One or Two input fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "Attention:  A User with the submitted email already exist"});

        const newUser = new User({
            // firstname:firstname,
            // lastname: lastname, 
            // email: email, 
            // password: password, 
            // role: role
            firstname,
            lastname, 
            email, 
            password,
            role
        })

        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({
            user: {
                id: newUser._id, 
                firstname: newUser.firstname, 
                lastname: newUser.lastname, 
                email: newUser.email, 
                role: newUser.role}
        }, token )
    }catch(err) {
        console.log("Attention: ", err)
    }

};

// login controllers

module.exports = async function login(req, res, next) {
    try {
        const {email, password} = req.body

        if(!email || !password)  {
            return res.status(400).json({message: "Attention: Email or password is required"})
        }

        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({message: "Attention: Invalid email"})

        const isMatch = await user.matchPassword(password)
        if(!isMatch) return res.status(400).json({message: "Attention: Invalid password"})

        const token = generateToken(user);
        res.json({
            message: "Attention: Login Successful, You will be redirected in home page in  5 seconds",
            data: token,
        })
    } catch(err) {
        return res.status(500).json({message: `Attention: Could not login - ${err}`})
    }
}


module.exports  = async function getProfile (req, res, next) {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user) return res.status(404).json({message: `Attention: User Not Found`})

        res.json(user)
    }
    catch(err) {
        next(err)
    }
}