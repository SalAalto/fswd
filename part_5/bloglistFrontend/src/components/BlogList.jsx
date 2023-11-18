import { useState, useEffect } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm'; // Corrected typo here
import blogService from '../services/blogs';
import Notification from './Notification/Notification';

// This component lists all the blogs and handles blog creation
const BlogList = ({ user, setUser, notification, setNotification }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggleForm, setToggleForm] = useState(false); // Renamed for clarity

    // Fetches all blogs from the server and updates the state
    const fetchBlogs = async () => {
        try {
            const fetchedBlogs = await blogService.getAll();
            setBlogs(fetchedBlogs);
        } catch (error) {
            // Improved error handling: Use a function to display notifications
            displayNotification('error', 'Failed to load blogs.');
        } finally {
            setLoading(false);
        }
    };

    // Handles new blog creation
    const createBlog = async (blog) => {
        try {
            const newBlog = await blogService.create(blog);
            displayNotification('info', `A new blog "${newBlog.title}" by ${newBlog.author} added`);
            fetchBlogs(); // Refresh the list of blogs
        } catch {
            displayNotification('error', 'Failed to add blog.');
        }
    };

    // Utility function to display notifications
    const displayNotification = (type, text) => {
        setNotification({ type, text });
        setTimeout(() => setNotification(null), 5000);
    };

    // Logs the user out by clearing stored user data
    const handleLogout = () => {
        setUser(null);
        localStorage.clear();
    };

    // Effect to fetch blogs on component mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    // Main render
    return (
        <>
            {loading ? (
                <p>Loading blogs...</p>
            ) : (
                <div>
                    <h2>Blogs</h2>
                    {notification && <Notification message={notification} />}
                    <div className='blogsListControls'>
                        <span>{user.name} logged in</span>
                        <button onClick={handleLogout}>Logout</button>
                        <button onClick={() => setToggleForm(!toggleForm)}>
                            {toggleForm ? 'Cancel' : 'New Blog'}
                        </button>
                    </div>
                    {toggleForm && <BlogForm createBlog={createBlog} />}
                    <div className='blogsList'>
                        {blogs.sort((a, b) => b.likes - a.likes).map(blog => (
                            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default BlogList;
