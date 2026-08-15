const rideModel = require('../models/ride.model')
const { sendMessageToSocketId } = require('../socket')
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
        car: (baseFare.car + (distanceKm * perKmRate.car) + (durationMinutes * perMinuteRate.car)),
        auto: baseFare.auto + (distanceKm * perKmRate.auto) + (durationMinutes * perMinuteRate.auto),
        motorcycle: baseFare.motorcycle + (distanceKm * perKmRate.motorcycle) + (durationMinutes * perMinuteRate.motorcycle)
    }

    // console.log(fare)

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

async function confirmRide({ rideId, captain }){
    if(!rideId){
        throw new Error('Ride id is required')
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found')
    }
    
    return ride
}

async function startRide({ rideId, otp, captain }){
    if(!rideId || !otp){
        throw new Error('Ride id and OTP is required')
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found')
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride not accepted') 
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP') 
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing',
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride
}

async function endRide({ rideId, captain }){
    if(!rideId){
        throw new Error('Ride id is required')
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Ride not found')
    }

    if(ride.status !== 'ongoing'){
        throw new Error('Ride not ongoing') 
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed',
    })

    return ride
}


module.exports = {
    createRide,
    getFare,
    confirmRide,
    startRide,
    endRide
}