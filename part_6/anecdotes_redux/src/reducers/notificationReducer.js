import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

const anecdoteNotificationSlice = createSlice({
    name: 'anecdoteNotification',
    initialState,
    reducers: {
        setAnecdoteNotification(state, action) {
            return action.payload;
        },
        clearAnecdoteNotification() {
            return initialState;
        }
    },
});

export const { setAnecdoteNotification, clearAnecdoteNotification } = anecdoteNotificationSlice.actions;

let notificationTimeoutId;

export const setNotification = (content, time) => dispatch => {
    dispatch(setAnecdoteNotification(content));

    clearTimeout(notificationTimeoutId);
    notificationTimeoutId = setTimeout(() => {
        dispatch(clearAnecdoteNotification());
    }, time);
};

export default anecdoteNotificationSlice.reducer;
