// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the blog
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {
        type: Number,
        default: 0
    },
    // Define a relationship to the User model
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Define transformations for the output JSON representation of the model
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // Convert the ObjectId to a string for easier use in client-side
        returnedObject.id = returnedObject._id.toString();
        // Remove fields that might not be necessary for the client-side
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

// Export the blog model for use in other modules
module.exports = mongoose.model('Blog', blogSchema);