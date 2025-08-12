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

    socket.on("join", async (data) => {
      try {
        const { userId, userType } = data;

        if (!userId || !userType) {
          return socket.emit("error", { message: "userId and userType are required" });
        }

        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else {
          return socket.emit("error", { message: "Invalid userType" });
        }
      } catch (error) {
        console.error("Error in join event:", error);
        socket.emit("error", { message: "Failed to join room" });
      }
    });

    socket.on("update-location-captain", async (data) => {
      try {
        const { userId, location } = data;

        if (!userId) {
          return socket.emit("error", { message: "userId is required" });
        }

        if (!location || !location.lat || !location.lng) {
          return socket.emit("error", { message: "Invalid location data" });
        }

        await captainModel.findByIdAndUpdate(userId, {
          location: {
            lat: location.lat,
            lng: location.lng,
          },
        });
      } catch (error) {
        console.error("Error updating captain location:", error);
        socket.emit("error", { message: "Failed to update location" });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  console.log(`Sending message to socketId: ${socketId}`, {
    event: messageObject.event,
    dataType: typeof messageObject.data,
    hasData: !!messageObject.data
  });

  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
    console.log(`Message sent successfully to socketId: ${socketId}`);
  } else {
    console.log("Socket.io not initialized.");
  }
};

export { initializeSocket, sendMessageToSocketId };
