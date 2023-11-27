const mongoose = require('mongoose');

// Define the user schema
const userSchemaDefinition = {
    username: {
        type: String,
        required: [true, 'username is required'],
        minLength: [3, 'minimum user length should be three.'],
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
};

const userSchema = new mongoose.Schema(userSchemaDefinition);

// Transform method for toJSON
function transformForJSON(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;  // passwordHash should not be revealed
}

// Applying the transformation method
userSchema.set('toJSON', { transform: transformForJSON });

// Creating the model
const User = mongoose.model('User', userSchema);

module.exports = User;
