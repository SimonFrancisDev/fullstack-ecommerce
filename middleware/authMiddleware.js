import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// For normal users
// protect some routes that concerns ordinary users
module.exports = function protect(req, res, next) {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.startswith("Bearer")) {
        token =  authHeader.split("") [1]
    } 

    if(!token) return res.status(401).json({message: "Attention: Not authorized, token invalid "});


    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret)

        // attaching the user info to request
        req.user = {id: decoded.id, role: decoded.role}
        next()
    }
    catch(err) {
        console.error(err)
        res.status(401).json({Message: "Attention: Not authorized, token invalid"});
    }

}


// Admins only
module.exports = function adminOnly (req, res, next) {
    if(!req.user) return res.status(401).json({Message: "Attention: Not Authorized"});

    if(req.user.role !== "admin") return res.status(401).json({message: "Attention: Admin Access required"});
    next();
}