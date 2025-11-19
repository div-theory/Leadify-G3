
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PixelReveal from './PixelReveal';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  icon?: boolean;
  className?: string;
}

const NOISE_SVG_URI = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E`;

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, icon, className = '', ...props }) => {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`
        relative inline-flex items-center justify-center px-8 py-4 
        font-mono text-sm tracking-wider uppercase 
        overflow-hidden group
        /* Layout & Colors */
        transition-colors duration-300
        ${isPrimary 
            ? 'bg-[#F97316] text-white' 
            : 'bg-transparent text-white hover:text-[#F97316] border-white/20 hover:border-[#F97316]'}
        ${className}
      `}
      {...props}
    >
      {/* Reveal Animation Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-auto">
        <PixelReveal 
            enableHover 
            // For primary (Orange), reveal with Black blocks for contrast
            // For secondary (Transparent), reveal with Orange blocks
            blockColor={isPrimary ? "#050505" : "#F97316"} 
            rows={12} 
            columns={24} 
            className="w-full h-full"
            duration={0.4}
        >
            {/* Invisible spacer to ensure the overlay fills the button */}
            <div className="w-full h-full opacity-0" />
        </PixelReveal>
      </div>

      {/* Dithered Border Construction */}
      <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay">
          {/* Top */}
          <div className="absolute top-0 left-0 w-full h-[1px] opacity-50" style={{ backgroundImage: `url("${NOISE_SVG_URI}")`, backgroundRepeat: 'repeat' }} />
          {/* Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-50" style={{ backgroundImage: `url("${NOISE_SVG_URI}")`, backgroundRepeat: 'repeat' }} />
          {/* Left */}
          <div className="absolute top-0 left-0 h-full w-[1px] opacity-50" style={{ backgroundImage: `url("${NOISE_SVG_URI}")`, backgroundRepeat: 'repeat' }} />
          {/* Right */}
          <div className="absolute top-0 right-0 h-full w-[1px] opacity-50" style={{ backgroundImage: `url("${NOISE_SVG_URI}")`, backgroundRepeat: 'repeat' }} />
      </div>

      {/* Dither Hover Background Layer */}
      <div className={`
        absolute inset-0 z-0
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200 ease-in-out
        ${isPrimary ? 'bg-white' : 'bg-white/[0.05]'}
      `}>
         {/* Noise Texture Overlay */}
         <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
                backgroundImage: `url("${NOISE_SVG_URI}")`,
                backgroundSize: '128px 128px',
                filter: 'contrast(150%)'
            }}
         />
      </div>

      {/* Content Layer */}
      <span className={`
        relative z-10 flex items-center gap-3 
        transition-colors duration-300
        ${isPrimary ? 'group-hover:text-black' : ''}
      `}>
        {children}
        {icon && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
      </span>
    </motion.button>
  );
};

export default Button;
