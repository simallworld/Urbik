import axios from 'axios';
import { io } from 'socket.io-client';
import dotenv from 'dotenv';
import captainModel from '../models/captain.model.js';
import mongoose from 'mongoose';

dotenv.config();

const BASE_URL = 'http://localhost:4000';
const SOCKET_URL = 'http://localhost:4000';

async function testCaptainSearch() {
  let captainSocket = null;
  
  try {
    console.log('🧪 Testing Captain Search and Notification...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('✅ Connected to MongoDB');

    // Step 1: Login test captain
    console.log('1️⃣ Logging in test captain...');
    const captainLoginResponse = await axios.post(`${BASE_URL}/captains/login`, {
      email: 'rajesh.kumar@urbik.com',
      password: 'TestPass123!'
    });
    const captainToken = captainLoginResponse.data.token;
    const captainId = captainLoginResponse.data.captain._id;
    console.log('✅ Test captain logged in successfully');
    console.log(`Captain ID: ${captainId}`);

    // Step 2: Check captain status before socket connection
    console.log('\n2️⃣ Checking captain status before socket connection...');
    let captain = await captainModel.findById(captainId);
    console.log(`Status: ${captain.status}, SocketId: ${captain.socketId}, Location: ${JSON.stringify(captain.location)}`);

    // Step 3: Connect captain via socket
    console.log('\n3️⃣ Connecting captain to socket...');
    captainSocket = io(SOCKET_URL);
    
    await new Promise((resolve) => {
      captainSocket.on('connect', () => {
        console.log('✅ Captain socket connected');
        
        // Join as captain
        captainSocket.emit('join', {
          userId: captainId,
          userType: 'captain'
        });
        
        console.log('✅ Captain joined socket room');
        resolve();
      });
    });

    // Wait a bit for the database update
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 4: Check captain status after socket connection
    console.log('\n4️⃣ Checking captain status after socket connection...');
    captain = await captainModel.findById(captainId);
    console.log(`Status: ${captain.status}, SocketId: ${captain.socketId}, Location: ${JSON.stringify(captain.location)}`);

    // Step 5: Update captain location
    console.log('\n5️⃣ Updating captain location...');
    captainSocket.emit('update-location-captain', {
      userId: captainId,
      location: {
        lat: 28.5355,  // Noida coordinates
        lng: 77.3910
      }
    });

    // Wait for location update
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 6: Check captain status after location update
    console.log('\n6️⃣ Checking captain status after location update...');
    captain = await captainModel.findById(captainId);
    console.log(`Status: ${captain.status}, SocketId: ${captain.socketId}, Location: ${JSON.stringify(captain.location)}`);

    // Step 7: Test captain search manually
    console.log('\n7️⃣ Testing captain search manually...');
    const searchLat = 28.5355;
    const searchLng = 77.3910;
    const searchRadius = 5; // 5km radius

    // Search using the same logic as the service
    const foundCaptains = await captainModel.find({
      "location.lat": { $exists: true, $ne: null },
      "location.lng": { $exists: true, $ne: null },
      status: "active",
      socketId: { $exists: true, $ne: null }
    });

    console.log(`Found ${foundCaptains.length} active captains with location and socketId`);
    foundCaptains.forEach(cap => {
      console.log(`  - Captain ${cap._id}: ${cap.fullName.firstName} ${cap.fullName.lastName}`);
      console.log(`    Status: ${cap.status}, SocketId: ${cap.socketId ? 'Yes' : 'No'}`);
      console.log(`    Location: ${JSON.stringify(cap.location)}`);
    });

    // Step 8: Create a ride request to test the complete flow
    console.log('\n8️⃣ Creating ride request to test notification...');
    
    // Set up ride notification listener
    let rideReceived = false;
    captainSocket.on('new-ride', (data) => {
      console.log('\n🎉 CAPTAIN RECEIVED RIDE NOTIFICATION!');
      console.log('📱 This would show as a popup in the captain dashboard');
      console.log(`📋 Ride ID: ${data._id}`);
      console.log(`👤 User: ${data.user.fullName.firstName} ${data.user.fullName.lastName}`);
      console.log(`📍 Pickup: ${data.pickup}`);
      console.log(`📍 Destination: ${data.destination}`);
      console.log(`💰 Fare: ₹${data.fare}`);
      rideReceived = true;
    });

    // Login as user and create ride
    const userLoginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email: 'testuser@example.com',
      password: 'TestPass123!'
    });
    const userToken = userLoginResponse.data.token;

    const rideResponse = await axios.post(`${BASE_URL}/rides/create`, {
      pickup: 'Noida Sector 62, Uttar Pradesh, India',
      destination: 'Connaught Place, New Delhi, India',
      vehicleType: 'car'
    }, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ Ride created! Captains found: ${rideResponse.data.captainsFound}`);

    // Wait for notification
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (rideReceived) {
      console.log('\n🎉 SUCCESS! Captain received ride notification!');
      console.log('✅ The popup would appear on the captain dashboard');
    } else {
      console.log('\n⚠️ Captain did not receive ride notification');
    }

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    throw error;
  } finally {
    if (captainSocket) captainSocket.disconnect();
    await mongoose.disconnect();
  }
}

// Run the test
testCaptainSearch()
  .then(() => {
    console.log('\n✅ Captain search test completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Captain search test failed:', error.message);
    process.exit(1);
  });