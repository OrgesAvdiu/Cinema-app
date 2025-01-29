import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Payment'; // Adjust the URL based on your API's address

// Create a payment link
export const createPaymentLink = async (movieDetail) => {
  try {
    const response = await axios.post(`${API_URL}/create-link`, movieDetail);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error creating payment link';
  }
};

// Confirm payment
export const confirmPayment = async (movieDetail) => {
  try {
    const response = await axios.post(`${API_URL}/confirm-payment`, movieDetail);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error confirming payment';
  }
};