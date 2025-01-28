import React, { useState, useEffect } from "react";
import { Button, Typography, TextField, Modal, MenuItem, Select, InputLabel, FormControl } from "@material-ui/core";
import { getMovieById } from '../../services/MovieService'; // Adjust the import based on your file structure

const MoviePopUp = ({ movieId, handleClose, cinemas }) => {
  const [movie, setMovie] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ firstName: '', lastName: '' });
  const [selectedCinema, setSelectedCinema] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Fetch movie details when the movieId changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movieId) {
        try {
          const data = await getMovieById(movieId);
          setMovie(data);
          setTotalPrice(data.price); // Set the initial total price based on the movie price
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Handle cinema selection change
  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  // Handle ticket count change
  const handleTicketCountChange = (event) => {
    setTicketCount(event.target.value);
  };

  // Handle customer information change
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate the total price
  useEffect(() => {
    if (movie) {
      setTotalPrice(movie.price * ticketCount);
    }
  }, [ticketCount, movie]);

  // Handle payment confirmation
  const handlePayment = () => {
    if (selectedCinema && customerInfo.firstName && customerInfo.lastName && ticketCount > 0) {
      setPaymentConfirmed(true);
      // Optionally, you can send the payment request to the backend here.
      // Handle payment logic like API request, confirmation, etc.
    } else {
      alert("Please fill all fields before confirming payment.");
    }
  };

  const handleClosePopup = () => {
    setMovie(null); // Reset movie data
    handleClose(); // Close modal
  };

  return (
    <Modal
      open={true}
      onClose={handleClosePopup}
      aria-labelledby="movie-popup-title"
      aria-describedby="movie-popup-description"
    >
      <div style={modalStyles.content}>
        {movie && (
          <div>
            <Typography variant="h4" style={{ fontWeight: 'bold' }}>
              {movie.title}
            </Typography>
            <img src={movie.imageUrl} alt={movie.title} style={{ width: '100%', maxWidth: '300px' }} />
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              {movie.description}
            </Typography>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Duration: {movie.duration} min | Rating: {movie.rating} | Language: {movie.language}
            </Typography>

            <div style={{ marginTop: '20px' }}>
              {/* Cinema Selection */}
              <FormControl fullWidth style={{ marginBottom: '10px' }}>
                <InputLabel>Select Cinema</InputLabel>
                <Select
                  value={selectedCinema}
                  onChange={handleCinemaChange}
                  label="Select Cinema"
                >
                  {Array.isArray(cinemas) && cinemas.length > 0 ? (
                    cinemas.map((cinema) => (
                      <MenuItem key={cinema.id} value={cinema.id}>
                        {cinema.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No cinemas available</MenuItem>
                  )}
                </Select>
              </FormControl>

              {/* Customer Info */}
              <TextField
                label="First Name"
                name="firstName"
                value={customerInfo.firstName}
                onChange={handleCustomerInfoChange}
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={customerInfo.lastName}
                onChange={handleCustomerInfoChange}
                fullWidth
                style={{ marginBottom: '20px' }}
              />

              {/* Ticket Count */}
              <TextField
                type="number"
                label="Number of Tickets"
                value={ticketCount}
                onChange={handleTicketCountChange}
                fullWidth
                style={{ marginBottom: '20px' }}
                InputProps={{ inputProps: { min: 1 } }} // Ensure at least 1 ticket is selected
              />

              {/* Total Price */}
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>

              {/* Payment Confirmation */}
              {paymentConfirmed ? (
                <Typography variant="body1" color="green" style={{ marginBottom: '10px' }}>
                  Payment confirmed! Your ticket is booked.
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePayment}
                  fullWidth
                  style={{ marginBottom: '20px' }}
                >
                  Confirm Payment
                </Button>
              )}

              {/* Close Button */}
              <Button variant="outlined" color="secondary" onClick={handleClosePopup} fullWidth>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const modalStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default MoviePopUp;