// Import necessary modules
const logger = require('./logger');
const jwt = require('jsonwebtoken');

// Middleware to log request details
const requestLogger = (req, res, next) => {
  logger.info('HTTP Method:', req.method);
  logger.info('Request Path:', req.path);
  logger.info('Request Body:', req.body);
  logger.info('------------');
  next();
};

// Middleware for handling unknown endpoints
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
};

// Middleware for global error handling
const errorHandler = (error, req, res, next) => {
  logger.error('Error:', error.message);

  switch (error.name) {
    case 'CastError':
      res.status(400).json({ error: 'Invalid ID format' });
      break;
    case 'ValidationError':
      res.status(400).json({ error: error.message });
      break;
    case 'JsonWebTokenError':
      res.status(401).json({ error: 'Token is invalid' });
      break;
    default:
      next(error);
  }
};

// Utility function to retrieve token from request headers
const getTokenFrom = req => {
  const authHeader = req.get('authorization');
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7);
  }
  return null;
};

// Middleware to extract token from headers and attach to request object
const tokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req);
  next();
};

// Middleware to decode user from token and attach to request object
const userExtractor = (req, res, next) => {
  const token = getTokenFrom(req);
  const decodedPayload = jwt.verify(token, process.env.SECRET);

  if (!decodedPayload) {
    return res.status(401).json({ error: 'Token is missing or not valid' });
  }

  req.user = decodedPayload;
  next();
};

// Export middlewares for external use
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
};
