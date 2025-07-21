// Import required Node.js core HTTP module
import http from "http";
// Import the Express application instance from app.js
import app from "./app.js";

// Set the port for the server to listen on
// Use environment variable PORT if available, otherwise default to 3000
const port = process.env.PORT || 3000;

// Create an HTTP server instance using the Express app
const server = http.createServer(app);

// Start the server and listen for incoming connections
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use`);
  } else {
    console.error("Server error:", error);
  }
  process.exit(1);
});

// Handle process termination gracefully
process.on("SIGTERM", () => {
  console.log("Received SIGTERM signal. Closing server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
