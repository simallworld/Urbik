import captainTestData from '../utils/captainTestData.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function setupCaptains() {
  try {
    console.log('🚀 Setting up test captains...');
    
    // Connect to database
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('✅ Connected to MongoDB');
    
    // Create test captains
    const captains = await captainTestData.createTestCaptains();
    
    // Get statistics
    const stats = await captainTestData.getCaptainStats();
    
    console.log('\n📊 Setup Complete!');
    console.log(`- Created ${captains.length} test captains`);
    console.log(`- Total active captains: ${stats.active}`);
    console.log(`- Captains with location: ${stats.withLocation}`);
    console.log(`- Captains ready for rides: ${stats.active}`);
    
    console.log('\n🔑 Test Captain Credentials:');
    console.log('Email: rajesh.kumar@urbik.com | Password: TestPass123!');
    console.log('Email: priya.sharma@urbik.com | Password: TestPass123!');
    console.log('Email: amit.singh@urbik.com | Password: TestPass123!');
    console.log('Email: sunita.devi@urbik.com | Password: TestPass123!');
    console.log('Email: vikash.yadav@urbik.com | Password: TestPass123!');
    
    console.log('\n✅ Test captains are ready! They will get socket IDs when they log in.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📤 Disconnected from MongoDB');
    process.exit(0);
  }
}

setupCaptains();