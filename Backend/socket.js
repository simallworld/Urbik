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
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
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
          typeof location.ltd !== "number" ||
          typeof location.lng !== "number"
        ) {
          return socket.emit("error", { message: "Invalid location data" });
        }

        await captainModel.findByIdAndUpdate(userId, {
          location: {
            lat: location.ltd,
            lng: location.lng,
          },
        });
      } catch (err) {
        console.error("Error updating location:", err);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
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
