// Define a logging utility

// Log informational messages to the console
const info = (...messages) => {
    console.log(...messages);
};

// Log error messages to the console
const error = (...messages) => {
    console.error(...messages);
};

// Export the logging functions for external use
module.exports = {
    info,
    error
};
