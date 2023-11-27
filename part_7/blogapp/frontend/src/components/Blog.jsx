import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import blogService from '../services/blogs';
import { Button, Container, Form, Input } from '../styledComponents';

const Blog = () => {
    const queryClient = useQueryClient();
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: blog, isLoading: isBlogLoading } = useQuery(['blogs', id], blogService.getBlog);
    const { data: comments, isLoading: isCommentsLoading } = useQuery(['blogComments', id], blogService.getBlogComments);

    const mutationOptions = {
        onSuccess: () => queryClient.invalidateQueries(['blogs', id])
    };

    const updateBlogMutation = useMutation(blogService.update, mutationOptions);
    const deleteBlogMutation = useMutation(blogService.deleteBlog, {
        ...mutationOptions,
        onSuccess: () => {
            navigate('/');
            queryClient.invalidateQueries('blogs');
        },
    });
    const createBlogCommentMutation = useMutation(blogService.addBlogComment, mutationOptions);

    if (isBlogLoading || isCommentsLoading) {
        return <div>Loading data...</div>;
    }

    const handleLikes = async () => {
        updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    };

    const handleDelete = async () => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            deleteBlogMutation.mutate(blog.id);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        createBlogCommentMutation.mutate({ id: blog?.id, text: comment });
    };

    const getUserId = () => {
        try {
            const user = JSON.parse(localStorage.getItem('loggedBlogappUser'));
            return user?.id;
        } catch (error) {
            return null;
        }
    };

    return (
        <Container padding="10px">
            <Container padding="10px" margin="10px 0px 5px 0px" fontWeight="bold">
                <span id="blog-title"> {blog?.title} </span>{' '}
                <span id="blog-creator"> {blog?.user?.name} </span>
            </Container>

            <Container display="flex" flexDirection="column">
                <Link
                    style={{
                        color: 'blue',
                        textDecoration: 'none',
                        padding: '10px',
                    }}
                    to={blog?.url}
                    className="blogUrl"
                >
                    {' '}
                    {blog?.url}{' '}
                </Link>
                <span style={{ padding: '10px' }}>
                    likes {blog.likes}{' '}
                    <Button
                        padding="10px"
                        className="blogLikesButton"
                        onClick={() => handleLikes()}
                    >
                        {' '}
                        like{' '}
                    </Button>
                </span>
                {blog?.author && `added by ${blog?.author}`}
                <Container margin="5px">
                    {getUserId() === blog?.user?.id && (
                        <Button
                            backgroundColor="red"
                            color="white"
                            onClick={() => handleDelete()}
                        >
                            {' '}
                            remove{' '}
                        </Button>
                    )}
                </Container>
                <div>
                    <Container width={400}>
                        <h2> comments </h2>
                        <Form onSubmit={handleSubmit}>
                            <Input
                                onChange={(event) => setComment(event.target.value)}
                                type="text"
                            />
                            <Button type="submit">Add comment </Button>
                        </Form>
                    </Container>

                    {comments?.map(({ text, id }) => (
                        <p key={id}> {text} </p>
                    ))}
                </div>
            </Container>
        </Container>
    );
};

export default Blog;
