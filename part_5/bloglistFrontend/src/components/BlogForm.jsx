import { useState } from 'react';

// This component renders a form for creating new blog entries
const BlogForm = ({ createBlog }) => {
    // State to hold the form data for the new blog
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

    // Handles form field changes and updates the state
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    // Called when the form is submitted
    const addBlog = async (event) => {
        event.preventDefault();
        try {
            await createBlog(newBlog);
            setNewBlog({ title: '', author: '', url: '' }); // Reset the form after submission
        } catch (error) {
            // Here we should set an error state and display a message to the user, not just log the error
        }
    };

    // Form structure with handlers for submission and input changes
    return (
        <form onSubmit={addBlog} style={{ padding: '20px 0px' }}>
            <div>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    required
                    type="text"
                    value={newBlog.title}
                    name="title"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input
                    id="author"
                    required
                    type="text"
                    value={newBlog.author}
                    name="author"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="url">URL:</label>
                <input
                    id="url"
                    required
                    type="text"
                    value={newBlog.url}
                    name="url"
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    );
};

export default BlogForm;
