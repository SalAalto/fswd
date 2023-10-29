// Load environment variables from the .env file
require('dotenv').config();

// Retrieve the PORT from environment variables
const PORT = process.env.PORT;

// Determine the appropriate MongoDB URI based on the NODE_ENV
// If in a 'test' environment, use the test MongoDB URI; otherwise, use the main URI.
const MONGODB_URI = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

// Export the configurations for external use
module.exports = {
    PORT,
    MONGODB_URI
};
