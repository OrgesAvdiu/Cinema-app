import React, { useState, useEffect } from "react";
import { getAllMovies } from "../../services/MovieService"; 
import { FaMapMarkerAlt, FaSignInAlt, FaSearch, FaCalendarAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]); 
  const [sliderImages, setSliderImages] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false); 
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false); 
  const [searchIconHovered, setSearchIconHovered] = useState(false); 
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
      color: "#fff", 
      cursor: "pointer",
    },
    loginButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#e50914",
      color: "#fff",
      padding: "14px 28px", 
      border: "none", 
      borderRadius: "20px", 
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "0 4px 10px rgba(229, 9, 20, 0.4)",
      fontSize: "16px", 
    },
    joinButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#000", 
      color: "#fff",
      padding: "14px 28px", 
      border: "none", 
      borderRadius: "20px",
      cursor: "pointer",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", 
      fontSize: "16px",
    },
    selectCityAndDateWrapper: {
      display: "flex", 
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "center", 
      marginTop: "20px", 
      gap: "20px", 
      width: "100%",
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
      <header style={styles.header}>
        <div style={styles.logoAndNav}>
          <h1 style={styles.logo} onClick={() => navigate("/")}>CinemaApp</h1>
          <nav>
            <ul style={styles.nav}>
              {["Movie", "Cinema", "Category"].map((item) => (
                <li
                  key={item}
                  style={styles.navItem(
                    searchIconHovered === item,
                    item === "Movie"
                  )}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    if (item === "Cinema") {
                      navigate("/cinema");
                    } else if (item === "Category") {
                      setShowCategoryDropdown(!showCategoryDropdown);
                    }
                  }}
                >
                  {item}
                  {item === "Category" && (
                    <div style={styles.dropdownContainer}>
                      {showCategoryDropdown && (
                        <div style={styles.dropdown}>
                          {categories.map((category, index) => (
                            <div
                              key={index}
                              style={styles.dropdownItem}
                              onMouseEnter={(e) =>
                                (e.target.style.backgroundColor = "#333")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.backgroundColor = "transparent")
                              }
                            >
                              {category}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div style={styles.actions}>
          <div className="search-bar-section" style={styles.searchBarSection}>
            <FaSearch style={styles.searchIcon} onClick={() => setShowSearchInput(!showSearchInput)} />
            <input type="text" placeholder="Search for movies..." style={styles.searchBar} />
          </div>
          <button className="login-button" style={styles.loginButton}>
            <FaSignInAlt /> Log In
          </button>
          <button className="join-button" style={styles.joinButton}>Join</button>
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
          <select style={styles.dropdownSelect}>
            <option>Select City</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
          </select>
        </div>

        {/* Select Date */}
        <div style={styles.selectDateWrapper}>
          <FaCalendarAlt style={styles.calendarIcon} />
          <input type="date" style={styles.dateInput} />
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