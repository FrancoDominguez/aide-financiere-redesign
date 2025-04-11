/**
 * Utility functions for handling user data storage
 */

// File path for the users data
const USER_DATA_KEY = 'userData';

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
 * If a user with the same email exists, it will be replaced
 * @param {Object} user User data to save
 * @returns {boolean} Success status
 */
export const saveUser = (user) => {
  try {
    // Add email field if not present (using ID or other field)
    if (!user.email && user.id) {
      user.email = user.id;
    }
    
    // Ensure we have an identifier
    if (!user.email) {
      console.error('User must have an email to be saved');
      return false;
    }
    
    // Get existing users
    const users = getUsers();
    
    // Find if user already exists
    const existingIndex = users.findIndex(u => u.email === user.email);
    
    if (existingIndex >= 0) {
      // Replace existing user
      users[existingIndex] = user;
    } else {
      // Add new user
      users.push(user);
    }
    
    // Save back to localStorage
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
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