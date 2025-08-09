// Import required dependencies
import dotenv from "dotenv"; // Load environment variables from .env file
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import database connection function
import connectToDb from "./db/db.js"; // Import route handlers
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";
import mapRoutes from "./routes/maps.routes.js";
import rideRoutes from "./routes/ride.routes.js";

// Connect to MongoDB database
connectToDb();

// Initialize Express application
const app = express();

// Middleware setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL
    credentials: true,
  })
); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse Cookie header and populate req.cookies

// Root route handler - Basic health check endpoint
app.get("/", (req, res) => {
  res.send("Hello Urbik");
});

// Mount route handlers
app.use("/users", userRoutes); // User-related routes
app.use("/captains", captainRoutes); // Captain-related routes
app.use("/maps", mapRoutes); //map-related routes
app.use("/rides", rideRoutes); //rides related routes

// Export the Express application
export default app;
