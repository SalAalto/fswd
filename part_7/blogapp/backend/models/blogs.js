const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

function toJSONTransformation(_, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
}

BlogSchema.set('toJSON', { transform: toJSONTransformation });

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;
