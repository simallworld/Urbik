/**
 * @fileoverview Captain Service - Handles business logic for captain-related operations
 * This service layer acts as an intermediary between the controller and the database model,
 * containing all the business logic for captain management.
 */

import captainModel from "../models/captain.model.js";

/**
 * Creates a new captain account in the database with vehicle details
 * @param {Object} params - The captain details
 * @param {string} params.firstName - Captain's first name
 * @param {string} params.lastName - Captain's last name (optional)
 * @param {string} params.email - Captain's email address
 * @param {string} params.password - Captain's password (will be hashed at model level)
 * @param {string} params.color - Vehicle color
 * @param {string} params.plate - Vehicle plate number
 * @param {number} params.capacity - Vehicle passenger capacity (must be positive integer)
 * @param {string} params.vehicleType - Type of vehicle (e.g., car, van)
 * @returns {Promise<Object>} Created captain document (password field will be excluded)
 * @throws {Error} If required fields are missing or invalid
 */
async function createCaptain({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) {
  // Input validation for required fields
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error(
      "Missing required fields: firstName, email, password, color, plate, capacity, and vehicleType are mandatory"
    );
  }

  // Additional validation for specific fields
  if (typeof capacity !== "number" || capacity <= 0) {
    throw new Error("Vehicle capacity must be a positive number");
  }

  if (!/^[A-Za-z0-9\s-]+$/.test(plate)) {
    throw new Error("Invalid vehicle plate format");
  }

  // Convert email to lowercase for consistency
  email = email.toLowerCase();

  try {
    // Create new captain document in the database
    const captain = await captainModel.create({
      fullName: {
        firstName,
        lastName, // lastName is optional, so no validation needed
      },
      email,
      password, // Password hashing should be handled in the model's pre-save hook
      vehicle: {
        color,
        plate: plate.toUpperCase(), // Standardize plate number format
        capacity,
        vehicleType,
      },
    });

    // Return the created captain (the password field should be excluded by the model)
    return captain;
  } catch (error) {
    // Handle potential database errors
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      throw new Error("Email or plate number already registered");
    }
    throw error; // Re-throw other errors
  }
}

/**
 * Export all captain service methods
 * Add new service methods here as the application grows
 */
export default { createCaptain };
