import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser, loginUser, logoutUser } from '../utils/userStorage';

// Default context value
const defaultContextValue = {
  currentUser: null,
  loading: false,
  login: () => Promise.resolve(null),
  logout: () => {},
  isAuthenticated: false
};

// Create the auth context
const AuthContext = createContext(defaultContextValue);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.warn("useAuth must be used within an AuthProvider");
    return defaultContextValue;
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for logged in user on mount
  useEffect(() => {
    try {
      const user = getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      console.error("Error loading user from storage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (identifier, password, userType) => {
    try {
      const user = loginUser(identifier, password, userType);
      if (user) {
        setCurrentUser(user);
        return user;
      }
      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  // Logout function
  const logout = () => {
    try {
      logoutUser();
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Auth context value
  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;