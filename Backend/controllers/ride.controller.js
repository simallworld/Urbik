import rideService from "../services/ride.service.js";
import { validationResult } from "express-validator";
import mapService from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";

const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // Get pickup coordinates
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log('Pickup coordinates:', pickupCoordinates);

    // Find captains in radius - try multiple radii for better coverage
    let captainsInRadius = [];
    let searchRadius = 2; // Start with 2km
    const maxRadius = 10; // Maximum search radius
    
    console.log(`Starting captain search at lat: ${pickupCoordinates.lat}, lng: ${pickupCoordinates.lng}`);
    
    while (captainsInRadius.length === 0 && searchRadius <= maxRadius) {
      console.log(`Searching for captains within ${searchRadius}km radius...`);
      
      captainsInRadius = await mapService.getCaptainsInTheRadius(
        pickupCoordinates.lat,
        pickupCoordinates.lng,
        searchRadius
      );
      
      console.log(`Found ${captainsInRadius.length} captains within ${searchRadius}km`);
      
      if (captainsInRadius.length === 0) {
        searchRadius += 2; // Increase radius by 2km
      }
    }
    
    // Enhanced logging for debugging
    if (captainsInRadius.length > 0) {
      console.log(`✅ Found ${captainsInRadius.length} captains within ${searchRadius}km:`);
      captainsInRadius.forEach((captain, index) => {
        console.log(`  ${index + 1}. Captain ${captain._id} - ${captain.fullName.firstName} ${captain.fullName.lastName || ''}`);
        console.log(`     Location: lat=${captain.location.lat}, lng=${captain.location.lng}`);
        console.log(`     Socket: ${captain.socketId}`);
        console.log(`     Status: ${captain.status}`);
      });
    } else {
      console.log(`❌ No captains found within ${maxRadius}km radius`);
    }

    // Send response to user first
    res.status(201).json({
      ...ride.toObject(),
      captainsFound: captainsInRadius.length,
      searchRadius: searchRadius,
      message: captainsInRadius.length > 0 
        ? `Ride created successfully. Found ${captainsInRadius.length} captain(s) within ${searchRadius}km.`
        : `Ride created but no captains available within ${maxRadius}km. Please try again later.`
    });

    // Handle captain notifications asynchronously
    if (captainsInRadius.length === 0) {
      console.log(`No captains found within ${maxRadius}km for ride:`, ride._id);
      
      // Notify user that no captains are available
      const userWithRide = await rideModel
        .findOne({ _id: ride._id })
        .populate("user");
      
      if (userWithRide && userWithRide.user.socketId) {
        sendMessageToSocketId(userWithRide.user.socketId, {
          event: "no-captains-available",
          data: {
            rideId: ride._id,
            message: `No captains available within ${maxRadius}km of your location. Please try again later or consider a different pickup location.`,
            searchRadius: maxRadius,
            suggestion: "Try moving to a busier area or wait for captains to come online."
          }
        });
      }
      return;
    }

    // Get ride with user data for captain notification
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    if (!rideWithUser) {
      console.error('Failed to fetch ride with user data for notifications');
      return;
    }

    // Remove OTP from ride data sent to captains
    const rideDataForCaptains = { ...rideWithUser.toObject() };
    delete rideDataForCaptains.otp;

    // Add search radius info for captains
    rideDataForCaptains.searchInfo = {
      searchRadius: searchRadius,
      totalCaptainsFound: captainsInRadius.length
    };

    // Send notifications to all captains in radius
    let notificationsSent = 0;
    captainsInRadius.forEach((captain) => {
      if (captain.socketId) {
        console.log(`📤 Sending ride notification to captain ${captain._id} (${captain.fullName.firstName}) with socketId: ${captain.socketId}`);
        try {
          sendMessageToSocketId(captain.socketId, {
            event: "new-ride",
            data: rideDataForCaptains,
          });
          notificationsSent++;
        } catch (socketError) {
          console.error(`❌ Failed to send notification to captain ${captain._id}:`, socketError);
        }
      } else {
        console.warn(`⚠️ Captain ${captain._id} (${captain.fullName.firstName}) has no valid socketId`);
      }
    });

    console.log(`📊 Ride notifications summary:`);
    console.log(`   - Total captains found: ${captainsInRadius.length}`);
    console.log(`   - Notifications sent: ${notificationsSent}`);
    console.log(`   - Search radius used: ${searchRadius}km`);

  } catch (err) {
    console.error('❌ Error in createRide:', err);
    return res.status(500).json({ 
      message: err.message,
      error: "Failed to create ride. Please try again."
    });
  }
};

const getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;
  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    console.log(`✅ Ride ${rideId} confirmed by captain ${req.captain._id} (${req.captain.fullName.firstName})`);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error(`❌ Error confirming ride ${rideId}:`, err);
    return res.status(500).json({ message: err.message });
  }
};

const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;
  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });

    console.log(`🚗 Ride ${rideId} started by captain ${req.captain._id} (${req.captain.fullName.firstName})`);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error(`❌ Error starting ride ${rideId}:`, err);
    return res.status(500).json({ message: err.message });
  }
};

const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
    const ride = await rideService.endRide({
      rideId,
      captain: req.captain,
    });

    console.log(`🏁 Ride ${rideId} completed by captain ${req.captain._id} (${req.captain.fullName.firstName})`);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error(`❌ Error ending ride ${rideId}:`, err);
    return res.status(500).json({ message: err.message });
  }
};

export default { createRide, getFare, confirmRide, startRide, endRide};