import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import blogService from '../services/blogs'
import Blog from './Blog';
import BlogForm from './BlogForm';
import axios from 'axios';

// Define a blog object that will be used in our tests
const blog = {
    title: 'Anime',
    author: 'Salahuddin',
    url: 'https://twitter.com/anitrendz/status/1654093938784075777?s=46',
    likes: 11,
    user: {
        username: 'shisui_uzumaki',
        name: 'Salahuddin',
        id: '65478823a05c96a62c012350'
    },
    id: '65478b23a05c96a62c012357'
};

let token = '';
let userId = '';
beforeEach(async () => {

    const password = '123ABD';
    const username = 'shisui_uzumaki';

    const result = await axios
        .post('http://localhost:3003/api/login', {
            username,
            password
        })
    
    // console.log(result)
    token = result.data.token;
})


// Test to verify if the Blog component renders the author and title, but not url or likes by default
test('Blog component displays author and title, but not url or likes initially', () => {
    const component = render(<Blog blog={blog} />);

    expect(screen.getByText(blog.user.name)).toBeInTheDocument();
    expect(screen.getByText(blog.title)).toBeInTheDocument();
    expect(component.container.querySelector('.blogUrl')).not.toBeInTheDocument();
    expect(component.container.querySelector('.blogLikes')).not.toBeInTheDocument();
});

// Test to check if url and likes are shown when the 'show details' button is clicked
test('Blog component shows url and likes when details are requested', async () => {
    const { container } = render(<Blog blog={blog} />);
    const detailsButton = container.querySelector('.showDetailsButton');

    await userEvent.setup().click(detailsButton);

    expect(container.querySelector('.blogUrl')).toBeInTheDocument();
    expect(container.querySelector('.blogLikes')).toBeInTheDocument();
});

// Test to ensure likes increment properly when the 'like' button is clicked
test('Blog component increments likes when like button is clicked', async () => {
    blogService.setToken(token)

    const incrementLikes = jest.fn();

    const { container } = render(<Blog blog={blog} setBlogs={incrementLikes} />);
    const detailsButton = container.querySelector('.showDetailsButton');

    const user = userEvent.setup();
    await user.click(detailsButton);

    const likesButton = container.querySelector('.blogLikesButton');
    await user.click(likesButton);
    await user.click(likesButton);

    expect(incrementLikes.mock.calls).toHaveLength(2);
});

// Test to verify that the BlogForm component calls the createBlog prop with correct data when a new blog is submitted
test('BlogForm component calls createBlog with the right details', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog} />);

    // Extract inputs for the form fields
    const inputs = screen.getAllByRole('textbox');
    const [titleInput, authorInput, urlInput] = inputs;
    const submitButton = screen.getByText('Create');

    // Simulate user typing into the form fields
    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);

    // Simulate user submitting the form
    await user.click(submitButton);

    // Assert that the mock function was called exactly once with the expected data
    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
        title: blog.title,
        author: blog.author,
        url: blog.url
    });
});
