import React from 'react';
// Import the image relative to this file
import logoImg from './logo.webp'; 

const Logo: React.FC = () => {
  return (
    <div className="block">
      <img 
        src={logoImg} 
        alt="Leadify Logo" 
        // Adjust h-12 (48px) to fit your preference. 
        // object-contain ensures it doesn't stretch.
        className="h-12 w-auto object-contain" 
      />
    </div>
  );
};

export default Logo;