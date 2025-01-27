import { width } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { getAllMovies } from "../../services/MovieService"; // Import the getAllMovies function
import { FaMapMarkerAlt, FaSignInAlt, FaSearch, FaCalendarAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import the icons

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]); // State for storing movies
  const [sliderImages, setSliderImages] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false); 
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); 
  const [searchIconHovered, setSearchIconHovered] = useState(false); 

  const categories = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance"];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovies();
        console.log("Movies fetched:", moviesData); // Log the fetched data
        const adjustedMovies = moviesData.map(movie => ({
          ...movie,
          imageUrl: movie.imageUrl.replace("/web-app/public", "") // Adjust the image URL
        }));
        setMovies(adjustedMovies);
        const sliderImages = [
          { title: "Slider Image 1", imageUrl: "/SliderImages/Interstellar.jpg" },
          { title: "Slider Image 2", imageUrl: "/SliderImages/Joker.jpg" },
          { title: "Slider Image 3", imageUrl: "/SliderImages/Shawshank Redemption.jpg" }
        ];

        setSliderImages(sliderImages);
      } catch (error) {
        console.error("There was an error fetching the movies!", error);
      }
    };

    fetchMovies();

  // Set up the interval for automatic sliding
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  }, 3000); // Change slide every 3 seconds

  // Clear the interval when the component unmounts
  return () => {
    clearInterval(interval);
  };
}, [sliderImages.length]); // Re-run the effect if the length of sliderImages changes


const nextSlide = () => {
  setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
};

const prevSlide = () => {
  setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
};
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#121212", // Dark background color for the entire page
      color: "#fff", // White text color
      
    },
    
      selectCityAndDateWrapper: {
        display: "flex", // Flexbox for horizontal alignment
        flexDirection: "row", // Arrange items in a row
        alignItems: "center", // Vertically align items in the row
        justifyContent: "flex-end", // Push elements to the right
        marginTop: "20px", // Space below the slider
        paddingRight: "10%", // Padding on the right for alignment
        gap: "20px", // Space between "Select City" and "Select Date"
        width: "84%" ,
      },
   
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#242424",
      color: "#fff",
   
    },
    navLogo: {
      fontSize: "26px",
      fontWeight: "bold",
      color: "#e50914", // Red color
      textTransform: "uppercase", // All uppercase letters
      fontStyle: "italic", // Italic text
    },
    navLinks: {
      display: "flex",
      gap: "10px", // Reduced gap for the links to stay closer to the logo
      marginRight: "883px", // Added margin to move them slightly to the left
      position: "relative", // Needed to position the category dropdown properly
    },
    navLink: {
      color: "#aaa", // Gray color for the links
      textDecoration: "none",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "color 0.3s", // Smooth transition effect for color change
    },
    navLinkHover: {
      color: "#fff", // White color on hover
    },
    navButtons: {
      display: "flex",
      gap: "15px",
    },
    button: {
      backgroundColor: "#e50914",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    searchBarSection: {
      margin: "20px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // Center items vertically
      position: "relative", // Ensure that the search bar is positioned relative to this container
    },
    searchBar: {
      position: "absolute", // Keep the search bar absolutely positioned within its container
      right: "0", // Position the search bar to the right side of the navbar
      width: showSearchInput ? "200px" : "0", // Smoothly expand the search bar when visible
      padding: "12px",
      borderRadius: "4px",
      border: "none",
      display: "flex",
      alignItems: "center", // Align the icon and input
      opacity: showSearchInput ? 1 : 0, // Fade in and out for smooth transition
      visibility: showSearchInput ? "visible" : "hidden", // Toggle visibility
      transition: "width 0.3s ease, opacity 0.3s ease", // Smooth width and opacity transition
      zIndex: 10, // Ensure the search bar appears on top of other elements
    },
    searchIcon: {
      fontSize: "20px", // Adjust size as needed
      color: searchIconHovered ? "#fff" : "#e50914", // Change color on hover
      cursor: "pointer", // Make the icon clickable
      position: "absolute", // Position the icon absolute to move it in front of the search bar
      right: showSearchInput ? "210px" : "10px", // Move the icon in front of the search bar when it is expanded
      transition: "right 0.3s ease", // Smooth transition for the icon position
      zIndex: 20, // Ensure the search icon appears on top of the search bar
      margin: "0 10px"
    },
    selectCityWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    locationIcon: {
      fontSize: "20px",
      color: "#e50914",
    },
    dropdown: {
      padding: "10px",
      borderRadius: "4px",
      width: "150px", // Adjust the width to fit your design
      fontSize: "14px",
      border: "none",
      outline: "none",
    },
    calendarIcon: {
      fontSize: "20px", // Calendar icon size
      color: "#e50914", // Icon color
    },
    heroSection: {
      backgroundColor: "transparent",
      color: "#fff",
      textAlign: "center",
      padding: "60px 20px",
      borderRadius: "8px",
      margin: "20px 0",
      position: "relative",
    },
    heroHeading: {
      fontSize: "48px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    heroText: {
      fontSize: "18px",
      marginBottom: "20px",
    },
    ctaButton: {
      backgroundColor: "#e50914",
      color: "#fff",
      padding: "12px 24px",
      fontSize: "16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    sliderContainer: {
      position: "relative",
      width: "70%", // Set to half of the page width
      margin: "0 auto", // Center the slider
      overflow: "hidden",
      borderRadius: "8px",
      height: "300px",

    },
      slideTrack: {
      display: "flex",
      transition: "transform 0.5s ease-in-out",
      width: `${sliderImages.length * 100}%`, // Set the width based on the number of images
    },
    slide: {
      display: "flex",
      transition: "transform 0.5s ease-in-out",
      width: "100%",
    },
    slideImage: {
      width: "100%",
      objectFit: "cover",
      height: "400px", // Shortened height
    },
    arrowButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#fff",
      border: "none",
      padding: "10px",
      fontSize: "20px",
      cursor: "pointer",
      zIndex: 10,
    },
    leftArrow: {
      left: "10px",
    },
    rightArrow: {
      right: "10px",
    },
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
    movieTitle: {
      fontSize: "16px",
      fontWeight: "bold",
    },
    movieDate: {
      fontSize: "14px",
      color: "#888",
    },
    footer: {
      backgroundColor: "#1a1a1a", // Slightly brighter footer
      color: "#fff",
      padding: "20px",
      textAlign: "center",
      marginTop: "40px",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .image-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .zoom-out img {
            transform: scale(1.05); /* Adjust the scale value as needed */
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1.05); /* Center and scale down */
          }
        `}
      </style>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navLogo}>CinemaApp</div>
        <div style={styles.navLinks}>
        <a
  style={{
    ...styles.navLink,
    cursor: "default", // Make it look like a static text
    color: "#fff", // Set a distinct color for the "Movie" text
  }}
>
  Movie
</a>

          <a 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = "#fff"} 
            onMouseLeave={(e) => e.target.style.color = "#aaa"}
            href="/cinema" 
          >
            Cinema
          </a>
          <a 
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = "#fff"} 
            onMouseLeave={(e) => e.target.style.color = "#aaa"}
            href="#"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} // Toggle category dropdown visibility
          >
            Category
          </a>
          {showCategoryDropdown && (
            <div style={{ ...styles.dropdown, position: "absolute", top: "30px", backgroundColor: "#242424", padding: "10px", borderRadius: "4px" }}>
              {categories.map((category, index) => (
                <div key={index} style={{ padding: "8px", color: "#fff" }}>{category}</div>
              ))}
            </div>
          )}
        </div>
            {/* Search Bar and Dropdowns */}
            <div style={styles.searchBarSection}>
  <FaSearch 
    style={styles.searchIcon}
    onMouseEnter={() => setSearchIconHovered(true)} // Set hover state to true
    onMouseLeave={() => setSearchIconHovered(false)} // Set hover state to false
    onClick={() => setShowSearchInput(!showSearchInput)} // Toggle search input visibility
  />
  <div style={styles.searchBar}>
    <input
      type="text"
      placeholder="Search for movies..."
      style={{ width: "100%", padding: "12px", borderRadius: "4px", border: "none" }}
    />
  </div>
</div>
        <div style={styles.navButtons}>
          <button style={styles.button}><FaSignInAlt style={{ verticalAlign: 'middle', marginRight: "8px" }} /> Log In</button>
          <button style={styles.button}>Join</button>
        </div>
      </div>

  

      {/* Hero Section with Slider */}
      <div style={styles.sliderContainer}>
  <div style={{ ...styles.slideTrack, transform: `translateX(-${currentIndex * (100 / sliderImages.length)}%)` }}>
    {sliderImages.map((image, index) => (
      <div key={index} style={styles.slide}>
        <div className={index === 2 ? "image-wrapper zoom-out" : "image-wrapper"}>
        <img src={image.imageUrl} alt={image.title} style={styles.slideImage} />
      </div>
      </div>
    ))}
  </div>
  <button style={{ ...styles.arrowButton, ...styles.leftArrow }} onClick={prevSlide}><FaArrowLeft /></button>
  <button style={{ ...styles.arrowButton, ...styles.rightArrow }} onClick={nextSlide}><FaArrowRight /></button>
</div>

      <div style={styles.selectCityAndDateWrapper}>
  {/* Select City */}
  <div style={styles.selectCityWrapper}>
    <FaMapMarkerAlt style={styles.locationIcon} />
    <select style={styles.dropdown}>
      <option>Select City</option>
      <option>New York</option>
      <option>Los Angeles</option>
      <option>Chicago</option>
    </select>
  </div>

  {/* Select Date */}
  <div style={styles.selectCityWrapper}>
    <FaCalendarAlt style={styles.calendarIcon} />
    <select style={styles.dropdown}>
      <option>Select Date</option>
      <option>Today</option>
      <option>Tomorrow</option>
      <option>This Weekend</option>
    </select>
  </div>
</div>


      {/* Movie Row Section */}
      <div style={styles.movieRowContainer}>
      {movies.map((movie, index) => (
  <div key={index} style={styles.movieCard}>
    <img
      src={movie.imageUrl}
      alt={movie.title}
      style={styles.movieImage}
    />
    <div style={styles.movieDetails}>
      <p style={styles.movieTitle}>{movie.title}</p>
      <p style={styles.movieDate}>Release Date: {new Date(movie.releaseDate).toLocaleDateString() || "TBD"}</p>
    </div>
  </div>
))}

      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>© 2024 CinemaApp. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;