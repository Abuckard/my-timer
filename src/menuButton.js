import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styling/menuStyling.css';

function MenuButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Växla menyens synlighet
  };

  return (
    <div className="menu-container">
      {/* Hamburgarmenyn */}
      <button className="menu-button" onClick={toggleMenu}>
        ☰ {/* Symbolen för hamburgarmenyn */}
      </button>

      {/* Menyn visas när användaren klickar på knappen */}
      {menuOpen && (
        <nav className="menu-links">
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/set-timer" onClick={toggleMenu}>Set Timer</Link>
            </li>
            <li>
              <Link to="/digital" onClick={toggleMenu}>Digital</Link>
            </li>
            <li>
              <Link to="/analog" onClick={toggleMenu}>Analog</Link>
            </li>
            <li>
              <Link to="/text" onClick={toggleMenu}>Text</Link>
            </li>
            <li>
              <Link to="/alarm" onClick={toggleMenu}>Alarm</Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default MenuButton;
