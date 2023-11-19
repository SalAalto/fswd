import anecdotesReducer from './reducers/anecdoteReducer';
import anecdotesFilterReducer from './reducers/anecdoteFilterReducer';
import anecdoteNotificationReducer from './reducers/notificationReducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = {
    anecdotes: anecdotesReducer,
    filter: anecdotesFilterReducer,
    notification: anecdoteNotificationReducer
};

const configureAppStore = () => configureStore({ reducer: rootReducer });

const store = configureAppStore();

export default store;
