import { useQuery } from 'react-query';
import userService from '../services/users';
import { useParams } from 'react-router-dom';

const UserBlogs = () => {
    const { id } = useParams();
    const { data: user, isLoading } = useQuery(['userBlogs', id], () => userService.getUser(id));

    if (isLoading) {
        return <div>Loading data...</div>;
    }

    const blogs = user?.blogs || [];

    return (
        <>
            <h2>Added Blogs</h2>
            {blogs.length > 0 ? (
                <ul>
                    {blogs.map(({ title, id }) => (
                        <li key={id} style={{ listStyleType: 'circle' }}>{title}</li>
                    ))}
                </ul>
            ) : (
                <p>No blogs added yet.</p>
            )}
        </>
    );
};

export default UserBlogs;
