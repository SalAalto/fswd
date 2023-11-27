import { useState } from 'react';
import { Button, Container, Form, Input } from '../styledComponents';

const BlogForm = ({ createBlog }) => {
    const [blog, setBlog] = useState({ title: '', author: '', url: '' });

    const handleChange = ({ target: { name, value } }) => {
        setBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
    };

    const addBlog = async (event) => {
        event.preventDefault();
        try {
            await createBlog(blog);
            setBlog({ title: '', author: '', url: '' });
        } catch (error) {
            console.error('Blog creation error:', error);
        }
    };

    return (
        <Container width="500">
            <Form onSubmit={addBlog} style={{ padding: '20px 0px' }}>
                Create new:
                {Object.entries(blog).map(([key, value]) => (
                    <Container margin="5px 0 0 0" key={key}>
                        {key}:
                        <Input
                            id={key}
                            required
                            type="text"
                            value={value}
                            name={key}
                            onChange={handleChange}
                        />
                    </Container>
                ))}
                <Button id="add-blog-button" type="submit">create</Button>
            </Form>
        </Container>
    );
};

export default BlogForm;
