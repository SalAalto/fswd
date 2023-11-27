import userService from '../services/users';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableData } from '../styledComponents';

const Users = () => {
    const { data: users, isLoading } = useQuery('users', userService.getAll);

    if (isLoading) {
        return <div>Loading data...</div>;
    }

    return (
        <>
            <h2>Users</h2>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Blogs Created</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <TableData>
                                <Link
                                    style={{
                                        color: 'blue',
                                        paddingRight: '5px',
                                        textDecoration: 'none',
                                        padding: '10px',
                                    }}
                                    to={`/users/${user.id}`}
                                >
                                    {user.name || user.username}
                                </Link>
                            </TableData>
                            <TableData>{user.blogs.length}</TableData>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Users;
