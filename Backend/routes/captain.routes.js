// Import required dependencies
import express from "express";
import captainController from "../controllers/captain.controller.js";
import { body } from "express-validator"; // For request body validation
import authMiddleware from "../middlewares/auth.middleware.js";

// Create Express router instance
const router = express.Router();

/**
 * Captain Registration Route
 * POST /api/captain/register
 *
 * Validates and processes captain registration with the following checks:
 * - Email must be valid
 * - First name must be at least 3 characters
 * - Password must be at least 6 characters
 * - Vehicle details validation:
 *   - Color must be at least 3 characters
 *   - Plate number must be at least 3 characters
 *   - Vehicle capacity must be at least 1
 *   - Vehicle type must be one of: car, bike, auto, or e-rikshaw
 */
router.post(
  "/register",
  [
    // Request body validation middleware
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto", "e-rikshaw"])
      .withMessage("Invalid type"),
  ],
  captainController.registerCaptain // Handler for captain registration
);

/**
 * Captain Login Route
 * POST /api/captain/login
 *
 * Authenticates captain with email and password
 * Validates:
 * - Email format
 * - Password length (min 6 characters)
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  captainController.loginCaptain // Handler for captain login
);

/**
 * Captain Profile Route
 * GET /api/captain/profile
 *
 * Protected route - Requires valid authentication token
 * Returns the profile information of the authenticated captain
 */
router.get(
  "/profile",
  authMiddleware.authCaptain, // Authentication middleware
  captainController.getCaptainProfile // Handler for getting captain profile
);

/**
 * Captain Logout Route
 * GET /api/captain/logout
 *
 * Protected route - Requires valid authentication token
 * Handles captain logout by invalidating the current session/token
 */
router.get(
  "/logout",
  authMiddleware.authCaptain, // Authentication middleware
  captainController.logoutCaptain // Handler for captain logout
);

// Export the router for use in the main application
export default router;
