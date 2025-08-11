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

        await captainModel.findByIdAndUpdate(userId, {
          location: {
            lat: location.lat,
            lng: location.lng,
          },
        });
      } catch (err) {
        console.error("Error updating location:", err);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
      
      // Mark captain as inactive when they disconnect
      try {
        await captainModel.findOneAndUpdate(
          { socketId: socket.id },
          { status: "inactive", socketId: null }
        );
        console.log(`Captain with socket ${socket.id} marked as inactive`);
      } catch (err) {
        console.error("Error updating captain status on disconnect:", err);
      }
    });
  });
}

// Send message to specific socketId
function sendMessageToSocketId(socketId, messageObject) {
  console.log("Sending message:", messageObject);

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log("Socket.io not initialized.");
  }
}

export { initializeSocket, sendMessageToSocketId };
