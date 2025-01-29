import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Movie'; // Adjust the URL based on your API's address

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching categories';
  }
};

// Create payment intent
export const createPaymentIntent = async (amount) => {
  try {
    const response = await axios.post('/api/payment/create-payment-intent', { amount });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error creating payment intent';
  }
};

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

// Add a new movie with image and price
export const addMovie = async (movie) => {
  const formData = new FormData();
  formData.append('title', movie.title);
  formData.append('description', movie.description);
  formData.append('duration', movie.duration);
  formData.append('releaseDate', movie.releaseDate);
  formData.append('rating', movie.rating);
  formData.append('language', movie.language);
  formData.append('imageUrl', movie.imageUrl); // Ensure imageUrl is included
  formData.append('price', movie.price); // Add this line

  if (Array.isArray(movie.categories)) {
    formData.append('categories', JSON.stringify(movie.categories));
  } else {
    formData.append('categories', JSON.stringify([]));
  }

  if (movie.imageFile) {
    formData.append('imageFile', movie.imageFile);
  }

  try {
    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding movie';
  }
};

// Update movie by ID with image and price
export const updateMovieById = async (id, movie) => {
  const formData = new FormData();
  formData.append('id', movie.id);
  formData.append('title', movie.title);
  formData.append('description', movie.description);
  formData.append('duration', movie.duration);
  formData.append('releaseDate', movie.releaseDate);
  formData.append('rating', movie.rating);
  formData.append('language', movie.language);
  formData.append('categories', JSON.stringify(movie.categories));
  formData.append('imageUrl', movie.imageUrl); // Ensure imageUrl is included
  formData.append('price', movie.price); // Add this line

  try {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error('Error updating movie:', error);
    console.error('Error details:', error.response ? error.response.data : error.message);
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