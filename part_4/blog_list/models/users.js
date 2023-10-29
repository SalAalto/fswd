// Load mongoose library
const mongoose = require('mongoose');

// Define a schema for users
const UserProfileSchema = new mongoose.Schema({
    // The username field is required, must be unique and have a minimum length of 3
    username: {
        type: String,
        required: [true, 'Username is mandatory'],
        minLength: [3, 'Username should have at least 3 characters'],
        unique: true
    },
    // Name of the user
    name: String,
    // Hashed representation of the user's password
    passwordHash: String,
    // List of blogs associated with this user
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

// Set transformations for the model's JSON output
UserProfileSchema.set('toJSON', {
    transform: (src, dest) => {
        // Convert ObjectId to a string for better client-side handling
        dest.id = dest._id.toString();
        // Remove fields that are not needed or should be hidden for security reasons
        delete dest._id;
        delete dest.__v;
        delete dest.passwordHash; // Password hash should not be exposed
    }
});

// Define the user model based on the schema
const User = mongoose.model('User', UserProfileSchema);

// Export the model for external use
module.exports = User;
