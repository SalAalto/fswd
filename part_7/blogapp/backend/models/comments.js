const mongoose = require('mongoose');

const schemaDefinition = {
    text: { type: String, required: true },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
};

const commentSchema = new mongoose.Schema(schemaDefinition);

function transformToJSON(_, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
}

commentSchema.set('toJSON', { transform: transformToJSON });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
