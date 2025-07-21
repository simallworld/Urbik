/**
 * User Routes Module
 * Handles all user-related routes including registration, authentication, profile management
 */

import express from "express";
import { body } from "express-validator";
import userController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @route   POST /register
 * @desc    Register a new user
 * @access  Public
 * @body    {
 *            email: string,
 *            fullName: { firstName: string, lastName?: string },
 *            password: string
 *          }
 */
router.post(
  "/register",
  [
    // Validate email format
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(), // Normalize email for consistency

    // Validate first name
    body("fullName.firstName")
      .trim()
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("First name must contain only letters"),

    // Optional last name validation
    body("fullName.lastName")
      .optional()
      .trim()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Last name must contain only letters"),

    // Password validation with stronger requirements
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  ],
  userController.registerUser
);

/**
 * @route   POST /login
 * @desc    Authenticate user & get token
 * @access  Public
 * @body    {
 *            email: string,
 *            password: string
 *          }
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser
);

/**
 * @route   GET /profile
 * @desc    Get user profile information
 * @access  Private - Requires authentication token
 */
router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

/**
 * @route   GET /logout
 * @desc    Logout user and invalidate token
 * @access  Private - Requires authentication token
 */
router.get("/logout", authMiddleware.authUser, userController.logoutUser);

export default router;
