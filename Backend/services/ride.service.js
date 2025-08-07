import rideModel from '../models/ride.model.js';
import mapService from './maps.service.js';
import crypto from 'crypto';

async function getFare(pickup, destination) {
    if(!pickup || !destination){
        throw new Error("Pickup and Destination are required")
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20, 
        eRikshaw: 25
    }

    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8, 
        eRikshaw: 12
    }

    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1.5, 
        eRikshaw: 1.8
    }

    const fare = {
        auto: baseFare.auto + ((distanceTime.distance.value/1000) * perKmRate.auto) + ((distanceTime.duration.value/60) * perMinuteRate.auto),
        car: baseFare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + ((distanceTime.duration.value/60) * perMinuteRate.car),
        bike: baseFare.bike + ((distanceTime.distance.value/1000) * perKmRate.bike) + ((distanceTime.duration.value/60) * perMinuteRate.bike),
        eRikshaw: baseFare.eRikshaw + ((distanceTime.distance.value/1000) * perKmRate.eRikshaw) + ((distanceTime.duration.value/60) * perMinuteRate.eRikshaw)
    };

    return fare;
}

//otp generation
function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


const createRide =  async ({
    userId, pickup, destination, vehicleType
}) => {
    if(!userId || !pickup || !destination || !vehicleType){
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup, destination);

    const ride = await rideModel.create({
        user: userId,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    })

    return ride;

}


export default {createRide};