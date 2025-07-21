/**
 * Import required models and utilities
 */
import userModel from "../models/user.model.js"; // For user authentication
import captainModel from "../models/captain.model.js"; // For captain authentication
import jwt from "jsonwebtoken"; // For JWT token verification
import blackListTokenModel from "../models/blacklistToken.model.js"; // For checking revoked tokens

/**
 * User Authentication Middleware
 *
 * This middleware authenticates regular users by:
 * 1. Extracting JWT token from request cookies or Authorization header
 * 2. Verifying the token hasn't been blacklisted (logged out)
 * 3. Verifying and decoding the JWT token
 * 4. Finding and attaching the user to the request object
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 * @throws {401} If authentication fails
 */
async function authUser(req, res, next) {
  try {
    // Extract token from cookies or Authorization header (Bearer token format)
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    // Return 401 if no token is provided
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No authentication token provided",
      });
    }

    // Check if token has been blacklisted (logged out)
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Unauthorized: Token has been revoked",
      });
    }

    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in database using the decoded ID
    const user = await userModel.findById(decoded._id);

    // If user doesn't exist or is inactive, return unauthorized
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    // Attach user object to request for use in subsequent middleware/routes
    req.user = user;
    next();
  } catch (err) {
    // Handle JWT verification errors or other exceptions
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
}

/**
 * Captain Authentication Middleware
 *
 * This middleware authenticates captains by:
 * 1. Extracting JWT token from request cookies or Authorization header
 * 2. Verifying the token hasn't been blacklisted (logged out)
 * 3. Verifying and decoding the JWT token
 * 4. Finding and attaching the captain to the request object
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 * @throws {401} If authentication fails
 */
async function authCaptain(req, res, next) {
  try {
    // Extract token from cookies or Authorization header (Bearer token format)
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    // Return 401 if no token is provided
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No authentication token provided",
      });
    }

    // Check if token has been blacklisted (logged out)
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Unauthorized: Token has been revoked",
      });
    }

    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the captain in database using the decoded ID
    const captain = await captainModel.findById(decoded._id);

    // If captain doesn't exist or is inactive, return unauthorized
    if (!captain) {
      return res.status(401).json({
        message: "Unauthorized: Captain not found",
      });
    }

    // Attach captain object to request for use in subsequent middleware/routes
    req.captain = captain;
    next();
  } catch (err) {
    // Handle JWT verification errors or other exceptions
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
    });
  }
}

/**
 * Export authentication middleware functions
 * These can be imported and used in route definitions
 */
export default { authUser, authCaptain };
