import { createContext, useState, useContext } from 'react';

/**
 * Context for managing captain-related data throughout the application
 * This context provides state and functions for captain authentication and data management
 */
export const CaptainDataContext = createContext();

// export const useContext = () => {
//     const context = useContext(CaptainContext);
//     if (!context) {
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// }

/**
 * CaptainContext Provider Component
 * Manages the state for captain authentication and related data
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
export const CaptainContext = ({ children }) => {
    // State for storing captain data (null when not logged in)
    const [captain, setCaptain] = useState(null);
    // State for tracking loading states during async operations
    const [isLoading, setIsLoading] = useState(false);
    // State for storing error messages
    const [error, setError] = useState(null);

    /**
     * Updates the captain data in the context
     * @param {Object} captainData - The captain's information to be stored
     */
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    /**
     * Clears the captain data from the context
     * Typically used during logout
     */
    const clearCaptain = () => {
        setCaptain(null);
        setError(null); // Clear any existing errors when logging out
    };

    // Context value object containing all state and functions
    // that will be available to consuming components
    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
        clearCaptain
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;