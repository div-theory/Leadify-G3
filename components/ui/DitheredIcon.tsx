import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DitheredIconProps {
  icon: LucideIcon;
  className?: string;
}

const DitheredIcon: React.FC<DitheredIconProps> = ({ icon: Icon, className = "w-8 h-8" }) => {
  // Number of layers to create the 3D extrusion effect
  const depthLayers = 6;
  const layerSpacing = 1.5; // px distance between layers

  return (
    <div className="w-16 h-16 flex items-center justify-center perspective-1000">
      <motion.div
        className="relative preserve-3d w-full h-full flex items-center justify-center"
        animate={{
          rotateY: [0, 360],
          rotateX: [15, -15, 15],
        }}
        transition={{
          rotateY: { duration: 5, ease: "linear", repeat: Infinity },
          rotateX: { duration: 3, ease: "easeInOut", repeat: Infinity },
        }}
      >
        {/* Create a stack of icons to simulate 3D volume */}
        {Array.from({ length: depthLayers }).map((_, i) => {
          // Z-position for this layer
          // Extruding backwards
          const z = -i * layerSpacing;
          
          const isFront = i === 0;

          return (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center backface-visible"
              style={{
                transform: `translateZ(${z}px)`,
              }}
            >
              {/* 
                  Front Layer: Bright, Sharp, Dithered
                  Back Layers: Darker, creating the 'sides'/depth
              */}
              <Icon
                className={`${className}`}
                strokeWidth={isFront ? 2 : 3} // Thicker stroke for back layers to fill gaps
                color={isFront ? "#FFFFFF" : "rgba(255,255,255,0.2)"}
                style={{
                    filter: isFront ? 'url(#icon-dither-strong)' : undefined,
                    opacity: isFront ? 1 : 0.8
                }}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default DitheredIcon;