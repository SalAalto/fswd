import { createContext, useReducer, useContext } from 'react';

// Reducer function for notifications
const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload;
        case 'CLEAR_NOTIFICATION':
            return '';
        default:
            return state;
    }
};

// Creating context
const NotificationContext = createContext();

// Context Provider Component
export const NotificationContextProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, '');

    return (
        <NotificationContext.Provider value={{ notification, dispatch }}>
            {children}
        </NotificationContext.Provider>
    );
};

// Hook to use notification value
export const useNotificationValue = () => {
    const context = useContext(NotificationContext);
    return context.notification;
};

// Hook to use notification dispatch
export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext);
    return context.dispatch;
};

export default NotificationContext;
