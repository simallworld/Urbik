import axios from "axios";
import captainModel from "../models/captain.model.js";

// Service to get Address Coordinates
const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Helper function to calculate distance between two coordinates
const getDistanceBetweenCoordinates = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

const getCaptainsInTheRadius = async (lat, lng, radius) => {
    try {
        console.log(`Searching for captains within ${radius}km of coordinates: ${lat}, ${lng}`);
        
        // First, let's try the GeoJSON query for captains with proper location.coordinates
        let captains = await captainModel.find({
            $and: [
                { status: "active" },
                { socketId: { $exists: true, $ne: null, $ne: "" } },
                {
                    "location.coordinates": {
                        $geoWithin: {
                            $centerSphere: [ [ lng, lat ], radius / 6371 ]
                        }
                    }
                }
            ]
        });

        console.log(`Found ${captains.length} captains using GeoJSON coordinates`);

        // If no captains found with GeoJSON, try legacy lat/lng format
        if (captains.length === 0) {
            console.log('No captains found with GeoJSON, trying legacy lat/lng format...');
            
            captains = await captainModel.find({
                $and: [
                    { status: "active" },
                    { socketId: { $exists: true, $ne: null, $ne: "" } },
                    { "location.lat": { $exists: true, $ne: null } },
                    { "location.lng": { $exists: true, $ne: null } }
                ]
            });

            // Filter by distance manually for legacy format
            if (captains.length > 0) {
                captains = captains.filter(captain => {
                    const distance = getDistanceBetweenCoordinates(
                        lat, lng, 
                        captain.location.lat, captain.location.lng
                    );
                    return distance <= radius;
                });
            }

            console.log(`Found ${captains.length} captains using legacy lat/lng format`);
        }

        // Log captain details for debugging
        if (captains.length > 0) {
            console.log('Captain details:', captains.map(c => ({
                id: c._id,
                status: c.status,
                socketId: c.socketId ? 'Present' : 'Missing',
                location: c.location
            })));
        } else {
            console.log('No active captains found in radius. Checking all captains...');
            
            // Debug: Check all captains to see what's available
            const allCaptains = await captainModel.find({}).limit(5);
            console.log('Sample of all captains:', allCaptains.map(c => ({
                id: c._id,
                status: c.status,
                socketId: c.socketId ? 'Present' : 'Missing',
                location: c.location
            })));
        }

        return captains;
    } catch (error) {
        console.error('Error finding captains in radius:', error);
        return [];
    }
}

export default {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestions,
  getCaptainsInTheRadius,
};
