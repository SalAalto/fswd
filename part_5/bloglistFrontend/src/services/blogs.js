// Import axios for HTTP requests
import axios from 'axios';

// Base URL for blog-related API endpoints
const baseUrl = 'http://localhost:3003/api/blogs';

// Token for authentication, to be included in the Authorization header
let token = null;

/**
 * Set the token to be used in HTTP Authorization header
 * @param {string} newToken - The new token to be used for subsequent requests
 */
const setToken = newToken => {
    token = `bearer ${newToken}`;
};

/**
 * Helper function to get the authorization config for HTTP requests
 * @returns config object with Authorization header
 */
const getAuthConfig = () => ({
    headers: { Authorization: token },
});

/**
 * Fetch all blogs from the backend
 * @returns {Promise} - A promise that resolves to the list of blogs
 */
const getAll = async () => {
    const response = await axios.get(baseUrl, getAuthConfig());
    return response.data;
};

/**
 * Create a new blog entry
 * @param {Object} newObject - The blog data to create
 * @returns {Promise} - A promise that resolves to the created blog data
 */
const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, getAuthConfig());
    return response.data;
};

/**
 * Update an existing blog entry
 * @param {string} blogId - The ID of the blog to update
 * @param {Object} updatedObject - The updated blog data
 * @returns {Promise} - A promise that resolves to the updated blog data
 */
const update = async (blogId, updatedObject) => {
    console.log(getAuthConfig())
    const response = await axios.put(`${baseUrl}/${blogId}`, updatedObject, getAuthConfig());
    console.log(response.data)
    return response.data;
};

/**
 * Delete an existing blog entry
 * @param {string} blogId - The ID of the blog to delete
 * @returns {Promise} - A promise that resolves to the result of the deletion
 */
const deleteBlog = async blogId => {
    const response = await axios.delete(`${baseUrl}/${blogId}`, getAuthConfig());
    return response.data;
};

// Compile and export the blog service functions
const blogService = {
    getAll,
    setToken,
    create,
    update,
    deleteBlog,
};

export default blogService;
