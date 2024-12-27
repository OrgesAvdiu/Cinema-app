import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Rooms';  // Adjust to match your API

// Get all rooms
export const getAllRooms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching rooms';
  }
};

// Get room by ID
export const getRoomById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching room';
  }
};

// Add a new room
export const addRoom = async (room) => {
  try {
    const response = await axios.post(API_URL, room);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding room';
  }
};

// Update room by ID
export const updateRoomById = async (id, room) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, room);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error updating room';
  }
};

// Delete room by ID
export const deleteRoomById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting room';
  }
};

// Get rooms by cinema ID
export const getRoomsByCinemaId = async (cinemaId) => {
  try {
    const response = await axios.get(`${API_URL}/byCinema/${cinemaId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching rooms by cinema';
  }
};

// Search rooms by features
export const searchRooms = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: { searchTerm } });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error searching rooms';
  }
};
