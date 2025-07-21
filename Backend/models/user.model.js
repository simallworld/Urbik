// Required dependencies
import mongoose from "mongoose"; // MongoDB object modeling tool
import bcrypt from "bcrypt"; // For password hashing
import jwt from "jsonwebtoken"; // For generating authentication tokens

/**
 * User Schema Definition
 * Defines the structure and validation rules for user documents in MongoDB
 */
const userSchema = new mongoose.Schema({
  // User's full name structure
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minLength: [3, "Last name must be at least 3 characters long"],
    },
  },
  // User's email field with validation
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please fill a valid email address",
    ],
    minLength: [5, "Email name must be at least 5 characters long"],
  },
  // Password field - will be hashed before storage
  password: {
    type: String,
    required: true,
  },
  // Socket ID for real-time communication
  socketId: {
    type: String,
  },
});

/**
 * Instance method to generate JWT token for authentication
 * @returns {string} JWT token containing user's ID
 */
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
  return token;
};

/**
 * Instance method to compare password with hashed password
 * @param {string} password - Plain text password to compare
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Static method to hash password before saving
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Hashed password
 */
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10); // Salt rounds = 10
};

// Create the model from schema
const userModel = mongoose.model("user", userSchema);

export default userModel;
