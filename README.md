# Urbik - Modern Ride-Sharing Platform

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-black.svg)](https://socket.io/)

Hi, I’m _Shivam Swaroop_, a passionate Full-Stack Software Engineer with hands-on experience in building scalable, real-time applications. I have a strong foundation in the MERN stack, cloud integration and modern development practices. My work blends clean architecture, intuitive UI/UX, and high-performance backend systems.

**Urbik** is my full-stack ride-sharing application built with the MERN stack designed to provide a seamless experience, featuring real-time communication, Google Maps integration, and comprehensive ride management for both passengers and drivers.

## Features

### &nbsp;&nbsp; User Features

- **Secure Authentication**: JWT-based registration and login system
- **Ride Booking**: Book rides with multiple vehicle options (Car, Bike, Auto, E-Rickshaw)
- **Real-time Tracking**: Live location tracking during rides
- **Fare Estimation**: Dynamic fare calculation based on distance and time
- **Location Search**: Google Maps autocomplete for pickup and destination
- **Ride History**: Track completed and ongoing rides
- **OTP Verification**: Secure ride start verification system
- **Payment integration**: Upcoming feature

### &nbsp;&nbsp; Captain (Driver) Features

- **Driver Registration**: Complete profile setup with vehicle details
- **Real-time Location Updates**: Live location broadcasting to the system
- **Ride Management**: Accept, start, and complete ride requests
- **Earnings Tracking**: Monitor ride earnings and statistics
- **Vehicle Management**: Manage multiple vehicle types and details
- **Status Control**: Toggle between active/inactive status

### &nbsp;&nbsp; Technical Features

- **Real-time Communication**: Socket.io for live updates and notifications
- **Google Maps Integration**: Geocoding, distance calculation, and autocomplete
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Protected Routes**: Secure authentication for both users and captains
- **Token Management**: Secure JWT handling with blacklist functionality
- **Database Optimization**: Efficient MongoDB queries with geospatial indexing

## Architecture

```
Urbik/
├── Frontend/                 # React.js Frontend Application
│   ├── src/
│   │   ├── components/      # Reusable UI Components
│   │   │   ├── CaptainDetails.jsx
│   │   │   ├── ConfirmRide.jsx
│   │   │   ├── LiveTracking.jsx
│   │   │   ├── LocationSearchPanel.jsx
│   │   │   ├── RidePopUp.jsx
│   │   │   ├── VehiclePanel.jsx
│   │   │   └── WaitingForDriver.jsx
│   │   ├── context/         # Global State Management
│   │   │   ├── CaptainContext.jsx
│   │   │   ├── SocketContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── pages/           # Route Components
│   │   │   ├── Home.jsx
│   │   │   ├── Riding.jsx
│   │   │   ├── CaptainHome.jsx
│   │   │   ├── CaptainRiding.jsx
│   │   │   └── Authentication Pages
│   │   └── assets/          # Static Assets
│   └── package.json
│
├── Backend/                  # Node.js Backend API
│   ├── controllers/         # Request Handlers
│   │   ├── user.controller.js
│   │   ├── captain.controller.js
│   │   ├── ride.controller.js
│   │   └── map.controller.js
│   ├── models/              # Database Schemas
│   │   ├── user.model.js
│   │   ├── captain.model.js
│   │   ├── ride.model.js
│   │   └── blacklistToken.model.js
│   ├── routes/              # API Route Definitions
│   │   ├── user.routes.js
│   │   ├── captain.routes.js
│   │   ├── ride.routes.js
│   │   └── maps.routes.js
│   ├── services/            # Business Logic
│   │   ├── user.service.js
│   │   ├── captain.service.js
│   │   ├── ride.service.js
│   │   └── maps.service.js
│   ├── middlewares/         # Custom Middleware
│   │   └── auth.middleware.js
│   ├── db/                  # Database Configuration
│   │   └── db.js
│   ├── app.js               # Express App Configuration
│   ├── server.js            # Server Entry Point
│   ├── socket.js            # Socket.io Configuration
│   └── package.json
│
└── README.md                # Project Documentation
```

## Tech Stack

### &nbsp;&nbsp; Frontend

- **React 19.1.0** - Modern UI library with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Socket.io Client** - Real-time communication
- **Google Maps API** - Maps integration and location services
- **GSAP** - High-performance animations
- **Remixicon** - Beautiful icon library

### &nbsp;&nbsp; Backend

- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.3** - MongoDB object modeling
- **Socket.io 4.8.1** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Express Validator** - Input validation middleware
- **Google Maps API** - Geocoding and distance services

### &nbsp;&nbsp; Development Tools

- **ESLint** - Code linting and formatting
- **Nodemon** - Development server auto-restart
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling middleware

## Quick Start

### &nbsp;&nbsp; Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google Maps API key

### &nbsp;&nbsp; Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/urbik.git
   cd urbik
   ```

2. **Backend Setup**

   ```bash
   cd Backend
   npm install

   # Create .env file
   cp .env.example .env
   # Add your environment variables:
   # MONGODB_URI=mongodb://localhost:27017/urbik
   # JWT_SECRET=your_jwt_secret_key
   # GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   # PORT=4000
   # FRONTEND_URL=http://localhost:5173

   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd ../Frontend
   npm install

   # Create .env file
   echo "VITE_BASE_URL=http://localhost:4000" > .env

   # Start the frontend development server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## Application Flow

### &nbsp;&nbsp; User Journey

1. **Registration/Login** → User creates account or signs in
2. **Location Selection** → Choose pickup and destination locations
3. **Vehicle Selection** → Select from available vehicle types
4. **Fare Confirmation** → Review and confirm ride fare
5. **Driver Matching** → System finds nearby available drivers
6. **Real-time Tracking** → Track driver location and ride progress
7. **Ride Completion** → Complete ride with OTP verification

### &nbsp;&nbsp; Captain Journey

1. **Registration** → Register with vehicle details and documents
2. **Go Online** → Set status to active and start receiving requests
3. **Ride Requests** → Receive and accept ride requests
4. **Navigation** → Navigate to pickup location
5. **Ride Start** → Verify OTP and start the ride
6. **Ride Completion** → Complete ride and receive payment

## Authentication & Security

### &nbsp;&nbsp; JWT Authentication

- Secure token-based authentication for both users and captains
- Tokens stored in HTTP-only cookies and localStorage
- Automatic token refresh and validation
- Token blacklisting for secure logout

### &nbsp;&nbsp; Security Features

- Password hashing with bcrypt (salt rounds: 10)
- Input validation and sanitization
- Protected API endpoints with middleware
- CORS configuration for secure cross-origin requests
- Rate limiting and request validation

## Database Schema

### &nbsp;&nbsp; User Model

```javascript
{
  fullName: {
    firstName: String (required, min: 3),
    lastName: String (min: 3)
  },
  email: String (required, unique, validated),
  password: String (required, hashed),
  socketId: String (for real-time communication)
}
```

### &nbsp;&nbsp; Captain Model

```javascript
{
  fullName: {
    firstName: String (required, min: 3),
    lastName: String (min: 3)
  },
  email: String (required, unique),
  password: String (required, hashed),
  socketId: String,
  status: String (active/inactive),
  vehicle: {
    color: String (required),
    plate: String (required, unique),
    capacity: Number (required),
    vehicleType: String (car/bike/auto/eRikshaw)
  },
  location: {
    lat: Number,
    lng: Number,
    coordinates: [Number] (GeoJSON format)
  }
}
```

### &nbsp;&nbsp; Ride Model

```javascript
{
  user: ObjectId (ref: User),
  captain: ObjectId (ref: Captain),
  pickup: String (required),
  destination: String (required),
  fare: Number (required),
  status: String (pending/accepted/ongoing/completed/cancelled),
  duration: Number (seconds),
  distance: Number (meters),
  otp: String (6-digit verification),
  paymentId: String,
  orderId: String,
  signature: String
}
```

## API Endpoints

### &nbsp;&nbsp; User Endpoints

- `POST /users/register` - User registration
- `POST /users/login` - User authentication
- `GET /users/profile` - Get user profile
- `GET /users/logout` - User logout

### &nbsp;&nbsp; Captain Endpoints

- `POST /captains/register` - Captain registration
- `POST /captains/login` - Captain authentication
- `GET /captains/profile` - Get captain profile
- `GET /captains/logout` - Captain logout

### &nbsp;&nbsp; Ride Endpoints

- `POST /rides/create` - Create new ride request
- `GET /rides/get-fare` - Calculate ride fare
- `POST /rides/confirm` - Captain confirms ride
- `GET /rides/start-ride` - Start ride with OTP
- `POST /rides/end-ride` - Complete ride

### &nbsp;&nbsp; Maps Endpoints

- `GET /maps/get-coordinates` - Get location coordinates
- `GET /maps/get-distance-time` - Calculate distance and time
- `GET /maps/get-suggestions` - Location autocomplete

## Real-time Features

### &nbsp;&nbsp; Socket.io Events

- **User Events**: `join`, `ride-request`, `ride-cancelled`
- **Captain Events**: `join`, `update-location-captain`, `ride-accepted`
- **System Events**: `ride-confirmed`, `ride-started`, `ride-ended`

### &nbsp;&nbsp; Live Tracking

- Real-time location updates for captains
- Live ride tracking for users
- Automatic driver-user matching based on proximity
- Dynamic ETA calculations

## UI/UX Features

### &nbsp;&nbsp; Responsive Design

- Mobile-first approach with Tailwind CSS
- Optimized for all screen sizes
- Touch-friendly interface elements
- Fast loading with optimized assets

### &nbsp;&nbsp; Interactive Components

- Smooth animations with GSAP
- Real-time map integration
- Dynamic fare calculator
- Location search with autocomplete
- Loading states and error handling

## Deployment

### &nbsp; Environment Variables

&nbsp;&nbsp; **Backend (.env)**

```env
MONGODB_URI=mongodb://localhost:27017/urbik
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
PORT=4000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

&nbsp;&nbsp; **Frontend (.env)**

```env
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### &nbsp; Production Build

```bash
# Backend
cd Backend
npm start

# Frontend
cd Frontend
npm run build
npm run preview
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project has no license file for details.

## Acknowledgments

- Google Maps API for location services
- Socket.io for real-time communication
- MongoDB for flexible data storage
- React and Node.js communities for excellent documentation

## Support

Regarding any query, email shivamswaroop89@gmail.com or connect me on linkedIn https://www.linkedin.com/in/shivam-swaroop-60083017a or X https://x.com/shivamswaroop89.

---

**Built with ❤️ by Shivam Swaroop**
