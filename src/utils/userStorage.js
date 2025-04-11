/**
 * Utility functions for handling user data storage
 */

// Storage keys
const USER_DATA_KEY = 'userData';
const CURRENT_USER_KEY = 'currentUser';

/**
 * Get all users from localStorage
 * @returns {Array} Array of user objects
 */
export const getUsers = () => {
  try {
    const userData = localStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : [];
  } catch (error) {
    console.error('Error loading user data:', error);
    return [];
  }
};

/**
 * Save a user to localStorage
 * If a user with the same email or idNumber exists, it will be replaced
 * @param {Object} user User data to save
 * @returns {Object|boolean} User object if successful, false otherwise
 */
export const saveUser = (user) => {
  try {
    // Ensure we have required identifiers
    if (!user.email || !user.idNumber) {
      console.error('User must have both email and idNumber to be saved');
      return false;
    }
    
    // Get existing users
    const users = getUsers();
    
    // Find if user already exists by email or idNumber
    const existingEmailIndex = users.findIndex(u => u.email === user.email);
    const existingIdIndex = users.findIndex(u => u.idNumber === user.idNumber);
    
    // If found by either identifier, replace that user
    if (existingEmailIndex >= 0) {
      users[existingEmailIndex] = user;
    } else if (existingIdIndex >= 0) {
      users[existingIdIndex] = user;
    } else {
      // Add new user
      users.push(user);
    }
    
    // Save back to localStorage
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(users));
    return user;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

/**
 * Login a user by email/idNumber and password
 * @param {string} identifier Email or ID number
 * @param {string} password User password
 * @param {string} userType User type (student, parent, advisor)
 * @returns {Object|null} User data if login successful, null otherwise
 */
export const loginUser = (identifier, password, userType) => {
  try {
    const users = getUsers();
    
    // Find user by email or idNumber, password, and matching userType
    const user = users.find(
      u => (u.email === identifier || u.idNumber === identifier) && 
           u.password === password && 
           (!userType || u.userType === userType)
    );
    
    if (user) {
      // Store current user in localStorage for persistent session
      setCurrentUser(user);
    }
    
    return user || null;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

/**
 * Set the current logged-in user
 * @param {Object} user User data
 */
export const setCurrentUser = (user) => {
  try {
    // Don't store the password in the session
    const sessionUser = { ...user };
    delete sessionUser.password;
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  } catch (error) {
    console.error('Error setting current user:', error);
  }
};

/**
 * Get the current logged-in user
 * @returns {Object|null} Current user data or null if not logged in
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Logout the current user
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

/**
 * Check if a user is currently logged in
 * @returns {boolean} True if logged in, false otherwise
 */
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};

/**
 * Exports users data as a downloadable JSON file
 */
export const exportUsersToFile = () => {
  try {
    const users = getUsers();
    const dataStr = JSON.stringify(users, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'users-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } catch (error) {
    console.error('Error exporting user data:', error);
  }
};