// Import required models and services
import captainModel from "../models/captain.model.js";
import captainService from "../services/captain.service.js";
import BlacklistTokenModel from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";

/**
 * Register a new captain
 * @param {Object} req - Express request object containing captain details
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with token and captain details
 */
async function registerCaptain(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "Captain already exist" });
    }

    const captain = await captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    next(error);
  }
}

/**
 * Authenticate and login a captain
 * @param {Object} req - Express request object containing email and password
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with token and captain details
 */
async function loginCaptain(req, res, next) {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
}

/**
 * Get the profile of the authenticated captain
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object containing captain data from auth middleware
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with captain profile
 */
async function getCaptainProfile(req, res, next) {
  res.status(200).json({ captain: res.captain });
}

/**
 * Logout captain by blacklisting the current token
 * @param {Object} req - Express request object containing auth token
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response confirming logout
 */
async function logoutCaptain(req, res, next) {
  try {
    // Get token from cookies or authorization header
    const token =
      req.cookies.token ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Add token to blacklist
    await BlacklistTokenModel.create({ token });

    // Clear cookie if it exists
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}

/**
 * Update captain location
 * @param {Object} req - Express request object containing location data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response confirming location update
 */
async function updateLocation(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { lat, lng } = req.body;
    const captainId = res.captain._id;

    const updatedCaptain = await captainService.updateCaptainLocation(captainId, lat, lng);

    res.status(200).json({
      message: "Location updated successfully",
      captain: updatedCaptain,
      location: { lat, lng }
    });
  } catch (error) {
    console.error('Error updating captain location:', error);
    next(error);
  }
}

export default {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
  updateLocation,
};
