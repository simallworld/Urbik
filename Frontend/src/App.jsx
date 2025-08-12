// Import necessary components and routes from react-router
import { Routes, Route } from "react-router-dom";
// Import page components for different routes
import SplashScreen from "./pages/SplashScreen";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import ForBidden from "./pages/ForBidden";
import './App.css';
// Import protected route components and logout handlers
import UserProtectedRoute from "./pages/UserProtectedRoute";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedRoute from "./pages/CaptainProtectedRoute";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";

// Main App component for routing configuration
function App() {

  return (
    <>
      <Routes>
        {/* Public routes accessible to all users */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />

        {/* Protected routes for regular users */}
        <Route path="/home" element={
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
        } />

        {/* Forbidden route for undefined paths */}
        <Route path="/*" element={<ForBidden />} />

        {/* Protected logout route for user-riding */}
        <Route path="/riding" element={
          <UserProtectedRoute>
            <Riding />
          </UserProtectedRoute>
        } />

        {/* Protected logout route for users */}
        <Route path="/user/logout" element={
          <UserProtectedRoute>
            <UserLogout />
          </UserProtectedRoute>
        } />

        {/* Protected routes for captains */}
        <Route path="/captain-home" element={
          <CaptainProtectedRoute>
            <CaptainHome />
          </CaptainProtectedRoute>} />

        {/* Protected routes for captain-riding */}
        <Route path="/captain-riding" element={
          <CaptainProtectedRoute>
            <CaptainRiding />
          </CaptainProtectedRoute>} />

        {/* Protected logout route for captains */}
        <Route path="/captain/logout" element={
          <CaptainProtectedRoute>
            <CaptainLogout />
          </CaptainProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
