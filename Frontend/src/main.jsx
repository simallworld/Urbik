import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx';
import CaptainContext from './context/CaptainContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CaptainContext>
      <UserContext>
        <StrictMode>
          <App />
        </StrictMode>
      </UserContext>
    </CaptainContext>
  </BrowserRouter>,
)