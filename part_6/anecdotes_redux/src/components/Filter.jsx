import React from 'react';
import { useDispatch } from 'react-redux';
import { setAnecdoteFilter } from '../reducers/anecdoteFilterReducer';

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(setAnecdoteFilter(event.target.value));
    };

    const style = {
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    };

    return (
        <div style={style}>
            <label htmlFor="anecdoteFilter">filter</label>
            <input id="anecdoteFilter" onChange={handleChange} />
        </div>
    );
};

export default Filter;
