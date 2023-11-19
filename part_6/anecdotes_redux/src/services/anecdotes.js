import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const generateId = () => Math.floor(Math.random() * 100000).toString();

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data);
};

const createNew = (content) => {
    const newAnecdote = { content, id: generateId(), votes: 0 };
    return axios.post(baseUrl, newAnecdote).then(response => response.data);
};

const updateAnecdote = (id, updatedAnecdote) => {
    return axios.put(`${baseUrl}/${id}`, updatedAnecdote).then(response => response.data);
};

export default { getAll, createNew, updateAnecdote };
