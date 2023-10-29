// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import custom utility and middleware modules
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

// Initialize the express app
const app = express();

// Connect to the MongoDB database
mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch((err) => logger.error('Error connecting to MongoDB:', err.message));

// Apply middlewares
app.use(cors()); // Enable cross-origin resource sharing
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse incoming form data
app.use(express.static('dist')); // Serve static files from 'dist' directory

// Use custom middlewares for request logging and token extraction
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

// Define routes
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

// Apply routes with user extraction middleware for blogs
app.use('/api/blogs', middleware.userExtractor, blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

// If in test environment, apply testing routes
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}

// Apply custom error handling middleware
app.use(middleware.errorHandler);

// Start the server on the specified port
const PORT = config.PORT || 3003; // Fallback to port 3003 if not specified
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// Export app for further use
module.exports = app;
