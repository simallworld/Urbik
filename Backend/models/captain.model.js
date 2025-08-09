// Required dependencies
import mongoose from "mongoose";
import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken"; // For JWT token generation

// Define the Captain schema with validation rules and data structure
const captainSchema = new mongoose.Schema(
  {
    // Captain's full name with validation for first and last name
    fullName: {
      firstName: {
        type: String,
        required: true,
        minlength: [3, "FirstName must be at least 3 characters long"],
        trim: true, // Adding trim to remove whitespace
      },
      lastName: {
        type: String,
        minlength: [3, "LastName must be at least 3 characters long"], // Fixed error message
        trim: true, // Adding trim to remove whitespace
      },
    },
    // Email field with validation and uniqueness constraint
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter valid email"],
      index: true, // Adding index for better query performance
    },
    // Password field with strong password requirements
    password: {
      type: String,
      required: true,
      select: false, // Excludes password from query results by default
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      ],
    },
    // Socket ID for real-time communication
    socketId: {
      type: String,
      sparse: true, // Adding sparse index since it's optional
    },
    // Captain's current status (active/inactive)
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
      index: true, // Adding index for status-based queries
    },
    // Vehicle information with detailed specifications
    vehicle: {
      color: {
        type: String,
        required: true,
        minLength: [3, "Color must be at least 3 characters long"],
        trim: true,
      },
      plate: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, "Plate must be at least 3 characters long"],
        trim: true,
        uppercase: true, // Converting plate numbers to uppercase
        index: true, // Adding index for plate number queries
      },
      capacity: {
        type: Number,
        required: true,
        min: [1, "Capacity must be at least 1"],
        max: [50, "Capacity cannot exceed 50"], // Adding reasonable maximum limit
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "bike", "auto", "e-rikshaw"],
        index: true, // Adding index for vehicle type queries
      },
    },
    // Geolocation coordinates for tracking captain's position
    location: {
      ltd: {
        type: Number,
        min: [-90, "Latitude must be between -90 and 90"],
        max: [90, "Latitude must be between -90 and 90"],
      },
      lng: {
        type: Number,
        min: [-180, "Longitude must be between -180 and 180"],
        max: [180, "Longitude must be between -180 and 180"],
      },
    },
  },
  {
    // Adding timestamps to track document creation and updates
    timestamps: true,
  }
);

// Create a 2dsphere index for location-based queries
captainSchema.index({ location: "2dsphere" });

/**
 * Generate JWT token for authentication
 * @returns {string} JWT token
 */
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

/**
 * Compare provided password with stored hashed password
 * @param {string} password - Plain text password to compare
 * @returns {Promise<boolean>} True if passwords match
 */
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Hash password before storing
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Hashed password
 */
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Create the Captain model from the schema
const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;
