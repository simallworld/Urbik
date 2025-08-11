import axios from "axios";
import captainModel from "../models/captain.model.js";

// Service to get Address Coordinates
const getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    if (response.data.status === "OK" && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Coordinates not found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

// Service to get getDistanceTime
const getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and Destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getCaptainsInTheRadius = async (lat, lng, radius) => {
  //Radius in Kms
  console.log(`Finding captains near lat: ${lat}, lng: ${lng}, radius: ${radius}km`);
  
  if (!lat || !lng || typeof lat !== 'number' || typeof lng !== 'number') {
    throw new Error('Invalid coordinates provided');
  }

  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    throw new Error('Coordinates out of valid range');
  }

  try {
    // First try with new GeoJSON format
    let captains = await captainModel.find({
      "location.coordinates": {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius / 6371], // radius in radians
        },
      },
      status: "active",
      socketId: { $exists: true, $ne: null }
    });

    console.log(`Found ${captains.length} captains with GeoJSON location format`);

    // If no captains found with GeoJSON, try legacy format for backward compatibility
    if (captains.length === 0) {
      console.log('No captains found with GeoJSON format, trying legacy format...');
      
      captains = await captainModel.find({
        $and: [
          { "location.lat": { $exists: true, $ne: null } },
          { "location.lng": { $exists: true, $ne: null } },
          {
            $expr: {
              $lte: [
                {
                  $multiply: [
                    6371, // Earth's radius in km
                    {
                      $acos: {
                        $add: [
                          {
                            $multiply: [
                              { $sin: { $multiply: [{ $divide: [lat * Math.PI, 180] }, 1] } },
                              { $sin: { $multiply: [{ $divide: [{ $multiply: ["$location.lat", Math.PI] }, 180] }, 1] } }
                            ]
                          },
                          {
                            $multiply: [
                              { $cos: { $multiply: [{ $divide: [lat * Math.PI, 180] }, 1] } },
                              { $cos: { $multiply: [{ $divide: [{ $multiply: ["$location.lat", Math.PI] }, 180] }, 1] } },
                              { $cos: { $multiply: [{ $divide: [{ $subtract: [{ $multiply: ["$location.lng", Math.PI] }, lng * Math.PI] }, 180] }, 1] } }
                            ]
                          }
                        ]
                      }
                    }
                  ]
                },
                radius
              ]
            }
          },
          { status: "active" },
          { socketId: { $exists: true, $ne: null } }
        ]
      });

      console.log(`Found ${captains.length} captains with legacy location format`);
    }

    // Log captain details for debugging
    captains.forEach(captain => {
      console.log(`Captain ${captain._id}: status=${captain.status}, socketId=${captain.socketId}, location=${JSON.stringify(captain.location)}`);
    });

    return captains;

  } catch (error) {
    console.error('Error finding captains in radius:', error);
    throw new Error(`Failed to find captains: ${error.message}`);
  }
};

export default {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestions,
  getCaptainsInTheRadius,
};
