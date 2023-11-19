import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementAnecdoteVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const vote = (anecdote) => {
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        dispatch(incrementAnecdoteVote(anecdote.id, updatedAnecdote));
        dispatch(setNotification(`You voted '${anecdote.content}'`, 5000));
    };

    const filteredAndSortedAnecdotes = anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes);

    return (
        <div>
            {filteredAndSortedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
