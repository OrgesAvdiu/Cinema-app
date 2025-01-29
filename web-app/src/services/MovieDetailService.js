import axios from 'axios';

const API_URL = 'https://localhost:7189/api/MovieDetail'; // Adjust the URL based on your API's address

// Get all movie details
export const getAllMovieDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching movie details';
  }
};

// Get movie detail by ID
export const getMovieDetailById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching movie detail';
  }
};

// Add a new movie detail with image
export const addMovieDetail = async (movieDetail) => {
  const formData = new FormData();
  formData.append('cinemaId', movieDetail.cinemaId);
  formData.append('numberOfTickets', movieDetail.numberOfTickets);
  formData.append('totalPrice', movieDetail.totalPrice);
  formData.append('paymentMethod', movieDetail.paymentMethod);
  formData.append('createdDate', movieDetail.createdDate);
  formData.append('updatedDate', movieDetail.updatedDate);

  

  try {
    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding movie detail';
  }
};

// Update movie detail by ID with image
export const updateMovieDetailById = async (id, movieDetail) => {
  const formData = new FormData();

  formData.append('cinemaId', movieDetail.cinemaId);
  formData.append('numberOfTickets', movieDetail.numberOfTickets);
  formData.append('totalPrice', movieDetail.totalPrice);
  formData.append('paymentMethod', movieDetail.paymentMethod);




  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Error updating movie detail:', error);
    console.error('Error details:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : 'Error updating movie detail';
  }
};

// Delete movie detail by ID
export const deleteMovieDetailById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting movie detail';
  }
};