import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box, CircularProgress, Alert } from '@mui/material';
import { getAllUsers, addUser, updateUserById, deleteUserById } from '../../services/UserService'; // Import the service

const UserView = () => {
  const [users, setUsers] = useState([]); // Users from back-end
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [userToEdit, setUserToEdit] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [openModal, setOpenModal] = useState(false);

  // Fetch users from back-end
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenModal = (user = null) => {
    setUserToEdit(user);
    if (user) {
      setNewUser({ name: user.name, email: user.email });
    } else {
      setNewUser({ name: '', email: '' });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = async () => {
    try {
      const addedUser = await addUser({ name: newUser.name, email: newUser.email });
      setUsers([...users, addedUser]);
      setNewUser({ name: '', email: '' });
      handleCloseModal();
    } catch (err) {
      setError('Failed to add user');
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        name: newUser.name,
        email: newUser.email,
        preferences: newUser.preferences, // Assuming preferences are part of the form
      };
      
      await updateUserById(userToEdit.id, updatedUser);
      setUsers(users.map((user) => (user.id === userToEdit.id ? { ...user, ...updatedUser } : user)));
      setUserToEdit(null);
      setNewUser({ name: '', email: '', preferences: [] }); // Reset the form
      handleCloseModal();
    } catch (err) {
      setError('Failed to update user');
    }
  };
  

  const handleDeleteUser = async (id) => {
    try {
      await deleteUserById(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <h1>User Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add User
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenModal(user)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for creating or editing user */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'white',
            padding: 20,
            boxShadow: 24,
          }}
        >
          <h2>{userToEdit ? 'Edit User' : 'Add User'}</h2>
          <TextField
            label="Name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={userToEdit ? handleUpdateUser : handleAddUser}
          >
            {userToEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserView;
