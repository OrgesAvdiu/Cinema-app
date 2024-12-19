import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box, CircularProgress, Alert } from '@mui/material';
import { getAllCities, addCity, updateCityById, deleteCityById } from '../../services/CityService';

const CityView = () => {
  const [cities, setCities] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cityToEdit, setCityToEdit] = useState(null);
  const [newCity, setNewCity] = useState({ name: '' });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getAllCities();
        setCities(citiesData);
      } catch (error) {
        setError('Error fetching cities');
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const handleOpenModal = (city = null) => {
    setCityToEdit(city);
    setNewCity(city ? { ...city } : { name: '' });
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    setNewCity({ ...newCity, [e.target.name]: e.target.value });
  };

  const handleAddCity = async () => {
    try {
      const addedCity = await addCity(newCity);
      setCities([...cities, addedCity]);
      setNewCity({ name: '' });
      handleCloseModal();
    } catch (err) {
      setError('Failed to add city');
    }
  };

  const handleUpdateCity = async () => {
    try {
      await updateCityById(cityToEdit.id, newCity);
      setCities(cities.map((city) => (city.id === cityToEdit.id ? { ...city, ...newCity } : city)));
      setCityToEdit(null);
      setNewCity({ name: '' });
      handleCloseModal();
    } catch (err) {
      setError('Failed to update city');
    }
  };

  const handleDeleteCity = async (id) => {
    try {
      await deleteCityById(id);
      setCities(cities.filter((city) => city.id !== id));
    } catch (err) {
      setError('Failed to delete city');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <h1>City Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>Add City</Button>

      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.id}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenModal(city)}>Edit</Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteCity(city.id)}
                    style={{ marginLeft: 10 }}
                  >Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', padding: 20, boxShadow: 24 }}>
          <h2>{cityToEdit ? 'Edit City' : 'Add City'}</h2>
          <TextField label="Name" name="name" value={newCity.name} onChange={handleChange} fullWidth style={{ marginBottom: 20 }} />
          <Button variant="contained" color="primary" onClick={cityToEdit ? handleUpdateCity : handleAddCity}>{cityToEdit ? 'Update' : 'Add'}</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CityView;
