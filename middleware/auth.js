const jwt = require("jsonwebtoken");
const {jwtSecret} = require("../config/index");

function authValidation(){
    return (req, res, next) => {
        return validateToken(req, res, next)
    }
}

function validateToken(req, res, next){
    const token = req.cookies.token;
    if (!token){
        return res.status(403).json({
            success: false,
            message: "A token is required for this process"
        })
    }
    return verifyToken(token, req, res, next)
}

function verifyToken(token, req, res, next){
    try {
        const decoded = jwt.verify(token, jwtSecret);
        delete decoded.iat;
        delete decoded.exp;
        req.user = decoded;
        return next()
    } catch ({message, name}) {
        return res.status(403).json({
            success: false,
            message,
            type: name
        })
    }
}

module.exports = authValidation