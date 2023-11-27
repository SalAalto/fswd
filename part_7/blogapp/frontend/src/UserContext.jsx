import { createContext, useReducer } from 'react';

const userReducer = (state, action) => {
    switch (action?.type) {
        case 'LOGGED_IN':
            return { ...action.data };
        case 'clear':
            return null;
        default:
            return state;
    }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null);

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext;
