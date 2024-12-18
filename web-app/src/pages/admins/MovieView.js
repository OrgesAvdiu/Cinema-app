import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, Box, CircularProgress, Alert } from '@mui/material';
import { getAllMovies, addMovie, updateMovieById, deleteMovieById } from '../../services/MovieService'; // Import the service

const MovieView = () => {
  const [movies, setMovies] = useState([]); // Movies from back-end
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    duration: '',
    releaseDate: '',
    rating: '',
    language: '',
    categories: []
  });
  const [openModal, setOpenModal] = useState(false);

  // Fetch movies from back-end
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

  const handleOpenModal = (movie = null) => {
    setMovieToEdit(movie);
    if (movie) {
      setNewMovie({ ...movie });
    } else {
      setNewMovie({
        title: '',
        description: '',
        duration: '',
        releaseDate: '',
        rating: '',
        language: '',
        categories: []
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

  const handleAddMovie = async () => {
    try {
      const addedMovie = await addMovie(newMovie);
      setMovies([...movies, addedMovie]);
      setNewMovie({
        title: '',
        description: '',
        duration: '',
        releaseDate: '',
        rating: '',
        language: '',
        categories: []
      });
      handleCloseModal();
    } catch (err) {
      setError('Failed to add movie');
    }
  };

  const handleUpdateMovie = async () => {
    try {
      await updateMovieById(movieToEdit.id, newMovie);
      setMovies(movies.map((movie) => (movie.id === movieToEdit.id ? { ...movie, ...newMovie } : movie)));
      setMovieToEdit(null);
      setNewMovie({
        title: '',
        description: '',
        duration: '',
        releaseDate: '',
        rating: '',
        language: '',
        categories: []
      }); // Reset the form
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.id}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.description}</TableCell>
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
