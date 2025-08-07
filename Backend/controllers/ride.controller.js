import rideService from '../services/ride.service.js';
import {validationResult} from 'express-validator'

const createRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {userId, pickup, destination, vehicleType} = req.body;

    try {
        const ride = await rideService.createRide({userId: req.user._id, pickup, destination, vehicleType});
        return res.status(201).json(ride);        
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

export default {createRide};