import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Offers'; // Adjust the URL based on your API's address

// Get all offers
export const getAllOffers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching offers';
  }
};

// Get offer by ID
export const getOfferById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching offer';
  }
};

// Add a new offer
export const addOffer = async (offer) => {
  try {
    const response = await axios.post(`${API_URL}`, offer);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding offer';
  }
};

// Update offer by ID
export const updateOfferById = async (id, offer) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, offer);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error updating offer';
  }
};

// Delete offer by ID
export const deleteOfferById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting offer';
  }
};

// Search offers by title or description
export const searchOffers = async (searchTerm) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { searchTerm }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error searching offers';
  }
};
