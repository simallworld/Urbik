import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'http://localhost:4000';

async function testRideNotification() {
  try {
    console.log('🧪 Testing Ride Notification System...\n');

    // Step 1: Create a test user and login
    console.log('1️⃣ Creating test user...');
    
    const testUser = {
      fullName: {
        firstName: 'Test',
        lastName: 'User'
      },
      email: 'testuser@example.com',
      password: 'TestPass123!'
    };

    // Try to register user (might already exist)
    try {
      await axios.post(`${BASE_URL}/users/register`, testUser);
      console.log('✅ Test user created successfully');
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('ℹ️ Test user already exists, proceeding...');
      } else {
        throw error;
      }
    }

    // Step 2: Login as user
    console.log('\n2️⃣ Logging in as test user...');
    const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password
    });

    const userToken = loginResponse.data.token;
    console.log('✅ User logged in successfully');

    // Step 3: Create a ride request
    console.log('\n3️⃣ Creating ride request...');
    const rideRequest = {
      pickup: 'Noida Sector 62, Uttar Pradesh, India',
      destination: 'Connaught Place, New Delhi, India',
      vehicleType: 'car'
    };

    const rideResponse = await axios.post(`${BASE_URL}/rides/create`, rideRequest, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Ride request created successfully!');
    console.log(`📍 Pickup: ${rideRequest.pickup}`);
    console.log(`📍 Destination: ${rideRequest.destination}`);
    console.log(`🚗 Vehicle Type: ${rideRequest.vehicleType}`);
    console.log(`💰 Fare: ₹${rideResponse.data.fare}`);
    console.log(`🔍 Captains Found: ${rideResponse.data.captainsFound}`);
    console.log(`📏 Search Radius: ${rideResponse.data.searchRadius}km`);

    if (rideResponse.data.captainsFound > 0) {
      console.log('\n🎉 SUCCESS: Ride request sent to captains!');
      console.log('📱 Check the captain dashboard for the ride notification popup.');
      console.log('🔔 If notifications are enabled, you should also see a browser notification.');
    } else {
      console.log('\n⚠️ WARNING: No captains found in the area.');
      console.log('💡 Make sure captains are logged in and have updated their location.');
    }

    return rideResponse.data;

  } catch (error) {
    console.error('\n❌ Test failed:', error.response?.data || error.message);
    throw error;
  }
}

// Run the test
testRideNotification()
  .then((result) => {
    console.log('\n✅ Ride notification test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Ride notification test failed:', error.message);
    process.exit(1);
  });