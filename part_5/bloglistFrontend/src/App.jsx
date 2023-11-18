// Import necessary hooks and components
import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import Login from './components/Login';
import blogService from './services/blogs';

// Define the main App component
const App = () => {
  // State hooks for user and notification management
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Effect hook to check local storage for logged in user details on mount
  useEffect(() => {
    // Attempt to retrieve user details from local storage
    const storedUser = localStorage.getItem('loggedBlogappUser');
    if (storedUser) {
      // Parse the stringified user object
      const userData = JSON.parse(storedUser);
      // Set the authentication token for future HTTP requests
      blogService.setToken(userData.token);
      // Update the user state with the logged-in user's data
      setUser(userData);
    }
  }, []);

  // Function to render the Login or BlogList component based on user state
  const renderContent = () => {
    if (!user) {
      return (
        <div>
          <h1>Log in to the application</h1>
          <Login
            notification={notification}
            setNotification={setNotification}
            setUser={setUser}
          />
        </div>
      );
    } else {
      return (
        <BlogList
          notification={notification}
          setNotification={setNotification}
          user={user}
          setUser={setUser}
        />
      );
    }
  };

  // Return the JSX rendering the appropriate content
  return <>{renderContent()}</>;
};

// Export the App component
export default App;
