const express = require('express')
const router = express.Router()
const { body, query } = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/create',
    body('origin').isString().isLength({ min: 3} ).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3} ).withMessage('Invalid destination address'),
    body('vehicalType').isString().isIn([ 'auto', 'car', 'motorcycle' ]).withMessage('Invalid vehical type'),
    authMiddleware.authUserMiddleware,
    rideController.createRide
)

router.get('/get-fare',
    query('origin').isString().isLength({ min: 3} ).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3} ).withMessage('Invalid destination address'),
    authMiddleware.authUserMiddleware, 
    rideController.getFare
)

router.post('/confirm',
     authMiddleware.authCaptainMiddleware,
     body('rideId').isMongoId().withMessage('Invalid ride id'),
     rideController.confirmRide   
)

router.get('/start-ride',
    authMiddleware.authCaptainMiddleware,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid otp'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptainMiddleware,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router