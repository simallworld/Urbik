# URBIK Frontend documentation

This is the frontend part of the application for Urbik platform, built with React and Vite. The application provides separate interfaces for users and captains, implementing a secure authentication system and protected routes.

## Project Structure

```
Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   ├── context/
│   │   ├── CaptainContext.jsx
│   │   └── UserContext.jsx
│   ├── pages/
│   │   ├── CaptainHome.jsx
│   │   ├── CaptainLogin.jsx
│   │   ├── CaptainLogout.jsx
│   │   ├── CaptainProtectedRoute.jsx
│   │   ├── CaptainSignup.jsx
│   │   ├── ForBidden.jsx
│   │   ├── Home.jsx
│   │   ├── SplashScreen.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserLogout.jsx
│   │   ├── UserProtectedRoute.jsx
│   │   └── UserSignup.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
```

## Architecture Overview

### 1. Context Management

The application uses React Context API for state management with two main contexts:

- **UserContext**: Manages user authentication state and data
- **CaptainContext**: Handles captain-specific authentication and state management

### 2. Authentication System

The application implements a dual authentication system:

- **User Authentication**: Complete flow for user registration, login, and logout
- **Captain Authentication**: Separate authentication flow for captains with specific permissions

### 3. Protected Routes

Security is implemented using protected routes:

- **UserProtectedRoute**: Ensures only authenticated users can access user-specific pages
- **CaptainProtectedRoute**: Restricts access to captain-specific features

### 4. Key Pages

#### User Flow

- **UserSignup**: New user registration
- **UserLogin**: User authentication
- **UserLogout**: Session termination
- **UserProtectedRoute**: Route protection for user pages

#### Captain Flow

- **CaptainSignup**: Captain registration
- **CaptainLogin**: Captain authentication
- **CaptainHome**: Captain dashboard
- **CaptainLogout**: Captain session management
- **CaptainProtectedRoute**: Route protection for captain pages

#### Common Pages

- **Home**: Landing page
- **SplashScreen**: Initial loading screen
- **ForBidden**: Access denied page

## Technical Stack

- **React**: Frontend library
- **Vite**: Build tool and development server
- **React Router**: Navigation and routing
- **Axios**: HTTP client for API requests
- **Context API**: State management
- **ESLint**: Code quality and consistency

## Environment Configuration

The application uses environment variables for configuration:

- `VITE_BASE_URL`: API base URL for backend communication

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with required variables

3. Start development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Security Features

- Protected routes implementation
- Token-based authentication
- Session management
- Route guards for unauthorized access
- Secure context state management

## API Integration

The frontend communicates with the backend through RESTful API endpoints:

- User authentication endpoints
- Captain management endpoints
- Protected resource endpoints

## State Management

The application uses React Context API for state management:

- Centralized authentication state
- User/Captain data management
- Loading states
- Error handling
