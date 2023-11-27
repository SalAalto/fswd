import { useState, useContext } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/users';
import Notification from './Notification/Notification';
import NotificationContext from '../NotificationContext';
import userContext from '../UserContext';
import { Container, Button, Form, Input, Heading } from '../styledComponents';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { username, password } = credentials;

    const [notification, dispatch] = useContext(NotificationContext);
    const [, userDispatch] = useContext(userContext);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login(credentials);
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            blogService.setToken(user.token);
            userService.setToken(user.token);
            userDispatch({ type: 'LOGGED_IN', data: user });
            setCredentials({ username: '', password: '' });
        } catch (exception) {
            dispatch({ type: 'error', text: 'Wrong username or password.' });
            setTimeout(() => dispatch({ type: 'clear', text: '' }), 5000);
        }
    };

    return (
        <Container margin="auto" width="500">
            <Heading>Log in to application</Heading>
            {notification && <Notification message={notification} />}
            <Form onSubmit={handleLogin}>
                <Container>
                    username
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        name="username"
                        onChange={handleChange}
                    />
                </Container>
                <Container>
                    password
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                    />
                </Container>
                <Button id="login-button" type="submit">login</Button>
            </Form>
        </Container>
    );
};

export default Login;
