// Global cache to store authentication state Pang Rolebased
const authCache = {
  isAuthenticated: false,
  role: null,
  lastChecked: 0
};

// Cache expiry time (5 minutes in milliseconds)
export const CACHE_EXPIRY = 5 * 60 * 1000;

// Function to reset authentication cache
export const resetAuthCache = () => {
  authCache.isAuthenticated = false;
  authCache.role = null;
  authCache.lastChecked = 0;
};

// Get the current auth cache
export const getAuthCache = () => authCache; 