// Import necessary dependencies from React and React DOM
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'  // Import global styles
import App from './App.jsx'  // Import the main App component
import UserContext from './context/UserContext.jsx';  // Import context providers for user and captain authentication
import CaptainContext from './context/CaptainContext.jsx';
import SocketProvider from './context/SocketContext.jsx';  // Import Socket.IO context provider

// Create and render the React application
createRoot(document.getElementById('root')).render(
  <BrowserRouter>       {/* BrowserRouter for routing functionality */}
    <SocketProvider>    {/* SocketProvider wrapper for Socket.IO connection management */}
      <CaptainContext>  {/* CaptainContext wrapper for captain-related state management */}
        <UserContext>   {/* UserContext wrapper for user-related state management */}
          <StrictMode>  {/* StrictMode for highlighting potential problems in application */}
            <App />     {/* Main App component */}
          </StrictMode>
        </UserContext>
      </CaptainContext>
    </SocketProvider>
  </BrowserRouter>,
)