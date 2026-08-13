const rideModel = require('../models/ride.model')
const mapService = require('./maps.service')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

async function getFare(origin, destination){

    if(!origin || !destination){
        throw new Error('origin and destination are required')
    }

    const result = await mapService.getDistanceTime(origin, destination)

    // console.log("DISTANCE TIME RESULT:", result);

    const distanceKm = result.distance.value / 1000
    const durationMinutes = Math.round(result.duration.value / 60)

    const baseFare = {
        car: 50,
        auto: 30,
        motorcycle: 20
    }

    const perKmRate = {
        car: 15,
        auto: 10,
        motorcycle: 8
    }

    const perMinuteRate = {
        car: 3,
        auto: 2,
        motorcycle: 1.5
    }

    const fare = {
        car: baseFare.car + (distanceKm * perKmRate.car) + (durationMinutes * perMinuteRate.car),
        auto: baseFare.auto + (distanceKm * perKmRate.auto) + (durationMinutes * perMinuteRate.auto),
        motorcycle: baseFare.motorcycle + (distanceKm * perKmRate.motorcycle) + (durationMinutes * perMinuteRate.motorcycle)
    }

    return fare
}

function generateOtp(num){
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString()
    return otp
}

async function createRide({ user, origin, destination, vehicalType}){

    if(!user || !origin || !destination || !vehicalType){
        throw new Error('All field are required')
    }

    const fare = await getFare(origin, destination)

    const ride = rideModel.create({
        user,
        origin,
        destination,
        otp: generateOtp(6),
        fare: fare[ vehicalType ]
    })

    return ride
}



module.exports = {
    createRide
}