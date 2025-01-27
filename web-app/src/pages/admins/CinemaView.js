import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box, CircularProgress, Alert } from '@mui/material';
import { getAllCinemas, addCinema, updateCinemaById, deleteCinemaById } from '../../services/CinemaService'; // Import the service

const CinemaView = () => {
  const [cinemas, setCinemas] = useState([]); // Cinemas from back-end
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [cinemaToEdit, setCinemaToEdit] = useState(null);
  const [newCinema, setNewCinema] = useState({
    name: '',
    location: '',
    contactInfo: ''
  });
  const [openModal, setOpenModal] = useState(false);

  // Fetch cinemas from back-end
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const cinemasData = await getAllCinemas();
        setCinemas(cinemasData);
      } catch (error) {
        setError('Error fetching cinemas');
      } finally {
        setLoading(false);
      }
    };

    fetchCinemas();
  }, []);

  const handleOpenModal = (cinema = null) => {
    setCinemaToEdit(cinema);
    if (cinema) {
      setNewCinema({ ...cinema });
    } else {
      setNewCinema({
        name: '',
        location: '',
        contactInfo: ''
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setNewCinema({
      ...newCinema,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCinema = async () => {
    try {
      const addedCinema = await addCinema(newCinema);
      setCinemas([...cinemas, addedCinema]);
      setNewCinema({
        name: '',
        location: '',
        contactInfo: ''
      });
      handleCloseModal();
    } catch (err) {
      setError('Failed to add cinema');
    }
  };

  const handleUpdateCinema = async () => {
    try {
      await updateCinemaById(cinemaToEdit.id, newCinema);
      setCinemas(cinemas.map((cinema) => (cinema.id === cinemaToEdit.id ? { ...cinema, ...newCinema } : cinema)));
      setCinemaToEdit(null);
      setNewCinema({
        name: '',
        location: '',
        contactInfo: ''
      }); // Reset the form
      handleCloseModal();
    } catch (err) {
      setError('Failed to update cinema');
    }
  };

  const handleDeleteCinema = async (id) => {
    try {
      await deleteCinemaById(id);
      setCinemas(cinemas.filter((cinema) => cinema.id !== id));
    } catch (err) {
      setError('Failed to delete cinema');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <h1>Cinema Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add Cinema
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cinemas.map((cinema) => (
              <TableRow key={cinema.id}>
                <TableCell>{cinema.id}</TableCell>
                <TableCell>{cinema.name}</TableCell>
                <TableCell>{cinema.location}</TableCell>
                <TableCell>{cinema.contactInfo}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenModal(cinema)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteCinema(cinema.id)}
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

      {/* Modal for creating or editing cinema */}
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
          <h2>{cinemaToEdit ? 'Edit Cinema' : 'Add Cinema'}</h2>
          <TextField
            label="Name"
            name="name"
            value={newCinema.name}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Location"
            name="location"
            value={newCinema.location}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Contact Info"
            name="contactInfo"
            value={newCinema.contactInfo}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={cinemaToEdit ? handleUpdateCinema : handleAddCinema}
          >
            {cinemaToEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CinemaView;