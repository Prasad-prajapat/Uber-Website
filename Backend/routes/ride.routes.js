const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/create',
    body('origin').isString().isLength({ min: 3} ).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3} ).withMessage('Invalid destination address'),
    body('vehicalType').isString().isIn([ 'auto', 'car', 'motorcycle' ]).withMessage('Invalid vehical type'),
    authMiddleware.authUserMiddleware,
    rideController.createRide
)



module.exports = router