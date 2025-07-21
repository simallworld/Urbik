# Urbik - Ride-Sharing Application## Project Structure

```
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   │   ├── CaptainContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── pages/
│   │   │   ├── CaptainHome.jsx
│   │   │   ├── CaptainLogin.jsx
│   │   │   ├── CaptainLogout.jsx
│   │   │   ├── CaptainProtectedRoute.jsx
│   │   │   ├── CaptainSignup.jsx
│   │   │   ├── ForBidden.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── SplashScreen.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   ├── UserLogout.jsx
│   │   │   ├── UserProtectedRoute.jsx
│   │   │   └── UserSignup.jsx
│   │   └── App.jsx
│
├── Backend/
│   ├── controllers/
│   │   ├── captain.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── blacklistToken.model.js
│   │   ├── captain.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── captain.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── captain.service.js
│   │   └── user.service.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   └── app.js
```

## Features

### User Features

- User registration and authentication
- Protected routes for authenticated users
- User profile management
- Secure logout with token invalidation

### Captain Features

- Captain registration with vehicle details
- Vehicle information management
- Real-time location tracking capability
- Protected captain-specific routes
- Secure authentication and session management

## Tech Stack

### Frontend

- React with Vite
- React Router for navigation
- Context API for state management
- Axios for API communication
- TailwindCSS for styling

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Express Validator for input validation

## Authentication

The application implements a robust authentication system:

### JWT-Based Authentication

- Tokens stored in localStorage and cookies
- Protected routes with middleware verification
- Token blacklisting for secure logout
- Separate authentication for users and captains

### Security Features

- Password hashing using bcrypt
- Token-based session management
- Input validation and sanitization
- Protected API endpoints

## Getting Started

### Frontend Setup

1. Navigate to Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```
   Create .env file with:
   - MONGODB_URI
   - JWT_SECRET
   - PORT
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Endpoints

- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile
- `GET /users/logout` - User logout

### Captain Endpoints

- `POST /captains/register` - Register new captain
- `POST /captains/login` - Captain login
- `GET /captains/profile` - Get captain profile
- `GET /captains/logout` - Captain logout

## Additional Features

### Protected Routes

The application implements protected routes for both users and captains:

- `UserProtectedRoute` - Ensures only authenticated users can access certain pages
- `CaptainProtectedRoute` - Ensures only authenticated captains can access captain-specific pages

### Data Models

#### Captain Model

```javascript
{
  fullName: {
    firstName: String,
    lastName: String
  },
  email: String,
  password: String,
  vehicle: {
    color: String,
    plate: String,
    capacity: Number,
    vehicleType: String
  },
  status: String,
  location: {
    lat: Number,
    lng: Number
  }
}
```

#### User Model

```javascript
{
  fullName: {
    firstName: String,
    lastName: String
  },
  email: String,
  password: String
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Requesterview

Urbik is a modern ride-sharing application built with a full-stack architecture using React for the frontend and Node.js/Express for the backend. The application supports two types of users: regular passengers and ride captains (drivers).

## Table of Contents

1. [Architecture](#architecture)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Frontend](#frontend)
6. [Backend](#backend)
7. [Authentication](#authentication)
8. [Getting Started](#getting-started)

## Architecture

The project follows a clean architecture pattern with clear separation of concerns:

### Frontend Architecture

- **Components Layer**: Reusable UI components
- **Pages Layer**: Main route components
- **Context Layer**: Global state management
- **Services Layer**: API communication

### Backend Architecture

- **Routes Layer**: API endpoint definitions
- **Controllers Layer**: Request handling and response formatting
- **Services Layer**: Business logic implementation
- **Models Layer**: Database schema definitions
- **Middlewares Layer**: Request processing and authentication

A full-fledged, fullstack ride-booking application powered by MongoDB, Express, React, and Node.js. It supports secure JWT authentication, dynamic ride listings, payment gateway integration, and real-time ride tracking with WebSockets.

🔐 Auth | 📍 Live Ride Status | 💳 Razorpay | 📱 Fully Responsive

### 🚀 3. Startup Elevator Pitch Style

🔥 PedalGo – Ride The City, Smarter.

Say goodbye to traffic jams and hello to clean, efficient bike rides. PedalGo is a smart bike ride booking platform made for modern city commuters. From seamless UIs to real-time tracking and payment, it’s all here.

Built with MERN, designed with love, optimized for hustle.

### 🎯 4. Minimalist & Bold

🚲 BikeBooker – Simple. Fast. Ride.

A modern fullstack app for booking, tracking, and riding bikes across cities. Clean UI. Real-time tracking. Payments integrated. Just book and go.

### 🧪 5. Experimental / Tech Showcase

🧬 UrbanRideX – A MERN-powered experiment in micro-mobility

This project is an exploration into urban transportation UX with technologies like React, Node.js, MongoDB, and Razorpay. Real-time interactions via Socket.io. Scalable APIs. Optimized frontend. Clean code architecture.

Fork it, test it, and let’s reinvent the wheel. 🛞

### 🔧 6. With Feature Highlights (Markdown Supported on GitHub)

🚴 BikeBuddy – Your City. Your Ride.
Tech Stack: MERN | Socket.io | JWT | Razorpay

Features:

🔐 Secure Login & Registration
📍 Real-time Ride Tracking
💸 Razorpay Payment Gateway
🧭 Live Map Integration (Leaflet/Google Maps)
📅 Schedule & Book Rides
👤 Profile Dashboard
📱 Responsive UI with Tailwind CSS
