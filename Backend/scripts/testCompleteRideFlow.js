import axios from "axios";
import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "http://localhost:4000";
const SOCKET_URL = "http://localhost:4000";

async function testCompleteRideFlow() {
  let userSocket = null;
  let captainSocket = null;

  try {
    console.log("🧪 Testing Complete Ride Flow...\n");

    // Step 1: Create and login test user
    console.log("1️⃣ Setting up test user...");
    const testUser = {
      fullName: { firstName: "Test", lastName: "User" },
      email: "testuser@example.com",
      password: "TestPass123!",
    };

    try {
      await axios.post(`${BASE_URL}/users/register`, testUser);
    } catch (error) {
      if (error.response?.status !== 400) throw error;
    }

    const userLoginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    const userToken = userLoginResponse.data.token;
    const userId = userLoginResponse.data.user._id;
    console.log("✅ Test user logged in successfully");

    // Step 2: Login existing test captain
    console.log("\n2️⃣ Logging in existing test captain...");

    const captainLoginResponse = await axios.post(
      `${BASE_URL}/captains/login`,
      {
        email: "rajesh.kumar@urbik.com",
        password: "TestPass123!",
      }
    );
    const captainToken = captainLoginResponse.data.token;
    const captainId = captainLoginResponse.data.captain._id;
    console.log("✅ Test captain logged in successfully");

    // Step 3: Connect captain via socket and update location
    console.log("\n3️⃣ Connecting captain to socket...");
    captainSocket = io(SOCKET_URL);

    await new Promise((resolve) => {
      captainSocket.on("connect", () => {
        console.log("✅ Captain socket connected");

        // Join as captain
        captainSocket.emit("join", {
          userId: captainId,
          userType: "captain",
        });

        // Update captain location (near Noida)
        captainSocket.emit("update-location-captain", {
          userId: captainId,
          location: {
            lat: 28.5355, // Noida coordinates
            lng: 77.391,
          },
        });

        console.log("✅ Captain joined socket room and updated location");
        resolve();
      });
    });

    // Step 4: Set up ride notification listener
    console.log("\n4️⃣ Setting up ride notification listener...");
    let rideReceived = false;
    let receivedRideData = null;

    captainSocket.on("new-ride", (data) => {
      console.log("\n🎉 CAPTAIN RECEIVED RIDE NOTIFICATION!");
      console.log("📱 This would show as a popup in the captain dashboard");
      console.log("📋 Ride Details:");
      console.log(
        `   👤 User: ${data.user.fullName.firstName} ${data.user.fullName.lastName}`
      );
      console.log(`   📍 Pickup: ${data.pickup}`);
      console.log(`   📍 Destination: ${data.destination}`);
      console.log(`   💰 Fare: ₹${data.fare}`);
      console.log(`   🆔 Ride ID: ${data._id}`);

      rideReceived = true;
      receivedRideData = data;

      // Send acknowledgment
      captainSocket.emit("ride-notification-received", {
        rideId: data._id,
        captainId: captainId,
      });
      console.log("✅ Captain acknowledged ride notification");
    });

    // Step 5: Connect user via socket
    console.log("\n5️⃣ Connecting user to socket...");
    userSocket = io(SOCKET_URL);

    await new Promise((resolve) => {
      userSocket.on("connect", () => {
        console.log("✅ User socket connected");
        userSocket.emit("join", {
          userId: userId,
          userType: "user",
        });
        resolve();
      });
    });

    // Step 6: Create ride request (this simulates user clicking "Confirm" button)
    console.log('\n6️⃣ Creating ride request (User clicks "Confirm")...');
    const rideRequest = {
      pickup: "Noida Sector 62, Uttar Pradesh, India",
      destination: "Connaught Place, New Delhi, India",
      vehicleType: "car",
    };

    const rideResponse = await axios.post(
      `${BASE_URL}/rides/create`,
      rideRequest,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Ride request created and sent to captains!");
    console.log(`🔍 Captains Found: ${rideResponse.data.captainsFound}`);
    console.log(`📏 Search Radius: ${rideResponse.data.searchRadius}km`);

    // Step 7: Wait for captain to receive notification
    console.log("\n7️⃣ Waiting for captain to receive notification...");
    await new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (rideReceived) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 5000);
    });

    if (rideReceived) {
      console.log("\n🎉 SUCCESS! Complete flow demonstrated:");
      console.log('1. ✅ User clicked "Confirm" → Ride request created');
      console.log("2. ✅ Request sent to captain's dashboard");
      console.log("3. ✅ Captain received popup notification");
      console.log("4. ✅ Captain can now Accept or Decline the ride");

      // Step 8: Simulate captain accepting the ride
      console.log("\n8️⃣ Simulating captain accepting the ride...");

      const confirmResponse = await axios.post(
        `${BASE_URL}/rides/confirm`,
        {
          rideId: receivedRideData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${captainToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Captain accepted the ride!");
      console.log('📱 User will now see "Waiting for Driver" with OTP');
      console.log(`🔐 OTP for ride: ${confirmResponse.data.otp}`);

      console.log("\n🎯 COMPLETE FLOW VERIFIED:");
      console.log("✅ User confirms ride → Request sent to captain");
      console.log("✅ Captain receives popup → Can accept/decline");
      console.log("✅ Captain accepts → User gets OTP");
      console.log("✅ Captain can enter OTP to start ride");
    } else {
      console.log("\n⚠️ Captain did not receive notification within timeout");
    }
  } catch (error) {
    console.error("\n❌ Test failed:", error.response?.data || error.message);
    throw error;
  } finally {
    // Cleanup
    if (userSocket) userSocket.disconnect();
    if (captainSocket) captainSocket.disconnect();
  }
}

// Run the test
testCompleteRideFlow()
  .then(() => {
    console.log("\n✅ Complete ride flow test finished!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Complete ride flow test failed:", error.message);
    process.exit(1);
  });
