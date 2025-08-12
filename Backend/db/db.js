import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB using Mongoose
 * This function handles the database connection using the DB_CONNECT environment variable
 * It includes proper error handling and connection success logging
 * @returns {Promise} Mongoose connection promise
 */
function connectToDb() {
  // Validate that DB_CONNECT environment variable is set
  if (!process.env.DB_CONNECT) {
    const error = new Error("DB_CONNECT environment variable is not defined. Please check your .env file.");
    console.error("Database connection error:", error.message);
    throw error;
  }

  // Configure Mongoose connection with recommended options
  mongoose
    .connect(process.env.DB_CONNECT, {
      //      useNewUrlParser: true,      // Use new URL parser to avoid deprecation warnings
      //      useUnifiedTopology: true,   // Use new Server Discovery and Monitoring engine
    })
    .then(() => console.log("Successfully connected to MongoDB database"))
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      // Re-throw the error to be handled by the application
      throw err;
    });
}

export default connectToDb;
