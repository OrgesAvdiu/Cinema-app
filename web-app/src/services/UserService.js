import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Users'; // Adjust the URL based on your API's address

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-users`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching users';
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/get-user-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching user';
  }
};

// Add a new user
export const addUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/add-user`, user); // Assuming you have an endpoint for adding users
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding user';
  }
};

// Update user by ID
export const updateUserById = async (id, user) => {
    try {
      const response = await axios.put(`${API_URL}/update-user-by-id/${id}`, user);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : 'Error updating user';
    }
  };
  

// Delete user by ID
export const deleteUserById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-user-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting user';
  }
};
