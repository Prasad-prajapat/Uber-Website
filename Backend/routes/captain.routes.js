const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');


router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 character long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be atleat 8 character long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('vehicle color must be atleast 3 character long'),
    body('vehicle.plateNumber').isLength({ min: 3 }).withMessage('vehicle plate number must be atleast 3 character long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('vehicle capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('vehicle type must be either car, bike or auto')
],
    captainController.captainRegister
)



module.exports = router;