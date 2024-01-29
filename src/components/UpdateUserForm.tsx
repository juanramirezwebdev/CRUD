import { useState } from 'react';
import api from '../services/api';

const UpdateUserForm = ({ userId, initialName, onUserUpdated }) => {
  const [name, setName] = useState(initialName);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/users/${userId}`, { name });
      onUserUpdated(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label id='l_name'>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;
