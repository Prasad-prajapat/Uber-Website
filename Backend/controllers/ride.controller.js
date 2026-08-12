const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator')

async function createRide(req, res, next){

    // console.log("REQ BODY:", req.body);

    const error = validationResult(req)


    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() })
    }

    const { origin, destination, vehicalType } = req.body

    try{
        const ride = await rideService.createRide({ user: req.user._id, origin, destination, vehicalType })
        
        return res.status(201).json(ride)

    } catch(error){

        return res.status(500).json({
            message: error.message
        })
    }

}

module.exports = {
    createRide
}