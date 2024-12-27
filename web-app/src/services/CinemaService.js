import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Cinema';  // Adjust to match your API

// Get all cinemas
export const getAllCinemas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching cinemas';
  }
};

// Get cinema by ID
export const getCinemaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching cinema';
  }
};

// Add a new cinema
export const addCinema = async (cinema) => {
  try {
    const response = await axios.post(API_URL, cinema);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding cinema';
  }
};

// Update cinema by ID
export const updateCinemaById = async (id, cinema) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, cinema);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error updating cinema';
  }
};

// Delete cinema by ID
export const deleteCinemaById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting cinema';
  }
};
