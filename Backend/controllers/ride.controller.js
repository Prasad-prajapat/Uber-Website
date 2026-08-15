const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator')
const mapService = require('../services/maps.service')
const { sendMessageToSocketId } = require('../socket')
const rideModel = require('../models/ride.model')

async function createRide(req, res, next){

    // console.log("REQ BODY:", req.body);

    const error = validationResult(req)


    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() })
    }

    const { origin, destination, vehicalType } = req.body

    try{
        const ride = await rideService.createRide({ user: req.user._id, origin, destination, vehicalType })
        res.status(201).json(ride)
        
        const pickupCoordinates = await mapService.getAddressCoordinate(origin)
        console.log("PICKUP COORDINATES:", pickupCoordinates)

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 300)

        ride.otp = ""

        const rideWithUser = await rideModel
            .findOne({ _id: ride._id })
            .populate('user');   

        console.log("RIDE WITH USER:", rideWithUser);

        console.log("CAPTAIN: ",captainsInRadius)
        captainsInRadius.map(captain =>{

            // console.log("Captain:", captain.fullname.firstname);
            // console.log("Socket ID:", captain.socketId);

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })

       

    } catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }

}

async function getFare(req, res, next){

    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() })
    }

    const { origin, destination } = req.query

    try {
        const fare = await rideService.getFare(origin, destination)
        
        return res.status(200).json(fare)

    } catch(error) {
         return res.status(500).json({
            message: error.message
        })
    }
}

async function confirmRide(req, res, next){
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() })
    }

    const { rideId } = req.body

    try{
        const ride = await rideService.confirmRide({rideId, captain: req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride)
    } catch(error){
        return res.status(500).json({ message: error.message})
    }
}

async function startRide(req, res, next){
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() })
    }

    const { rideId, otp } = req.query

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain })

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride)

    } catch(error){
        return res.status(500).json({ message: error.message})
    }
}

async function endRide(req, res){
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() })
    }

    const { rideId } = req.body

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain })

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride)

    }   catch(error){
        return res.status(500).json({ message: error.message})
    }

}

module.exports = {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
}