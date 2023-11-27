import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
    console.log({ state, action });
    switch (action.type) {
        case 'info':
            return { type: action.type, text: action.text };
        case 'error':
            return { type: action.type, text: action.text };
        case 'clear':
            return { type: 'clear', text: '' };
        default:
            return state;
    }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, {
        type: 'clear',
        text: '',
    });

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
