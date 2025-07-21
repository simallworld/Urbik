import React, { createContext, useState } from 'react';

// Create a context for managing user data across the application
export const UserDataContext = createContext();

/**
 * UserContext Component
 * Provides user data and setter function to all child components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the context
 */
const UserContext = ({ children }) => {
    // Initialize user state with default empty values
    const [user, setUser] = useState({
        email: "",
        fullname: {
            firstname: "",
            lastname: ""
        }
    });

    return (
        // Remove unnecessary div wrapper since Provider can be the root element
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;