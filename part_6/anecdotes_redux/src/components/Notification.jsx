import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(state => state.notification);

    const style = {
        border: notification ? '1px solid' : 'none',
        padding: notification ? 10 : 0,
        margin: notification ? '10px 0' : 0,
        backgroundColor: '#f8f8f8',
        color: 'green',
        textAlign: 'center',
        borderRadius: '5px',
        fontSize: '1rem'
    };

    if (!notification) return null;

    return (
        <div style={style}>
            {notification}
        </div>
    );
};

export default Notification;
