import React, { useState, useEffect } from "react";
import { getMovieById } from '../../services/MovieService'; // Adjust the import based on your file structure
import MoviePopUp from './MoviePopUp'; // Import MoviePopUp

const MovieList = ({ movies, cinemas }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [movie, setMovie] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);

  // Fetch movie details when the movieId changes
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (selectedMovieId) {
        try {
          const data = await getMovieById(selectedMovieId);
          setMovie(data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    };

    fetchMovieDetails();
  }, [selectedMovieId]);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId); // Set selected movie ID
    setShowPopUp(true); // Show the MoviePopUp
  };

  const handleClosePopup = () => {
    setSelectedMovieId(null); // Reset movie ID
    setShowPopUp(false); // Close the popup
    setMovie(null); // Reset movie data
  };

  return (
    <div style={styles.movieRowContainer}>
      {movies.map((movie, index) => (
        <div key={index} style={styles.movieCard} onClick={() => handleMovieClick(movie.id)}>
          <img
            src={movie.imageUrl}
            alt={movie.title}
            style={styles.movieImage}
          />
          <div style={styles.movieDetails}>
            <p style={styles.movieTitle}>{movie.title}</p>
            <p style={styles.movieDate}>
              Release Date: {new Date(movie.releaseDate).toLocaleDateString() || "TBD"}
            </p>
            <p style={styles.moviePrice}></p>
          </div>
        </div>
      ))}

      {/* Show MoviePopUp if showPopUp is true */}
      {showPopUp && movie && (
        <MoviePopUp 
          movieId={selectedMovieId} 
          handleClose={handleClosePopup} 
          cinemas={cinemas} 
        />
      )}
    </div>
  );
};

const styles = {
  movieRowContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1px",
    marginTop: "40px",
    marginBottom: "40px",
    padding: "0 10%", // Add padding to the left and right for more space
  },
  movieCard: {
    width: "23%",
    textAlign: "center",
    cursor: "pointer", // Add cursor pointer to indicate clickable
  },
  movieImage: {
    width: "80%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  movieDetails: {
    marginTop: "10px",
  },
  moviePrice: {
    marginTop: "10px",
  },
  movieTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  movieDate: {
    fontSize: "14px",
    color: "#888",
  },
};

export default MovieList;