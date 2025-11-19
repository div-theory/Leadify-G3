
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10" }) => {
  return (
    <img 
      src="https://file-service-full-d1.s3-us-west-2.amazonaws.com/i/e9d000835416b01d98210757b777526b.png" 
      alt="Leadify Logo" 
      loading="eager"
      className={`object-contain ${className}`}
      style={{ filter: 'brightness(0) invert(1)' }} // Inverts dark colors to white for visibility on dark mode
    />
  );
};

export default Logo;
