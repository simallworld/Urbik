import express from 'express';
import {body} from 'express-validator'
import rideController from '../controllers/ride.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/create',
    authMiddleware.authUser,
    // body('userId').isString().isLength({min: 24, max: 24}).withMessage('Invalid user Id'),
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pick address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'bike', 'eRikshaw']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

export default router;