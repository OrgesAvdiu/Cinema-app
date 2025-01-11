import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box, CircularProgress, Alert, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { getAllMovies, addMovie, updateMovieById, deleteMovieById } from '../../services/MovieService';

const MovieView = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  });
  const [openModal, setOpenModal] = useState(false);

  const [categories, setCategories] = useState([
    'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance',
  ]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovies();
        setMovies(moviesData);
      } catch (error) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, []);
  
  console.log("New Movie Categories: ", newMovie.categories);

  const handleOpenModal = (movie = null) => {
    setMovieToEdit(movie);
    if (movie) {
      // Ensuring categories are correctly set when editing a movie
      setNewMovie({ ...movie, imageFile: null });
    } else {
      setNewMovie({
        title: '',
        description: '',
        duration: '',
        releaseDate: '',
        rating: '',
        language: '',
        imageName: '',
        categories: [], // Clear categories for a new movie
        imageFile: null,
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the image
      setNewMovie({
        ...newMovie,
        imageName: file.name,
        imageFile: file,
        imageUrl: imageUrl, // Set imageUrl
      });
    }
  };

  const handleAddMovie = async () => {
    try {
      const addedMovie = await addMovie({
        ...newMovie,
        categories: newMovie.categories,
      });
      setMovies([...movies, addedMovie]);
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
        imageUrl: '', // Reset imageUrl
      });
      handleCloseModal();
    } catch (err) {
      setError(JSON.stringify(err));
    }
  };
  const handleUpdateMovie = async () => {
    try {
      await updateMovieById(movieToEdit.id, {
        ...newMovie,
        categories: newMovie.categories, 
      });
      setMovies(movies.map((movie) => (movie.id === movieToEdit.id ? { ...movie, ...newMovie } : movie)));
      setMovieToEdit(null);
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
      });
      handleCloseModal();
    } catch (err) {
      setError('Failed to update movie');
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await deleteMovieById(id);
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (err) {
      setError('Failed to delete movie');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

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
              <TableCell>Description</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>{movie.categories ? movie.categories.join(', ') : 'No Categories'}</TableCell>
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
              onChange={(e) => {
                setNewMovie({ ...newMovie, categories: e.target.value });
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* File Input for Image */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          {newMovie.imageName && <p>Selected File: {newMovie.imageName}</p>}

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
