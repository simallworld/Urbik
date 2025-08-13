#  Urbik Backend API

[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-black.svg)](https://socket.io/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)

A robust Node.js backend API for the Urbik ride-sharing platform, featuring real-time communication, Google Maps integration, and comprehensive ride management system.

## Architecture

The backend follows a clean, modular architecture with clear separation of concerns:

```
Backend/
├── controllers/        # Request handlers and response formatting
│      ├── captain.controller.js
│      ├── map.controller.js
│      ├── ride.controller.js
│      └── user.controller.js
├── models/             # MongoDB schemas and data models
│      ├── blacklistToken.model.js
│      ├── captain.model.js
│      ├── ride.model.js
│      └── user.model.js
├── routes/             # API endpoint definitions
│      ├── captain.routes.js
│      ├── maps.routes.js
│      ├── ride.routes.js
│      └── user.routes.js
├── services/           # Business logic and external API integrations
│      ├── captain.service.js
│      ├── maps.service.js
│      ├── ride.service.js
│      └── user.service.js
├── middlewares/        # Custom middleware (auth, validation, etc.)
│      └── auth.middleware.js
├── db/                 # Database connection configuration
│    └── db.js
├── app.js              # Express application setup
├── server.js           # Server entry point
└── socket.js           # Socket.io real-time communication
```

## Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.io 4.8.1** - Real-time bidirectional communication
- **JWT** - JSON Web Token for authentication
- **bcrypt 6.0.0** - Password hashing and security
- **Express Validator 7.2.1** - Input validation middleware
- **Google Maps API** - Geocoding, distance, and autocomplete services
- **Axios 1.11.0** - HTTP client for external API calls
- **CORS 2.8.5** - Cross-origin resource sharing
- **Cookie Parser 1.4.7** - Cookie handling middleware

## Quick Start

### &nbsp;&nbsp; Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google Maps API key

### &nbsp;&nbsp; Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the Backend directory:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/urbik

   # Authentication
   JWT_SECRET=your_super_secret_jwt_key_here

   # Google Maps API
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   # Server Configuration
   PORT=4000
   NODE_ENV=development

   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start the server**

   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

4. **Verify installation**
   Visit `http://localhost:4000` - you should see "Hello Urbik"

## Database Models

### &nbsp;&nbsp; User Model

```javascript
{
  fullName: {
    firstName: String (required, min: 3 chars),
    lastName: String (optional, min: 3 chars)
  },
  email: String (required, unique, validated),
  password: String (required, min: 6 chars, hashed),
  socketId: String (for real-time communication)
}
```

### &nbsp;&nbsp; Captain Model

```javascript
{
  fullName: {
    firstName: String (required, min: 3 chars),
    lastName: String (optional, min: 3 chars)
  },
  email: String (required, unique, validated),
  password: String (required, min: 8 chars, complex validation, hashed),
  socketId: String (for real-time communication),
  status: String (enum: ["active", "inactive"], default: "inactive"),
  vehicle: {
    color: String (required, min: 3 chars),
    plate: String (required, min: 3 chars, unique),
    capacity: Number (required, min: 1),
    vehicleType: String (enum: ["car", "bike", "auto", "eRikshaw"])
  },
  location: {
    lat: Number,
    lng: Number,
    coordinates: [Number] (GeoJSON format for geospatial queries)
  }
}
```

### &nbsp;&nbsp;  Ride Model

```javascript
{
  user: ObjectId (ref: "user", required),
  captain: ObjectId (ref: "captain"),
  pickup: String (required, min: 3 chars),
  destination: String (required, min: 3 chars),
  fare: Number (required),
  status: String (enum: ["pending", "accepted", "ongoing", "completed", "cancelled"]),
  duration: Number (in seconds),
  distance: Number (in meters),
  otp: String (6-digit, auto-generated, select: false),
  paymentId: String,
  orderId: String,
  signature: String
}
```

### &nbsp;&nbsp;  BlacklistToken Model

```javascript
{
  token: String (required, unique),
  createdAt: Date (default: Date.now, expires: 24h)
}
```

## Authentication System

###  &nbsp; JWT Implementation

- **Token Generation**: Secure JWT tokens with user/captain ID payload
- **Token Storage**: HTTP-only cookies + Authorization header support
- **Token Validation**: Middleware-based authentication for protected routes
- **Token Blacklisting**: Secure logout with token invalidation
- **Dual Authentication**: Separate auth flows for users and captains

###  &nbsp; Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Input Validation**: Express Validator for request data sanitization
- **CORS Configuration**: Controlled cross-origin access
- **Error Handling**: Comprehensive error responses with proper HTTP status codes

## API Documentation

### &nbsp;  Base URL

```
http://localhost:4000
```

###  &nbsp; Authentication Headers

```
Authorization: Bearer <jwt_token>
```

---

## User Endpoints

### Register User

**POST** `/users/register`

Register a new user account with email and password.

**Request Body:**

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Validation Rules:**

- `firstName`: Required, minimum 3 characters
- `lastName`: Optional, minimum 3 characters if provided
- `email`: Required, valid email format, minimum 5 characters
- `password`: Required, minimum 6 characters

**Success Response (201):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Error Responses:**

- `400 Bad Request`: Validation errors or user already exists
- `500 Internal Server Error`: Server-side error

---

### Login User

**POST** `/users/login`

Authenticate existing user with email and password.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Error Responses:**

- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Invalid credentials
- `500 Internal Server Error`: Server-side error

---

### Get User Profile

**GET** `/users/profile`

Retrieve authenticated user's profile information.

**Authentication:** Required (JWT token)

**Success Response (200):**

```json
{
  "_id": "user_id",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

**Error Responses:**

- `401 Unauthorized`: Invalid or missing token
- `500 Internal Server Error`: Server-side error

---

### Logout User

**GET** `/users/logout`

Logout user and invalidate authentication token.

**Authentication:** Required (JWT token)

**Success Response (200):**

```json
{
  "message": "Logged out"
}
```

**Error Responses:**

- `401 Unauthorized`: Invalid or missing token

---

## Captain Endpoints

### Register Captain

**POST** `/captains/register`

Register a new captain with vehicle information.

**Request Body:**

```json
{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "SecurePass@123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Validation Rules:**

- `firstName`: Required, minimum 3 characters
- `lastName`: Optional, minimum 3 characters if provided
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters with complexity requirements
- `vehicle.color`: Required, minimum 3 characters
- `vehicle.plate`: Required, minimum 3 characters, unique
- `vehicle.capacity`: Required, minimum 1
- `vehicle.vehicleType`: Required, one of: "car", "bike", "auto", "eRikshaw"

**Success Response (201):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "captain_id",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Responses:**

- `400 Bad Request`: Validation errors or captain already exists
- `500 Internal Server Error`: Server-side error

---

### Login Captain

**POST** `/captains/login`

Authenticate existing captain.

**Request Body:**

```json
{
  "email": "alice.smith@example.com",
  "password": "SecurePass@123"
}
```

**Success Response (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "captain_id",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Responses:**

- `400 Bad Request`: Validation errors
- `401 Unauthorized`: Invalid credentials
- `500 Internal Server Error`: Server-side error

---

### Get Captain Profile

**GET** `/captains/profile`

Retrieve authenticated captain's profile information.

**Authentication:** Required (Captain JWT token)

**Success Response (200):**

```json
{
  "captain": {
    "_id": "captain_id",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "status": "active",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "location": {
      "lat": 40.7128,
      "lng": -74.006
    }
  }
}
```

**Error Responses:**

- `401 Unauthorized`: Invalid or missing token

---

### Logout Captain

**GET** `/captains/logout`

Logout captain and invalidate authentication token.

**Authentication:** Required (Captain JWT token)

**Success Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**

- `401 Unauthorized`: Invalid or missing token

---

## Ride Endpoints

### Create Ride

**POST** `/rides/create`

Create a new ride request.

**Authentication:** Required (User JWT token)

**Request Body:**

```json
{
  "pickup": "123 Main Street, New York, NY",
  "destination": "456 Broadway, New York, NY",
  "vehicleType": "car"
}
```

**Validation Rules:**

- `pickup`: Required, minimum 3 characters
- `destination`: Required, minimum 3 characters
- `vehicleType`: Required, one of: "auto", "car", "bike", "eRikshaw"

**Success Response (201):**

```json
{
  "ride": {
    "_id": "ride_id",
    "user": "user_id",
    "pickup": "123 Main Street, New York, NY",
    "destination": "456 Broadway, New York, NY",
    "fare": 25.5,
    "status": "pending",
    "otp": "123456"
  }
}
```

---

### Get Fare Estimate

**GET** `/rides/get-fare?pickup=location1&destination=location2`

Calculate estimated fare for a ride.

**Authentication:** Required (User JWT token)

**Query Parameters:**

- `pickup`: Required, minimum 3 characters
- `destination`: Required, minimum 3 characters

**Success Response (200):**

```json
{
  "fare": {
    "auto": 15.25,
    "car": 25.5,
    "bike": 10.75,
    "eRikshaw": 12.0
  }
}
```

**Error Responses:**

- `400 Bad Request`: Invalid pickup or destination
- `401 Unauthorized`: Invalid or missing token
- `500 Internal Server Error`: Map service error

---

### Confirm Ride

**POST** `/rides/confirm`

Captain confirms and accepts a ride request.

**Authentication:** Required (Captain JWT token)

**Request Body:**

```json
{
  "rideId": "ride_id_here"
}
```

**Success Response (200):**

```json
{
  "ride": {
    "_id": "ride_id",
    "status": "accepted",
    "captain": "captain_id",
    "otp": "123456"
  }
}
```

---

### Start Ride

**GET** `/rides/start-ride?rideId=ride_id&otp=123456`

Start a confirmed ride with OTP verification.

**Authentication:** Required (Captain JWT token)

**Query Parameters:**

- `rideId`: Required, valid MongoDB ObjectId
- `otp`: Required, 6-digit OTP

**Success Response (200):**

```json
{
  "ride": {
    "_id": "ride_id",
    "status": "ongoing",
    "startTime": "2024-01-15T10:30:00Z"
  }
}
```

**Error Responses:**

- `400 Bad Request`: Invalid ride ID or OTP
- `404 Not Found`: Ride not found
- `401 Unauthorized`: Invalid token or unauthorized captain

---

### End Ride

**POST** `/rides/end-ride`

Complete an ongoing ride.

**Authentication:** Required (Captain JWT token)

**Request Body:**

```json
{
  "rideId": "ride_id_here"
}
```

**Success Response (200):**

```json
{
  "ride": {
    "_id": "ride_id",
    "status": "completed",
    "endTime": "2024-01-15T11:00:00Z",
    "duration": 1800,
    "fare": 25.5
  }
}
```

---

## Maps Endpoints

### Get Coordinates

**GET** `/maps/get-coordinates?address=location`

Convert address to latitude/longitude coordinates.

**Authentication:** Required (User JWT token)

**Query Parameters:**

- `address`: Required, minimum 3 characters

**Success Response (200):**

```json
{
  "lat": 40.7128,
  "lng": -74.006
}
```

---

### Get Distance and Time

**GET** `/maps/get-distance-time?origin=location1&destination=location2`

Calculate distance and travel time between two locations.

**Authentication:** Required (User JWT token)

**Query Parameters:**

- `origin`: Required, minimum 3 characters
- `destination`: Required, minimum 3 characters

**Success Response (200):**

```json
{
  "distance": {
    "text": "5.2 km",
    "value": 5200
  },
  "duration": {
    "text": "12 mins",
    "value": 720
  }
}
```

---

### Get Location Suggestions

**GET** `/maps/get-suggestions?input=search_term`

Get autocomplete suggestions for location search.

**Authentication:** Required (User JWT token)

**Query Parameters:**

- `input`: Required, minimum 3 characters

**Success Response (200):**

```json
{
  "suggestions": [
    "123 Main Street, New York, NY, USA",
    "Main Street Station, New York, NY, USA",
    "Main Street Bridge, New York, NY, USA"
  ]
}
```

---

## Real-time Communication (Socket.io)

### Connection

```javascript
// Client connection
const socket = io("http://localhost:4000");
```

### Events

#### Join Room

```javascript
// Client emits
socket.emit("join", {
  userId: "user_or_captain_id",
  userType: "user", // or 'captain'
});
```

#### Update Captain Location

```javascript
// Captain emits location updates
socket.emit("update-location-captain", {
  userId: "captain_id",
  location: {
    lat: 40.7128,
    lng: -74.006,
  },
});
```

#### Ride Events

```javascript
// System emits to specific users
socket.to(socketId).emit("ride-confirmed", rideData);
socket.to(socketId).emit("ride-started", rideData);
socket.to(socketId).emit("ride-ended", rideData);
```

### Error Handling

```javascript
socket.on("error", (error) => {
  console.error("Socket error:", error.message);
});
```

---

## Middleware

### &nbsp;  Authentication Middleware

- **authUser**: Validates user JWT tokens
- **authCaptain**: Validates captain JWT tokens
- Supports both Authorization header and cookie-based authentication
- Automatic token blacklist checking

### &nbsp;  Validation Middleware

- Express Validator for input sanitization
- Custom validation rules for each endpoint
- Comprehensive error messages

---

## Deployment

###  &nbsp; Environment Variables

```env
# Production Environment
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urbik
JWT_SECRET=your_production_jwt_secret
GOOGLE_MAPS_API_KEY=your_production_google_maps_key
FRONTEND_URL=https://your-frontend-domain.com
```

###  &nbsp; Production Considerations

- Use MongoDB Atlas for database hosting
- Implement rate limiting for API endpoints
- Set up proper logging and monitoring
- Configure SSL/TLS certificates
- Use environment-specific configurations
- Implement database connection pooling
- Set up automated backups

---

## Testing

### API Testing

```bash
# Test user registration
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":{"firstName":"Test","lastName":"User"},"email":"test@example.com","password":"password123"}'

# Test authentication
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Socket.io Testing

Use tools like Socket.io Client or Postman to test real-time events.

---

## Performance Optimization

### &nbsp;  Database Optimization

- Geospatial indexing for location-based queries
- Compound indexes for frequently queried fields
- Connection pooling for better resource management

### &nbsp;  API Optimization

- Response compression with gzip
- Request rate limiting
- Efficient query patterns
- Proper error handling and logging

---

## Development Tools

###  &nbsp; Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (to be implemented)
```

### &nbsp;  Development Dependencies

- **nodemon**: Auto-restart server on file changes
- **ESLint**: Code linting and formatting (recommended)

---

## Support

For API support and documentation issues:

- Email: api-support@urbik.com
- Documentation: [API Docs](https://api.urbik.com/docs)
- Issues: [GitHub Issues](https://github.com/urbik/backend/issues)

---

**Built with ❤️ for the Urbik Platform**
