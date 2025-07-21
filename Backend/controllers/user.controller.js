/**
 * Required external modules and models
 */
import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import BlacklistTokenModel from "../models/blacklistToken.model.js";

/**
 * User Registration Controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Response with user data and auth token
 */
async function registerUser(req, res, next) {
  // Validate request body using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract user data from request body
  const { fullName, email, password } = req.body;

  // Check if user already exists with the same email
  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the user's password before storing
  const hashedPassword = await userModel.hashPassword(password);

  // Create new user using user service
  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });

  // Generate authentication token for the new user
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
}

/**
 * User Login Controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Response with user data and auth token
 */
async function loginUser(req, res, next) {
  try {
    // Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract credentials from request body
    const { email, password } = req.body;

    // Find user by email and include password field for verification
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password using the comparePassword method from the user model
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate authentication token
    const token = user.generateAuthToken();

    // Set HTTP-only cookie with the token
    // Cookie expires in 1 hour (3600000 milliseconds)
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      secure: process.env.NODE_ENV === "production", // Only sends cookie over HTTPS in production
      maxAge: 3600000, // 1 hour expiration
    });

    // Send response with token and user data
    res.status(200).json({ token, user });
  } catch (error) {
    next(error); // Pass any errors to error handling middleware
  }
}

/**
 * Get User Profile Controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Response with user profile data
 */
async function getUserProfile(req, res, next) {
  try {
    // Return the user object attached by the auth middleware
    res.status(200).json(res.user);
  } catch (error) {
    next(error);
  }
}

/**
 * User Logout Controller
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Response confirming logout
 */
async function logoutUser(req, res, next) {
  try {
    // Get token from either cookies or authorization header
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(400).json({ message: "No token found" });
    }

    // Add the token to blacklist to prevent reuse
    await BlacklistTokenModel.create({ token });

    // Clear the token cookie
    res.clearCookie("token");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}

// Export controller functions
export default {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
};
