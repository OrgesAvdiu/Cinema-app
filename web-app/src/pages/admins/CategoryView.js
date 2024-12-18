import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box, CircularProgress, Alert } from '@mui/material';
import { getAllCategories, addCategory, updateCategoryById, deleteCategoryById } from '../../services/CategoryService';

const CategoryView = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError('Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    setCategoryToEdit(category);
    if (category) {
      setNewCategory({ ...category });
    } else {
      setNewCategory({
        name: '',
        description: ''
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCategory = async () => {
    try {
      const addedCategory = await addCategory(newCategory);
      setCategories([...categories, addedCategory]);
      handleCloseModal();
    } catch (err) {
      setError('Failed to add category');
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await updateCategoryById(categoryToEdit.id, newCategory);
      setCategories(categories.map((cat) => (cat.id === categoryToEdit.id ? { ...cat, ...newCategory } : cat)));
      handleCloseModal();
    } catch (err) {
      setError('Failed to update category');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoryById(id);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <div>
      <h1>Category Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add Category
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenModal(category)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteCategory(category.id)}
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

      {/* Modal for creating or editing category */}
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
            boxShadow: 24
          }}
        >
          <h2>{categoryToEdit ? 'Edit Category' : 'Add Category'}</h2>
          <TextField
            label="Name"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Description"
            name="description"
            value={newCategory.description}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={categoryToEdit ? handleUpdateCategory : handleAddCategory}
          >
            {categoryToEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryView;
