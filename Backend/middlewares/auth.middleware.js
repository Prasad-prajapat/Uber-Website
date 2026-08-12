const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklistToken.model")
const captainModel = require("../models/captain.model")

async function authUserMiddleware(req, res, next){

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];


    if(!token){
        return res.status(401).json({
            message: "Unauthorized User"
        })
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token})

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

async function authCaptainMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    
    // console.log("token1",token)
     
    if(!token){
        return res.status(401).json({
            message: "Unauthorized Captain"
        })
    }
    

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token})

    if(isBlacklisted){
        return res.status(401).json({
            message: "Unauthorized Captain"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)
        
        req.captain = captain

        return next()

    } catch (err) {

        return res.status(401).json({
            message: "Unauthorized Captain"
        })
    }
}

module.exports = {
    authUserMiddleware,
    authCaptainMiddleware
}