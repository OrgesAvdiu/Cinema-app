import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cinema = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  const categories = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance"];

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      color: "#fff",
      backgroundColor: "#121212",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
      padding: "10px 20px",
      backgroundColor: "#242424",
    },
    logoAndNav: {
      display: "flex",
      alignItems: "center",
      gap: "30px", // Space between logo and navigation links
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
      gap: "15px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#e50914",
      color: "#fff",
      padding: "10px 20px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    main: {
      marginBottom: "20px",
    },
    movieGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "15px",
    },
    movieCard: {
      textAlign: "center",
      backgroundColor: "#222",
      padding: "10px",
      borderRadius: "8px",
    },
    movieImage: {
      width: "100%",
      borderRadius: "8px",
      marginBottom: "8px",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
      borderTop: "1px solid #333",
      paddingTop: "20px",
    },
    footerSection: {
      flex: "1 1 200px",
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
          <button style={styles.button}>
            <FaSignInAlt /> Log In
          </button>
          <button style={styles.button}>Join</button>
        </div>
      </header>
      <main style={styles.main}>
        <div style={styles.movieGrid}>
          {[
            "Better Man",
            "Gladiator",
            "Mufasa",
            "Sonic 3",
            "Trouble Shooters",
            "Valana 2",
          ].map((movie, index) => (
            <div style={styles.movieCard} key={index}>
              <img
                src={`https://via.placeholder.com/150?text=${movie}`}
                alt={movie}
                style={styles.movieImage}
              />
              <p>{movie}</p>
            </div>
          ))}
        </div>
      </main>
      <footer style={styles.footer}>
        <div style={styles.footerSection}>
          <p>FILMA</p>
          <ul>
            <li>Top Film</li>
            <li>Tani në kinema</li>
            <li>Vijnë së shpejti</li>
          </ul>
        </div>
        <div style={styles.footerSection}>
          <p>KINEMATË</p>
          <ul>
            <li>Prishtina</li>
            <li>Prizren</li>
          </ul>
        </div>
        <div style={styles.footerSection}>
          <p>INFORMACION</p>
          <ul>
            <li>Teknologjia</li>
            <li>Karta Bonus</li>
            <li>Klubi Familjar</li>
          </ul>
        </div>
        <div style={styles.apps}>
          <p>CINEMAAPP APPS</p>
          <img
            src="https://via.placeholder.com/120x40?text=App+Store"
            alt="App Store"
            style={styles.appImage}
          />
          <img
            src="https://via.placeholder.com/120x40?text=Google+Play"
            alt="Google Play"
            style={styles.appImage}
          />
        </div>
      </footer>
    </div>
  );
};

export default Cinema;
