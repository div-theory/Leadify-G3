
import React, { useRef, useState } from 'react';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
}

const NOISE_SVG_URI = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E`;

const MagicCard: React.FC<MagicCardProps> = ({ children, className = "" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden bg-white/[0.02] border border-white/10 ${className}`}
    >
      {/* Dithered Border Effect Overlay (Inner) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none opacity-10 mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_SVG_URI}")` }} 
      />

      {/* Spotlight Glow - Orange Tint */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(249, 115, 22, 0.1), transparent 40%)`,
        }}
      />

      {/* Grid Pattern Reveal - Square Lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 z-0"
        style={{
          opacity,
          // Create a square grid using linear gradients
          backgroundImage: `
            linear-gradient(to right, rgba(249, 115, 22, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(249, 115, 22, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          maskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black, transparent)`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default MagicCard;
