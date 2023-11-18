import { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import Notification from './Notification/Notification';
import PropTypes from 'prop-types';

const Login = ({ setUser, notification, setNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle displaying notifications
    const notifyWithTimeout = (type, text, timeout = 5000) => {
        setNotification({ type, text });
        setTimeout(() => {
            setNotification(null);
        }, timeout);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            blogService.setToken(user.token);
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            setUsername('');
            setPassword('');
        } catch (exception) {
            notifyWithTimeout('error', 'Wrong username or password.');
        }
    };

    return (
        <>
            {notification && <Notification message={notification} />}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">Login</button>
            </form>
        </>
    );
};

Login.propTypes = {
    setUser: PropTypes.func.isRequired,
    notification: PropTypes.object,
    setNotification: PropTypes.func.isRequired,
};

export default Login;
