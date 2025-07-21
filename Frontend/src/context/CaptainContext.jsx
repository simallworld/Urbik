import { createContext, useState } from 'react';

// Create the context
export const CaptainDataContext = createContext();

// export const useContext = () => {
//     const context = useContext(CaptainContext);
//     if (!context) {
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// }

// Create the context provider component
export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to update captain data
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    // Function to clear captain data
    const clearCaptain = () => {
        setCaptain(null);
    };

    // Value object to be provided to consumers
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