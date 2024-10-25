import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styling/loading.css';

function LoadingScreen() {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleStarClick = () => {
    setClicked(true);
    setTimeout(() => {
      navigate('/set-timer'); // Navigera efter en liten fördröjning
    }, 400); 
  };

  return (
    <div className="loading-container">
      <motion.div
        className="star"
        onClick={handleStarClick}
        animate={{
          rotate: 360, // Kontinuerlig rotation
          scale: clicked ? 1.5 : 1, // Förstora vid klick
        }}
        whileHover={{ scale: 1.3 }} // Förstora vid hover
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2, // Varje rotation tar 2 sekunder
          ease: 'linear',
          scale: { type: 'spring', stiffness: 200, damping: 10 }, // Bli större med fjädereffekt
        }}
      ></motion.div>
      <h2 className="loading-text">Welcome to the Timer App</h2>
    </div>
  );
}

export default LoadingScreen;
