import { Server as socketIo } from "socket.io";
import userModel from "./models/user.model.js";
import captainModel from "./models/captain.model.js";

let io;

function initializeSocket(server) {
  io = new socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Join event
    socket.on("join", async ({ userId, userType }) => {
      try {
        console.log(`${userType} ${userId} joining with socket ${socket.id}`);
        
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
          console.log(`User ${userId} socket updated`);
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, {
            socketId: socket.id,
            status: "active" // Mark captain as active when they connect
          });
          console.log(`Captain ${userId} socket updated and marked as active`);
        }
      } catch (err) {
        console.error("Error updating socketId:", err);
        socket.emit("error", { message: "Failed to join" });
      }
    });

    // Update captain's location
    socket.on("update-location-captain", async ({ userId, location }) => {
      try {
        if (
          !location ||
          typeof location.lat !== "number" ||
          typeof location.lng !== "number"
        ) {
          return socket.emit("error", { message: "Invalid location data" });
        }

        // Validate coordinates
        if (location.lat < -90 || location.lat > 90 || location.lng < -180 || location.lng > 180) {
          return socket.emit("error", { message: "Invalid coordinate values" });
        }

        console.log(`Updating location for captain ${userId}: lat=${location.lat}, lng=${location.lng}`);

        // Update with both GeoJSON format and legacy lat/lng for compatibility
        const updateData = {
          location: {
            type: 'Point',
            coordinates: [location.lng, location.lat], // GeoJSON format: [longitude, latitude]
            lat: location.lat, // Legacy format
            lng: location.lng, // Legacy format
          },
          status: "active" // Ensure captain is active when updating location
        };

        const updatedCaptain = await captainModel.findByIdAndUpdate(
          userId,
          updateData,
          { new: true }
        );

        if (!updatedCaptain) {
          return socket.emit("error", { message: "Captain not found" });
        }

        console.log(`Location updated successfully for captain ${userId}`);
        socket.emit("location-updated", {
          message: "Location updated successfully",
          location: {
            lat: location.lat,
            lng: location.lng
          }
        });

      } catch (err) {
        console.error("Error updating location:", err);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    // Handle captain going offline
    socket.on("captain-offline", async ({ userId }) => {
      try {
        console.log(`Captain ${userId} going offline`);
        
        await captainModel.findByIdAndUpdate(userId, {
          status: "inactive",
          socketId: null
        });
        
        console.log(`Captain ${userId} marked as inactive`);
        socket.emit("status-updated", { status: "inactive" });
      } catch (err) {
        console.error("Error updating captain status:", err);
        socket.emit("error", { message: "Failed to update status" });
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
      
      // Mark captain as inactive when they disconnect
      try {
        const captain = await captainModel.findOneAndUpdate(
          { socketId: socket.id },
          { status: "inactive", socketId: null },
          { new: true }
        );
        
        if (captain) {
          console.log(`Captain ${captain._id} with socket ${socket.id} marked as inactive`);
        } else {
          // Could be a user disconnecting
          await userModel.findOneAndUpdate(
            { socketId: socket.id },
            { socketId: null }
          );
          console.log(`User with socket ${socket.id} disconnected`);
        }
      } catch (err) {
        console.error("Error updating status on disconnect:", err);
      }
    });
  });
}

// Send message to specific socketId
function sendMessageToSocketId(socketId, messageObject) {
  console.log(`Attempting to send message to socketId: ${socketId}`, messageObject);

  if (!io) {
    console.error("Socket.io not initialized.");
    return false;
  }

  if (!socketId) {
    console.error("No socketId provided for message:", messageObject);
    return false;
  }

  try {
    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log(`Message sent successfully to socketId: ${socketId}`);
    return true;
  } catch (error) {
    console.error(`Failed to send message to socketId ${socketId}:`, error);
    return false;
  }
}

export { initializeSocket, sendMessageToSocketId };
