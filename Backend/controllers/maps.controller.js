const mapService = require('../services/maps.service')
const { validationResult } = require('express-validator')

async function getCoordinates(req, res, next){
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array() })
    }

    const { address } = req.query

    try{
        const coordinates = await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates)

    } catch(err){
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


async function getDistanceTime(req, res, next){
    try{
        const error = validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array() })
        }

        const { origin, destination } = req.query

        const distanceTime = await mapService.getDistanceTime(origin, destination)
        return res.status(200).json(distanceTime);

    }catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error"
         })
    }
}

async function getAutoCompleteSuggestions(req, res, next){
    
    try {
        const error = validationResult(req)

        if(!error.isEmpty()){
            return res.status(400).json({ error: error.array() })
        }

        const { input } = req.query

        const suggestion = await mapService.getAutoCompleteSuggestions(input)
        res.status(200).json(suggestion)
        
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error"
         })
    }
}

module.exports = {
    getCoordinates,
    getDistanceTime,
    getAutoCompleteSuggestions
}