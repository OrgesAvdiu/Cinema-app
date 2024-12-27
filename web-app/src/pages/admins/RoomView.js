import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box, CircularProgress, Alert } from '@mui/material';
import { getAllRooms, addRoom, updateRoomById, deleteRoomById } from '../../services/RoomService';

const RoomView = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    capacity: '',
    cinemaId: '',
    features: ''
  });
  const [openModal, setOpenModal] = useState(false);

  // Fetch all rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getAllRooms();
        setRooms(roomsData);
      } catch (error) {
        setError('Error fetching rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleOpenModal = (room = null) => {
    setRoomToEdit(room);
    if (room) {
      setNewRoom({ ...room });
    } else {
      setNewRoom({
        roomNumber: '',
        capacity: '',
        cinemaId: '',
        features: ''
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setNewRoom({
      ...newRoom,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRoom = async () => {
    try {
      const addedRoom = await addRoom(newRoom);
      setRooms([...rooms, addedRoom]);
      handleCloseModal();
      resetForm();
    } catch (err) {
      setError('Failed to add room');
    }
  };

  const handleUpdateRoom = async () => {
    try {
      await updateRoomById(roomToEdit.id, newRoom);
      setRooms(rooms.map((room) => (room.id === roomToEdit.id ? { ...room, ...newRoom } : room)));
      handleCloseModal();
      resetForm();
    } catch (err) {
      setError('Failed to update room');
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await deleteRoomById(id);
      setRooms(rooms.filter((room) => room.id !== id));
    } catch (err) {
      setError('Failed to delete room');
    }
  };

  const resetForm = () => {
    setNewRoom({
      roomNumber: '',
      capacity: '',
      cinemaId: '',
      features: ''
    });
    setRoomToEdit(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <h1>Room Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add Room
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Cinema ID</TableCell>
              <TableCell>Features</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>{room.cinemaId}</TableCell>
                <TableCell>{room.features}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenModal(room)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteRoom(room.id)}
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

      {/* Modal for creating or editing room */}
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
          <h2>{roomToEdit ? 'Edit Room' : 'Add Room'}</h2>
          <TextField
            label="Room Number"
            name="roomNumber"
            value={newRoom.roomNumber}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Capacity"
            name="capacity"
            value={newRoom.capacity}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Cinema ID"
            name="cinemaId"
            value={newRoom.cinemaId}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Features"
            name="features"
            value={newRoom.features}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={roomToEdit ? handleUpdateRoom : handleAddRoom}
          >
            {roomToEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default RoomView;
