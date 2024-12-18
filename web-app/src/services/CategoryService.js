import axios from 'axios';

const API_URL = 'https://localhost:7189/api/Categories'; // Adjust the URL as per your API

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error fetching categories';
  }
};

// Add a new category
export const addCategory = async (category) => {
  try {
    const response = await axios.post(API_URL, category);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error adding category';
  }
};

// Update category by ID
export const updateCategoryById = async (id, category) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, category);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : 'Error updating category';
    }
  };
  

// Delete category by ID
export const deleteCategoryById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Error deleting category';
  }
};
