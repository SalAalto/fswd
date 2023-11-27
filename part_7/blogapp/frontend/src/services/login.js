// Import axios to perform HTTP requests
import axios from 'axios';

// Define the base URL for the login API
const baseUrl = '/api/login';

/**
 * Authenticate a user with the given credentials
 * @param {Object} credentials - The login information for the user
 * @returns {Promise<Object>} - A promise that resolves to the authentication data
 */
const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

// Export the login service containing the login function
export default { login };
