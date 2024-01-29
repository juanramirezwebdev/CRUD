import api from '../services/api';

const DeleteUserButton = ({ userId, onUserDeleted }) => {
  const handleButtonClick = async () => {
    try {
      await api.delete(`/users/${userId}`);
      onUserDeleted(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return <button onClick={handleButtonClick}>Delete User</button>;
};

export default DeleteUserButton;
