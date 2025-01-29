import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaSearch, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../services/MovieService";

const Cinema = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [movies, setMovies] = useState([]);
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
      } catch (error) {
        console.error("There was an error fetching the movies!", error);
      }
    };

    fetchMovies();
  }, []);

  const styles = {
    button: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 24px",
      border: "2px solid transparent",
      borderRadius: "50px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    buttonHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.6)",
    },
    loginButton: {
      background: "#e50914",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(229, 9, 20, 0.4)",
    },
    joinButton: {
      background: "#000",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    },
    calendarButton: {
      background: "#000",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
      border: "2px solid #fff",
    },
    citiesButton: {
      background: "#000",
      color: "#fff",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
      border: "2px solid #fff",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "20px",
      marginTop: "20px",
    },
    container: {
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      backgroundColor: "#121212",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      margin: "0",
      padding: "0",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#242424",
      width: "100%",
      boxSizing: "border-box",
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
    },
    nav: {
      display: "flex",
      gap: "20px",
      listStyleType: "none",
      padding: 0,
      position: "relative",
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
    dropdown: {
      position: "absolute",
      top: "100%",
      left: "0",
      backgroundColor: "#242424",
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
    dropdownItemHover: {
      backgroundColor: "#333",
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
      border: "2px solid #fff",
      backgroundColor: "#fff",
      transition: "width 0.3s ease",
      opacity: showSearchInput ? 1 : 0,
      visibility: showSearchInput ? "visible" : "hidden",
    },
    searchIcon: {
      fontSize: "20px",
      color: "#fff",
      cursor: "pointer",
    },
    main: {
      flex: 1,
      padding: "20px",
      backgroundColor: "#121212",
      width: "100%",
      boxSizing: "border-box",
    },
    movieGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "15px",
    },
    movieCardContainer: {
      borderRadius: "8px",
      padding: "10px",
      backgroundColor: "#222",
    },
    movieCard: {
      textAlign: "center",
      backgroundColor: "#222",
      padding: "10px",
      borderRadius: "8px",
    },
    movieImage: {
      width: "150px",
      height: "225px",
      borderRadius: "8px",
      marginBottom: "8px",
      objectFit: "cover",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      padding: "20px 50px",
      backgroundColor: "#242424",
      width: "100%",
      boxSizing: "border-box",
      color: "#fff",
    },
    footerSection: {
      flex: "1 1 200px",
      marginBottom: "20px",
    },
    footerSectionTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "10px",
      borderBottom: "2px solid #e50914",
      display: "inline-block",
    },
    footerList: {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    },
    footerListItem: {
      marginBottom: "8px",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    footerListItemHover: {
      color: "#e50914",
    },
    apps: {
      textAlign: "center",
    },
    appImage: {
      margin: "10px 5px",
      width: "120px",
    },
  };

  const handleMouseEnter = (item) => setHoveredItem(item);
  const handleMouseLeave = () => setHoveredItem(null);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoAndNav}>
          <h1 style={styles.logo}>CINEMAAPP</h1>
          <nav>
            <ul style={styles.nav}>
              {["Movie", "Cinema", "Category"].map((item) => (
                <li
                  key={item}
                  style={styles.navItem(
                    hoveredItem === item,
                    item === "Cinema"
                  )}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    if (item === "Movie") {
                      navigate("/");
                    } else if (item === "Category") {
                      setShowCategoryDropdown(!showCategoryDropdown);
                    }
                  }}
                >
                  {item}
                  {item === "Category" && showCategoryDropdown && (
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
          <button className="login-button" style={{ ...styles.button, ...styles.loginButton }}>
            <FaSignInAlt /> Log In
          </button>
          <button className="join-button" style={{ ...styles.button, ...styles.joinButton }}>Join</button>
        </div>
      </header>
      <div className="button-container" style={styles.buttonContainer}>
        <button
          className="calendar-button"
          style={{ ...styles.button, ...styles.calendarButton, ...(hoveredItem === "calendar" && styles.buttonHover) }}
          onClick={() => alert("Calendar Clicked!")}
          onMouseEnter={() => setHoveredItem("calendar")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FaCalendarAlt /> Select Date
        </button>
        <button
          className="cities-button"
          style={{ ...styles.button, ...styles.citiesButton, ...(hoveredItem === "city" && styles.buttonHover) }}
          onClick={() => alert("Cities Clicked!")}
          onMouseEnter={() => setHoveredItem("city")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <FaMapMarkerAlt /> Select City
        </button>
      </div>
      <main style={styles.main}>
        <div className="movie-card-container" style={styles.movieCardContainer}>
          <div style={styles.movieGrid}>
            {movies.map((movie, index) => (
              <div style={styles.movieCard} key={index}>
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  style={styles.movieImage}
                />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer style={styles.footer}>
        <div style={styles.footerSection}>
          <div style={styles.footerSectionTitle}>FILMA</div>
          <ul style={styles.footerList}>
            <li style={styles.footerListItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Top Film
            </li>
            <li style={styles.footerListItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Tani në kinema
            </li>
            <li style={styles.footerListItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Vijnë së shpejti
            </li>
          </ul>
        </div>
        <div style={styles.footerSection}>
          <div style={styles.footerSectionTitle}>KINEMATË</div>
          <ul style={styles.footerList}>
            <li style={styles.footerListItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Prishtina
            </li>
            <li style={styles.footerListItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Prizren
            </li>
          </ul>
        </div>
        <div style={styles.footerSection}>
          <div style={styles.footerSectionTitle}>INFORMACION</div>
          <ul style={styles.footerList}>
            <li style={styles.footerListItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Teknologjia
            </li>
            <li style={styles.footerListItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Karta Bonus
            </li>
            <li style={styles.footerListItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Klubi Familjar
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Cinema;