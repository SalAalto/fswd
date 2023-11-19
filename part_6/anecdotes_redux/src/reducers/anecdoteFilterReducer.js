import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

const anecdoteFilerSlice = createSlice({
    name: 'anecdoteFilter',
    initialState,
    reducers: {
        setAnecdoteFilter(state, action) {
            return action.payload;
        }
    },
});

const { actions, reducer } = anecdoteFilerSlice;

export const { setAnecdoteFilter } = actions;
export default reducer;
