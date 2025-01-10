import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Navbar = () => {
  return (
    <div style={{ padding: "10px", backgroundColor: "#333", color: "#fff", textAlign: "right" }}>
      {/* Navigation link to the HomePage */}
      <Link to="/" style={{ color: "#fff", textDecoration: "none", margin: "0 10px" }}>Home</Link>
      {/* Navigation link to the Dashboard */}
      <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none", margin: "0 10px" }}>Dashboard</Link>
    </div>
  );
};

export default Navbar;
