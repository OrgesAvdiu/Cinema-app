import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Movie'; // Adjust the URL based on your API's address

// Get all movies
export const getAllMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching movies';
  }
};

// Get movie by ID
export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching movie';
  }
};

// Add a new movie
export const addMovie = async (movie) => {
  try {
    const response = await axios.post(`${API_URL}`, movie);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding movie';
  }
};

// Update movie by ID
export const updateMovieById = async (id, movie) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, movie);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error updating movie';
  }
};

// Delete movie by ID
export const deleteMovieById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting movie';
  }
};
