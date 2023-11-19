import axios from 'axios';

// Base URL for the anecdotes API
const baseUrl = 'http://localhost:3001/anecdotes';

// Generate a random ID
const getId = () => Math.floor(100000 * Math.random()).toString();

// Get all anecdotes
export const getAnecdotes = () => axios.get(baseUrl).then(response => response.data);

// Create a new anecdote
export const createAnecdote = async content => {
    const anecdoteObject = { content, id: getId(), votes: 0 };
    const response = await axios.post(baseUrl, anecdoteObject);
    return response.data;
};

// Update an existing anecdote
export const updateAnecdote = async ({ id, newObject }) => {
    const updateUrl = `${baseUrl}/${id}`;
    const response = await axios.put(updateUrl, newObject);
    return response.data;
};
