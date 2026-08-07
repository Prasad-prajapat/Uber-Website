const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


async function authUserMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized User"
        })
    }

    const isBlacklisted = await userModel.findOne({ token: token})

    if(isBlacklisted){
        return res.status(401).json({
            message: "Unauthorized User"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        
        req.user = user

        return next()

    } catch (err) {

        return res.status(401).json({
            message: "Unauthorized User"
        })
    }
}

module.exports = {
    authUserMiddleware
}