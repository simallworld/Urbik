# Urbik Frontend

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.10-cyan.svg)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-black.svg)](https://socket.io/)

A modern, responsive React frontend for the Urbik ride-sharing platform, featuring real-time communication, Google Maps integration, and seamless user experience for both passengers and drivers.

## Features

### &nbsp; User Experience

- **Intuitive Interface**: Clean, modern design with smooth animations
- **Real-time Updates**: Live ride tracking and status updates
- **Location Services**: Google Maps integration with autocomplete
- **Responsive Design**: Optimized for all devices and screen sizes
- **Fast Performance**: Vite-powered development and optimized builds

### &nbsp; Authentication System

- **Dual Authentication**: Separate flows for users and captains
- **Protected Routes**: Secure access control for authenticated users
- **Session Management**: Persistent login with JWT tokens
- **Secure Logout**: Complete session cleanup and token invalidation

### &nbsp; Ride Management

- **Ride Booking**: Easy-to-use ride booking interface
- **Vehicle Selection**: Choose from multiple vehicle types
- **Fare Estimation**: Real-time fare calculation
- **Live Tracking**: Track rides in real-time with Google Maps
- **OTP Verification**: Secure ride start verification

## Architecture

```
Frontend/
├── public/                   # Static Assets
│   └── vite.svg
├── src/
│   ├── assets/              # Images and Icons
│   │   ├── favIcon.png
│   │   ├── favIcon1.png
│   │   ├── favIcon2.png
│   │   ├── favIcon3.png
│   │   └── react.svg
│   ├── components/          # Reusable UI Components
│   │   ├── CaptainDetails.jsx
│   │   ├── ConfirmRide.jsx
│   │   ├── ConfirmRidePopUp.jsx
│   │   ├── FinishRide.jsx
│   │   ├── LiveTracking.jsx
│   │   ├── LocationSearchPanel.jsx
│   │   ├── LookingForDriver.jsx
│   │   ├── RidePopUp.jsx
│   │   ├── SocketExample.jsx
│   │   ├── VehiclePanel.jsx
│   │   └── WaitingForDriver.jsx
│   ├── context/             # Global State Management
│   │   ├── CaptainContext.jsx
│   │   ├── SocketContext.jsx
│   │   └── UserContext.jsx
│   ├── pages/               # Route Components
│   │   ├── CaptainHome.jsx
│   │   ├── CaptainLogin.jsx
│   │   ├── CaptainLogout.jsx
│   │   ├── CaptainProtectedRoute.jsx
│   │   ├── CaptainRiding.jsx
│   │   ├── CaptainSignup.jsx
│   │   ├── ForBidden.jsx
│   │   ├── Home.jsx
│   │   ├── Riding.jsx
│   │   ├── SplashScreen.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserLogout.jsx
│   │   ├── UserProtectedRoute.jsx
│   │   └── UserSignup.jsx
│   ├── App.jsx              # Main Application Component
│   ├── App.css              # Global Styles
│   ├── index.css            # Base Styles
│   └── main.jsx             # Application Entry Point
├── eslint.config.js         # ESLint Configuration
├── index.html               # HTML Template
├── package.json             # Dependencies and Scripts
├── tailwind.config.js       # Tailwind CSS Configuration
└── vite.config.js           # Vite Configuration
```

## Tech Stack

### &nbsp; Core Technologies

- **React 19.1.0** - Modern UI library with latest features
- **Vite 6.3.5** - Fast build tool and development server
- **JavaScript (ES6+)** - Modern JavaScript features

### &nbsp; Styling & UI

- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **Remixicon 4.6.0** - Beautiful icon library
- **GSAP 3.13.0** - High-performance animations
- **@gsap/react 2.1.2** - React integration for GSAP

### &nbsp; Routing & Navigation

- **React Router DOM 7.6.2** - Client-side routing
- **Protected Routes** - Authentication-based route protection

### &nbsp; State Management

- **React Context API** - Global state management
- **useState & useEffect** - Local component state
- **Custom Hooks** - Reusable stateful logic

### &nbsp; Real-time Communication

- **Socket.io Client 4.8.1** - Real-time bidirectional communication
- **Event-driven Architecture** - Reactive updates

### &nbsp; Maps & Location

- **@react-google-maps/api 2.20.7** - Google Maps React integration
- **Geolocation API** - Browser location services
- **Location Autocomplete** - Address suggestions

### &nbsp; HTTP Client

- **Axios 1.11.0** - Promise-based HTTP client
- **API Integration** - RESTful API communication
- **Request/Response Interceptors** - Centralized error handling

### &nbsp; Development Tools

- **ESLint** - Code linting and quality
- **Vite Plugin React** - React support for Vite
- **Hot Module Replacement** - Fast development experience

## Quick Start

### &nbsp; Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see Backend README)

### &nbsp; Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the Frontend directory:

   ```env
   # Backend API URL
   VITE_BASE_URL=http://localhost:4000

   # Google Maps API Key (optional, for enhanced maps features)
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Access the application**
   Open `http://localhost:5173` in your browser

### &nbsp; Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Application Flow

### &nbsp; User Journey

```
SplashScreen → UserSignup/UserLogin → Home →
LocationSearch → VehicleSelection → ConfirmRide →
LookingForDriver → WaitingForDriver → Riding →
RideComplete
```

### &nbsp; Captain Journey

```
SplashScreen → CaptainSignup/CaptainLogin → CaptainHome →
RideRequest → ConfirmRidePopUp → CaptainRiding →
FinishRide → CaptainHome
```

## Component Documentation

### Authentication Components

#### &nbsp; UserProtectedRoute

```jsx
// Protects routes that require user authentication
<UserProtectedRoute>
  <Home />
</UserProtectedRoute>
```

**Features:**

- JWT token validation
- Automatic redirect to login
- Loading states
- Error handling

#### &nbsp; CaptainProtectedRoute

```jsx
// Protects routes that require captain authentication
<CaptainProtectedRoute>
  <CaptainHome />
</CaptainProtectedRoute>
```

**Features:**

- Captain-specific authentication
- Vehicle verification
- Status checking
- Route protection

### Map Components

#### &nbsp; LiveTracking

```jsx
<LiveTracking />
```

**Features:**

- Real-time Google Maps integration
- Live location tracking
- Route visualization
- Custom markers and styling
- Geolocation services

**Props:**

- `pickup`: Pickup location coordinates
- `destination`: Destination coordinates
- `currentLocation`: Live tracking position

#### &nbsp; LocationSearchPanel

```jsx
<LocationSearchPanel
  suggestions={suggestions}
  setPanelOpen={setPanelOpen}
  setPickup={setPickup}
  setDestination={setDestination}
  activeField={activeField}
/>
```

**Features:**

- Google Places autocomplete
- Location suggestions
- Address validation
- Recent searches
- Keyboard navigation

### Ride Components

#### &nbsp; VehiclePanel

```jsx
<VehiclePanel
  selectVehicle={selectVehicle}
  fare={fare}
  setVehiclePanel={setVehiclePanel}
  setConfirmRidePanel={setConfirmRidePanel}
/>
```

**Features:**

- Vehicle type selection (Car, Bike, Auto, E-Rickshaw)
- Dynamic fare display
- Capacity information
- ETA estimation

#### &nbsp; ConfirmRide

```jsx
<ConfirmRide
  createRide={createRide}
  pickup={pickup}
  destination={destination}
  fare={fare}
  vehicleType={vehicleType}
  setConfirmRidePanel={setConfirmRidePanel}
  setVehicleFound={setVehicleFound}
/>
```

**Features:**

- Ride details confirmation
- Fare breakdown
- Payment method selection
- Booking confirmation

#### &nbsp; LookingForDriver

```jsx
<LookingForDriver
  createRide={createRide}
  pickup={pickup}
  destination={destination}
  fare={fare}
  vehicleType={vehicleType}
  setVehicleFound={setVehicleFound}
/>
```

**Features:**

- Driver search animation
- Cancel ride option
- Real-time updates
- Loading indicators

#### &nbsp; WaitingForDriver

```jsx
<WaitingForDriver
  ride={ride}
  setVehicleFound={setVehicleFound}
  setWaitingForDriver={setWaitingForDriver}
  waitingForDriver={waitingForDriver}
/>
```

**Features:**

- Driver details display
- ETA updates
- Contact driver option
- Ride tracking

### Captain Components

#### &nbsp; CaptainDetails

```jsx
<CaptainDetails />
```

**Features:**

- Captain profile information
- Vehicle details
- Earnings summary
- Status toggle

#### &nbsp; RidePopUp

```jsx
<RidePopUp
  ride={ride}
  setRidePopupPanel={setRidePopupPanel}
  setConfirmRidePopupPanel={setConfirmRidePopupPanel}
  confirmRide={confirmRide}
/>
```

**Features:**

- Ride request details
- Accept/decline options
- User information
- Route preview

#### &nbsp; ConfirmRidePopUp

```jsx
<ConfirmRidePopUp
  ride={ride}
  setConfirmRidePopupPanel={setConfirmRidePopupPanel}
  setRidePopupPanel={setRidePopupPanel}
/>
```

**Features:**

- OTP input for ride start
- User verification
- Navigation to pickup
- Ride status updates

#### &nbsp; FinishRide

```jsx
<FinishRide ride={ride} setFinishRidePanel={setFinishRidePanel} />
```

**Features:**

- Ride completion
- Payment processing
- Earnings calculation
- Rating system

## Context Management

### &nbsp; UserContext

```jsx
const { user, setUser, loading, setLoading } = useContext(UserContext);
```

**State Management:**

- User authentication state
- Profile information
- Loading states
- Error handling

**Methods:**

- `login(userData)` - Set user data after login
- `logout()` - Clear user data and redirect
- `updateProfile(data)` - Update user information

### &nbsp; CaptainContext

```jsx
const { captain, setCaptain, loading, setLoading } = useContext(CaptainContext);
```

**State Management:**

- Captain authentication state
- Vehicle information
- Status management
- Earnings tracking

**Methods:**

- `login(captainData)` - Set captain data after login
- `logout()` - Clear captain data and redirect
- `updateStatus(status)` - Toggle active/inactive status
- `updateLocation(coordinates)` - Update current location

### &nbsp; SocketContext

```jsx
const { socket, sendMessage, isConnected } = useContext(SocketContext);
```

**Real-time Features:**

- Socket connection management
- Event emission and listening
- Connection status tracking
- Automatic reconnection

**Methods:**

- `sendMessage(event, data)` - Emit socket events
- `onMessage(event, callback)` - Listen for events
- `joinRoom(userData)` - Join user/captain room

## Styling & Design

### &nbsp; Tailwind CSS Configuration

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#ffffff",
        accent: "#10b981",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
};
```

### &nbsp; Design System

- **Colors**: Consistent color palette with primary, secondary, and accent colors
- **Typography**: Modern font stack with proper hierarchy
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Components**: Reusable component patterns
- **Responsive**: Mobile-first responsive design

### &nbsp; Animation with GSAP

```jsx
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Smooth animations for UI elements
useGSAP(() => {
  gsap.from(".panel", {
    y: 100,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
});
```

## Real-time Features

### &nbsp; Socket.io Integration

```jsx
// Socket connection and event handling
useEffect(() => {
  socket.emit("join", {
    userId: user._id,
    userType: "user",
  });

  socket.on("ride-confirmed", (data) => {
    setRide(data.ride);
    setWaitingForDriver(true);
  });

  return () => {
    socket.off("ride-confirmed");
  };
}, []);
```

### &nbsp; Real-time Events

- **ride-confirmed** - Ride accepted by captain
- **ride-started** - Ride started with OTP verification
- **ride-ended** - Ride completed
- **location-updated** - Live location tracking
- **driver-arrived** - Driver reached pickup location

## Responsive Design

### &nbsp; Breakpoints

```css
/* Mobile First Approach */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */
```

### &nbsp; Mobile Optimization

- Touch-friendly interface elements
- Optimized for mobile browsers
- Fast loading with code splitting
- Offline capability (PWA ready)
- Native-like experience

## Development

### &nbsp; Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### &nbsp; Development Tools

- **Vite Dev Server** - Fast development with HMR
- **React DevTools** - Component debugging
- **ESLint** - Code quality and consistency
- **Browser DevTools** - Network and performance monitoring

### &nbsp; Code Organization

```
src/
├── components/      # Reusable UI components
├── pages/          # Route-level components
├── context/        # Global state management
├── assets/         # Static assets
├── utils/          # Utility functions
└── hooks/          # Custom React hooks
```

## Testing

### &nbsp; Manual Testing Checklist

- [ ] User registration and login
- [ ] Captain registration and login
- [ ] Location search and selection
- [ ] Vehicle selection and fare calculation
- [ ] Ride booking and confirmation
- [ ] Real-time tracking
- [ ] OTP verification
- [ ] Ride completion
- [ ] Logout functionality

### &nbsp; Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

### &nbsp; Build Optimization

- **Code Splitting** - Lazy loading of routes
- **Tree Shaking** - Remove unused code
- **Asset Optimization** - Compressed images and fonts
- **Bundle Analysis** - Monitor bundle size

### &nbsp; Runtime Optimization

- **React.memo** - Prevent unnecessary re-renders
- **useMemo & useCallback** - Optimize expensive calculations
- **Virtual Scrolling** - Handle large lists efficiently
- **Image Lazy Loading** - Load images on demand

### &nbsp; Network Optimization

- **API Caching** - Cache API responses
- **Request Debouncing** - Optimize search requests
- **Compression** - Gzip compression for assets
- **CDN** - Serve static assets from CDN

## Security

### &nbsp; Client-side Security

- **JWT Token Handling** - Secure token storage and transmission
- **Input Validation** - Client-side validation for user inputs
- **XSS Prevention** - Sanitize user-generated content
- **HTTPS Only** - Enforce secure connections

### &nbsp; Authentication Security

- **Token Expiration** - Automatic token refresh
- **Secure Storage** - HttpOnly cookies for sensitive data
- **Route Protection** - Prevent unauthorized access
- **Session Management** - Proper logout and cleanup

## Deployment

### &nbsp; Environment Configuration

```env
# Production Environment
VITE_BASE_URL=https://api.urbik.com
VITE_GOOGLE_MAPS_API_KEY=your_production_google_maps_key
VITE_SOCKET_URL=https://api.urbik.com
```

### &nbsp; Build Process

```bash
# Install dependencies
npm ci

# Build for production
npm run build

# The dist/ folder contains the production build
```

### &nbsp; Deployment Platforms

- **Vercel** - Recommended for React apps
- **Netlify** - Easy deployment with CI/CD
- **AWS S3 + CloudFront** - Scalable hosting
- **Firebase Hosting** - Google's hosting platform

### &nbsp; Production Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] Google Maps API key configured
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] SSL certificate configured

## Monitoring & Analytics

### &nbsp; Performance Monitoring

- **Core Web Vitals** - Monitor loading performance
- **Error Tracking** - Track JavaScript errors
- **User Analytics** - Monitor user behavior
- **API Performance** - Track API response times

### &nbsp; Recommended Tools

- **Google Analytics** - User behavior tracking
- **Sentry** - Error monitoring and performance
- **Lighthouse** - Performance auditing
- **Web Vitals** - Core web vitals monitoring

## Troubleshooting

### &nbsp; Common Issues

#### &nbsp;&nbsp; Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

#### &nbsp;&nbsp; Socket Connection Issues

```javascript
// Check socket connection status
console.log("Socket connected:", socket.connected);

// Verify backend URL
console.log("Backend URL:", import.meta.env.VITE_BASE_URL);
```

#### &nbsp;&nbsp; Map Loading Issues

```javascript
// Verify Google Maps API key
console.log("Maps API Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

// Check browser geolocation permissions
navigator.geolocation.getCurrentPosition(
  (position) => console.log("Location:", position),
  (error) => console.error("Location error:", error)
);
```

### &nbsp;&nbsp; Debug Mode

```javascript
// Enable debug logging
localStorage.setItem("debug", "urbik:*");

// View all socket events
socket.onAny((event, ...args) => {
  console.log("Socket event:", event, args);
});
```

## Support

For frontend development support:

- **Documentation**: [Frontend Docs](https://docs.urbik.com/frontend)
- **Issues**: [GitHub Issues](https://github.com/urbik/frontend/issues)
- **Discord**: [Developer Community](https://discord.gg/urbik-dev)
- **Email**: frontend-support@urbik.com

## Contributing

### &nbsp; Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### &nbsp; Code Style

- Use ESLint configuration
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

### &nbsp Pull Request Guidelines

- Describe changes clearly
- Include screenshots for UI changes
- Test on multiple devices
- Update documentation if needed

---

**Built with ❤️ using React and modern web technologies**
