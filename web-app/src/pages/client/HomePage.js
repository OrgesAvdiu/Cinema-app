import React, { useState, useEffect } from "react";
import { getAllMovies } from "../../services/MovieService"; 
import { FaMapMarkerAlt, FaSignInAlt, FaSearch, FaCalendarAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import MovieList from "./MovieList";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]); 
  const [sliderImages, setSliderImages] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false); 
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); 
  const [searchIconHovered, setSearchIconHovered] = useState(false); 
  const [showPopup, setShowPopup] = useaState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const navigate = useNavigate();

  const categories = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance"];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovies();
        console.log("Movies fetched:", moviesData); 
        const adjustedMovies = moviesData.map(movie => ({
          ...movie,
          imageUrl: movie.imageUrl.replace("/web-app/public", "") 
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

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000); 

    return () => {
      clearInterval(interval);
    };
  }, [sliderImages.length]); 

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);
  };



const handleMovieClick = (movie) => {
  setSelectedMovieId(movie);
  setShowPopup(true);
};

const handleClosePopup = () => {
  setShowPopup(false);
  setSelectedMovieId(null);
};
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "black", 
      color: "#fff", 
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#242424", 
      color: "#242424",
      position: "relative", 
      zIndex: 50, 
    },
    logoAndNav: {
      display: "flex",
      alignItems: "center",
      gap: "30px", 
    },
    logo: {
      fontSize: "26px",
      fontWeight: "bold",
      color: "#e50914", 
      textTransform: "uppercase", 
      fontStyle: "italic", 
      cursor: "pointer", 
    },
    nav: {
      display: "flex",
      gap: "20px",
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
    navItem: (isHovered, isActive) => ({
      fontWeight: "bold",
      textDecoration: "none",
      color: isActive ? "#fff" : isHovered ? "#fff" : "#aaa",
      cursor: "pointer",
      transition: "color 0.3s ease",
      position: "relative",
    }),
    dropdownContainer: {
      position: "relative", 
    },
    dropdown: {
      position: "absolute", 
      top: "100%", 
      left: "0",
      backgroundColor: "#000", 
      color: "#fff",
      borderRadius: "4px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      padding: "10px",
      zIndex: 1000,
    },
    dropdownItem: {
      padding: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    searchBarSection: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    
    searchBar: {
      width: showSearchInput ? "200px" : "0",
      padding: "10px",
      borderRadius: "4px",
      border: "none", 
      transition: "width 0.3s ease",
      opacity: showSearchInput ? 1 : 0,
      visibility: showSearchInput ? "visible" : "hidden",
    },
    
    
    searchIcon: {
      fontSize: "20px",
      color: searchIconHovered ? "#fff" : "#e50914",
      cursor: "pointer",
      position: "absolute",
      right: showSearchInput ? "210px" : "10px",
      transition: "right 0.3s ease",
      zIndex: 20,
      margin: "0 10px"
    },
    selectCityWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    locationIcon: {
      fontSize: "20px",
      color: "#fff",
    },
    dropdownSelect: {
      backgroundColor: "#000", 
      color: "#fff", 
      padding: "10px",
      borderRadius: "20px",
      width: "150px",
      fontSize: "14px",
      border: "2px solid #fff", 
      outline: "none",
    },
    selectDateWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    calendarIcon: {
      fontSize: "20px", 
      color: "#fff", 
    },
    dateInput: {
      backgroundColor: "#000", 
      color: "#fff", 
      padding: "10px",
      borderRadius: "20px",
      width: "150px",
      fontSize: "14px",
      border: "2px solid #fff", 
      outline: "none",
      colorScheme: "dark",
    },
    sliderContainer: {
      position: "relative",
      width: "70%", 
      margin: "0 auto", 
      overflow: "hidden",
      borderRadius: "8px",
      height: "400px",
      zIndex: 1,
    },
    slideTrack: {
      display: "flex",
      transition: "transform 0.5s ease-in-out",
      width: `${sliderImages.length * 100}%`,
    },
    slide: {
      display: "flex",
      transition: "transform 0.5s ease-in-out",
      width: "100%",
    },
    slideImage: {
      width: "100%",
      height: "100%", 
      objectFit: "cover", 
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
      padding: "0 10%", 
    },
    movieCard: {
      width: "23%",
      textAlign: "center",
      cursor: "pointer",
  },
    movieImage: {
      width: "80%",
      height: "400px",
      objectFit: "cover",
      borderRadius: "8px",
      border: "none", 
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
      backgroundColor: "#000", 
      color: "#fff",
      padding: "20px",
      textAlign: "center",
      marginTop: "40px",
    },
  };

  const handleMouseEnter = (item) => setSearchIconHovered(item);
  const handleMouseLeave = () => setSearchIconHovered(null);

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
    cursor: "default",
    color: "#fff",
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
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
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
    onMouseEnter={() => setSearchIconHovered(true)}
    onMouseLeave={() => setSearchIconHovered(false)}
    onClick={() => setShowSearchInput(!showSearchInput)}
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
      </header>

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