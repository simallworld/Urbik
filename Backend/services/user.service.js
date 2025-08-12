/**
 * User Service Module
 * Handles all business logic related to user operations including creation,
 * validation, and data processing before interacting with the database.
 */

import userModel from "../models/user.model.js";

/**
 * Creates a new user in the system
 * @param {Object} params - The user creation parameters
 * @param {string} params.firstName - User's first name
 * @param {string} params.lastName - User's last name (optional)
 * @param {string} params.email - User's email address
 * @param {string} params.password - User's password
 * @returns {Promise<Object>} Created user object
 * @throws {Error} If required fields are missing or validation fails
 */
async function createUser({ firstName, lastName, email, password }) {
  // Validate required fields
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  // Basic password strength validation
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }

  try {
    // Create new user in database
    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password,
    });

    return user;
  } catch (error) {
    // Handle potential database errors
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    throw new Error("Error creating user: " + error.message);
  }
}

export default {
  createUser,
};
