import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <a href="#home" className="logo" onClick={closeMenu}>
        TRATTORIA
      </a>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#menu" onClick={closeMenu}>Menu</a>
        <a href="#gallery" onClick={closeMenu}>Gallery</a>
        <a href="#reviews" onClick={closeMenu}>Reviews</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>

        <a
          href="#reservation"
          className="reserve-btn"
          onClick={closeMenu}
        >
          Reserve Table
        </a>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;