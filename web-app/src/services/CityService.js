import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Cities'; // Adjust the URL based on your API's address

// Get all cities
export const getAllCities = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching cities';
  }
};

// Get city by ID
export const getCityById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching city';
  }
};

// Add a new city
export const addCity = async (city) => {
  try {
    const response = await axios.post(`${API_URL}`, city);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding city';
  }
};

// Update city by ID
export const updateCityById = async (id, city) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, city);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error updating city';
  }
};

// Delete city by ID
export const deleteCityById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting city';
  }
};

// Search cities by term
export const searchCities = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { searchTerm }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error searching cities';
  }
};
