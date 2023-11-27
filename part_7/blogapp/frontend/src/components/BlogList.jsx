import { useState, useContext } from 'react';
import blogService from '../services/blogs';
import BlogForm from './BlogForm';
import NotificationContext from '../NotificationContext';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Button, Container } from '../styledComponents';

const BlogList = () => {
    const queryClient = useQueryClient();
    const [, dispatch] = useContext(NotificationContext);
    const [toggleNote, setToggleNote] = useState(false);
    const blogsQuery = useQuery('blogs', blogService.getAll);

    const handleCreateBlogSuccess = (newBlog) => {
        const blogs = queryClient.getQueryData('blogs');
        queryClient.setQueryData('blogs', [...blogs, newBlog]);
    };

    const newBlogMutation = useMutation(blogService.create, {
        onSuccess: handleCreateBlogSuccess,
    });

    const createBlog = async (blog) => {
        try {
            newBlogMutation.mutate(blog);
            dispatch({ type: 'info', text: `a new blog ${blog.title} by ${blog.author} added` });
        } catch {
            dispatch({ type: 'error', text: 'Failed to add blog.' });
        } finally {
            setTimeout(() => dispatch({ type: 'clear', text: '' }), 5000);
        }
    };

    if (blogsQuery.isLoading) {
        return <div>Loading data...</div>;
    }

    const sortedBlogs = blogsQuery.data.sort((a, b) => b.likes - a.likes);

    return (
        <div>
            {toggleNote && <BlogForm createBlog={createBlog} />}
            <Button
                backgroundColor="green"
                color="white"
                id="blog-form-button"
                onClick={() => setToggleNote(!toggleNote)}
            >
                {toggleNote ? 'cancel' : 'new blog'}
            </Button>
            {sortedBlogs.map((blog) => (
                <Container key={blog?.id} className="blog" padding="10px 0px 0px 2px"
                    border="2px solid black"
                    margin="10px 0px 5px 0px">
                    <Link to={`/blogs/${blog?.id}`}
                        style={{
                            color: 'blue',
                            paddingRight: '5px',
                            textDecoration: 'none',
                            padding: '10px',
                        }}>
                        <span> {blog.title} </span> <span> {blog?.user?.name} </span>
                    </Link>
                </Container>
            ))}
        </div>
    );
};

export default BlogList;
