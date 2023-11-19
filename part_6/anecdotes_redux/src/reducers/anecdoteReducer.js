import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = [];

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState,
    reducers: {
        incrementVote(state, action) {
            const index = state.findIndex(anecdote => anecdote.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            state.splice(0, state.length, ...action.payload);
        }
    },
});

export const { incrementVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = anecdote => async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdote(newAnecdote));
};

export const incrementAnecdoteVote = (anecdoteId, updatedAnecdote) => async dispatch => {
    const newAnecdote = await anecdoteService.updateAnecdote(anecdoteId, updatedAnecdote);
    dispatch(incrementVote(newAnecdote));
};

export default anecdoteSlice.reducer;
