// Import necessary dependencies from React and React DOM
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'  // Import global styles
import App from './App.jsx'  // Import the main App component
import UserContext from './context/UserContext.jsx';  // Import context providers for user and captain authentication
import CaptainContext from './context/CaptainContext.jsx';

// Create and render the React application
createRoot(document.getElementById('root')).render(
  <BrowserRouter>     {/* CaptainContext wrapper for captain-related state management */}
    <CaptainContext>  {/* UserContext wrapper for user-related state management */}
      <UserContext>   {/* StrictMode for highlighting potential problems in application */}
        <StrictMode>  {/* Main App component */}
          <App />
        </StrictMode>
      </UserContext>
    </CaptainContext>
  </BrowserRouter>,
)