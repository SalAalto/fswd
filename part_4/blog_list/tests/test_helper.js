const BlogModel = require('../models/blogs');
const UserModel = require('../models/users');

// Seed data for initial blogs
const initialBlogs = [
    {
        title: "React Design Patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "The Impact of Go To Statement",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
];

// Fetch all blogs from the database
const blogsInDb = async () => {
    const blogs = await BlogModel.find({});
    return blogs.map(blogEntry => blogEntry.toJSON());
}

// Fetch all users from the database
const usersInDb = async () => {
    const users = await UserModel.find({});
    return users.map(userEntry => userEntry.toJSON());
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb
}
