import { Routes, Route } from "react-router";
import SplashScreen from "./pages/SplashScreen";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Home from "./pages/Home";
import ForBidden from "./pages/ForBidden";
import './App.css';
import UserProtectedRoute from "./pages/UserProtectedRoute";
import UserLogout from "./pages/UserLogout";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/home" element={
          <UserProtectedRoute>
            <Home />
          </UserProtectedRoute>
        } />
        <Route path="/*" element={<ForBidden />} />
        <Route path="/user/logout" element={<UserProtectedRoute>
          <UserLogout />
        </UserProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
