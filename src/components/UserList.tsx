import { useEffect, useState } from 'react';
import CreateUserForm from './CreateUserForm';
import UpdateUserForm from './UpdateUserForm';
import DeleteUserButton from './DeleteUserButton';
import api from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUserId(null);
  };

  const handleUserDeleted = (deletedUserId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletedUserId));
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}{' '}
            <button onClick={() => setSelectedUserId(user.id)}>Edit</button>{' '}
            <DeleteUserButton userId={user.id} onUserDeleted={handleUserDeleted} />
            {selectedUserId === user.id && (
              <UpdateUserForm
                userId={user.id}
                initialName={user.name}
                onUserUpdated={handleUserUpdated}
              />
            )}
          </li>
        ))}
      </ul>
      <CreateUserForm onUserCreated={handleUserCreated} />
    </div>
  );
};

export default UserList;
