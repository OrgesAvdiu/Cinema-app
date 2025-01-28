import React, { useState, useEffect, useRef } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TextField, Button, Modal, Box, CircularProgress, Alert, FormControl, Select, MenuItem, InputLabel
} from '@mui/material';
import { getAllMovies, addMovie, updateMovieById, deleteMovieById, getCategories } from '../../services/MovieService';

const MovieView = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriesError, setCategoriesError] = useState(null);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    duration: '',
    releaseDate: '',
    rating: '',
    language: '',
    imageName: '',
    categories: [],
    imageFile: null,
    imageUrl: '',
    price: '' // Add the price field
  });
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMoviesAndCategories = async () => {
      try {
        const [moviesData, categoriesData] = await Promise.all([getAllMovies(), getCategories()]);
        const savedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
        if (savedCategories) {
          setNewMovie((prevMovie) => ({
            ...prevMovie,
            categories: savedCategories,
          }));
        }
        const parsedMovies = moviesData.map((movie) => ({
          ...movie,
          categories: Array.isArray(movie.categories) ? movie.categories : JSON.parse(movie.categories || '[]'),
        }));
        setMovies(parsedMovies);
        setCategories(categoriesData);
      } catch (error) {
        setError('Error fetching movies or categories');
        console.error('Error fetching movies or categories:', error);
      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };
    fetchMoviesAndCategories();
  }, []);

  const handleOpenModal = (movie = null) => {
    setMovieToEdit(movie);
    if (movie) {
      setNewMovie({
        ...movie,
        imageFile: null, // Reset imageFile
        imageUrl: movie.imageUrl || '', // Set imageUrl if exists
        price: movie.price || '' // Ensure price is loaded for editing
      });
    } else {
      setNewMovie({
        title: '',
        description: '',
        duration: '',
        releaseDate: '',
        rating: '',
        language: '',
        imageName: '',
        categories: [],
        imageFile: null,
        imageUrl: '',
        price: '' // Reset price on opening modal for new movie
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewMovie({
      title: '',
      description: '',
      duration: '',
      releaseDate: '',
      rating: '',
      language: '',
      imageName: '',
      categories: [],
      imageFile: null,
      imageUrl: '',
      price: '' // Clear price on modal close
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (e) => {
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = `/web-app/public/Images/${file.name}`; // Update to correct path
      setNewMovie({
        ...newMovie,
        imageName: file.name,
        imageFile: file,
        imageUrl: imageUrl
      });
    }
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    const selectedCategories = typeof value === 'string' ? value.split(',') : value;
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    console.log('Selected categories:', selectedCategories);
    setNewMovie({
      ...newMovie,
      categories: selectedCategories,
    });
  };

  const handleAddMovie = async () => {
    try {
      const addedMovie = await addMovie({
        ...newMovie,
        categories: newMovie.categories
      });
      setMovies([...movies, addedMovie]);
      handleCloseModal();
    } catch (err) {
      setError('Error adding movie');
      console.error('Error adding movie:', err);
    }
  };

  const handleUpdateMovie = async () => {
    try {
      await updateMovieById(movieToEdit.id, {
        ...newMovie,
        categories: newMovie.categories
      });
      setMovies(movies.map((movie) => (movie.id === movieToEdit.id ? { ...movie, ...newMovie } : movie)));
      setMovieToEdit(null);
      handleCloseModal();
    } catch (err) {
      setError('Error updating movie');
      console.error('Error updating movie:', err);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovieById(id);
      setMovies(movies.filter((movie) => movie.id !== id));
      localStorage.removeItem('selectedCategories');
    } catch (err) {
      setError('Error deleting movie');
      console.error('Error deleting movie:', err);
    }
  };

  if (loading || categoriesLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (categoriesError) return <Alert severity="error">{categoriesError}</Alert>;

  return (
    <div>
      <h1>Movie Management</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add Movie
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.price}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>{movie.imageUrl}</TableCell>
                <TableCell>
                  {movie.categories && movie.categories.length > 0
                    ? movie.categories.join(', ')
                    : 'No categories selected'}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleOpenModal(movie)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteMovie(movie.id)}
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

      {/* Modal for creating or editing movie */}
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
            boxShadow: 24,
          }}
        >
          <h2>{movieToEdit ? 'Edit Movie' : 'Add Movie'}</h2>
          <TextField
            label="Title"
            name="title"
            value={newMovie.title}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Price"
            name="price"
            value={newMovie.price}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Description"
            name="description"
            value={newMovie.description}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Duration"
            name="duration"
            value={newMovie.duration}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Release Date"
            name="releaseDate"
            value={newMovie.releaseDate}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Rating"
            name="rating"
            value={newMovie.rating}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 10 }}
          />
          <TextField
            label="Language"
            name="language"
            value={newMovie.language}
            onChange={handleChange}
            fullWidth
            style={{ marginBottom: 20 }}
          />

          {/* Categories Dropdown */}
          <FormControl fullWidth style={{ marginBottom: 20 }}>
            <InputLabel>Categories</InputLabel>
            <Select
              label="Categories"
              multiple
              value={newMovie.categories}
              onChange={handleCategoryChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Custom File Input for Image */}
          <div style={{ marginBottom: 20 }}>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button variant="contained" component="span">
                Choose File
              </Button>
            </label>
            {newMovie.imageName && <p>Selected File: {newMovie.imageName}</p>}
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={movieToEdit ? handleUpdateMovie : handleAddMovie}
          >
            {movieToEdit ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieView;
