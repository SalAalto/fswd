import { useState } from 'react';
import blogService from '../services/blogs';

// Component to display a single blog entry
const Blog = ({ blog, setBlogs }) => {
    const [showDetails, setShowDetails] = useState(false);

    // Retrieve the user ID from local storage
    const getUserId = () => {
        try {
            const user = JSON.parse(localStorage.getItem('loggedBlogappUser'));
            return user?.id;
        } catch {
            console.log("User not found")
            return null;
        }
    };

    // Increments the number of likes for the blog post
    const handleLikes = async () => {
        const updatedLikes = blog.likes + 1;
        try {
            setBlogs(blogs =>
                blogs.map(b => b.id === blog.id ? { ...b, likes: updatedLikes } : b)
            );
            await blogService.update(blog.id, { ...blog, likes: updatedLikes });
        } catch (error) {
            console.log(`Blog likes not updated: ${error}`)
            // Handle the error such as displaying a message to the user
        }
    };

    // Deletes the blog post
    const handleDelete = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            try {
                await blogService.deleteBlog(blog.id);
                setBlogs(blogs => blogs.filter(b => b.id !== blog.id));
            } catch (error) {
                // Handle the error such as displaying a message to the user
            }
        }
    };

    // Styles for the blog component
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    // JSX for the blog component
    return (
        <div className='blog' style={blogStyle}>
            <span id="blog-title">{blog.title}</span>
            <span id="blog-creator">{blog?.user?.name}</span>
            <button className='showDetailsButton' onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'hide' : 'view'}
            </button>
            {showDetails && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='blogUrl'>{blog?.url}</div>
                    <span className='blogLikes'>
                        likes {blog.likes}
                        <button className='blogLikesButton' onClick={handleLikes}>like</button>
                    </span>
                    {blog?.author}
                    {getUserId() === blog?.user?.id && (
                        <button onClick={handleDelete}>remove</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blog;
