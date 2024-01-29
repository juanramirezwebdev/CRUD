import { useState } from 'react';
import api from '../services/api';
import '../App.css'
const CreateUserForm = ({ onUserCreated }) => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users', { name });
      onUserCreated(response.data);
      setName('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input id='lab' type="text" value={name} onChange={handleNameChange} />
      </label>
      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUserForm;
