const captainModel = require('../models/captain.model');

async function createCaptain({firstname, lastname, email, password, color, plateNumber, capacity, vehicleType}) {
    
    if (!firstname || !email || !password || !color || !plateNumber || !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plateNumber,
            capacity,
            vehicleType
        }
    })

    return captain
}

module.exports = {
    createCaptain
}