// Import mongoose to create MongoDB schema and model
import mongoose from "mongoose";

/**
 * Schema for storing blacklisted/invalidated tokens
 * This is typically used to handle user logout and invalidate JWT tokens
 * When a user logs out, their token is added to this blacklist
 */
const blacklistTokenSchema = new mongoose.Schema({
  // The actual token string that has been invalidated
  token: {
    type: String,
    required: true, // Token is mandatory
    unique: true, // Prevent duplicate tokens in the blacklist
  },

  // Automatically track when the token was blacklisted
  // The 'expires' option will automatically remove the document after 24 hours
  // This helps in automatic cleanup of old blacklisted tokens
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24, // 24 hours TTL (Time To Live) in seconds
  },
});

// Create the model from the schema
// Collection name in MongoDB will be 'blacklisttokens' (lowercase and plural)
const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

// Export the model to be used in other parts of the application
export default BlacklistToken;
