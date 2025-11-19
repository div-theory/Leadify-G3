
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const NOISE_SVG_URI = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E`;

const Input: React.FC<InputProps> = ({ label, error, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full group">
      <div className="flex justify-between items-end min-h-[20px]">
        <label className={`
            text-xs font-mono uppercase tracking-wider transition-colors duration-300
            ${error ? 'text-red-500' : 'text-white/60 group-focus-within:text-orange-500'}
        `}>
          {label}
        </label>
        
        <AnimatePresence mode="wait">
            {error && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-red-500"
                >
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-[10px] font-mono bg-red-500/10 px-1 py-0.5 border border-red-500/20">
                        [ERR]: {error}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <div className="relative">
          {/* Error Noise Overlay */}
          {error && (
              <div 
                className="absolute inset-0 pointer-events-none z-10 opacity-10 mix-blend-overlay"
                style={{ 
                    backgroundImage: `url("${NOISE_SVG_URI}")`,
                    backgroundColor: '#ef4444', // Red-500
                    backgroundSize: '128px 128px'
                }} 
              />
          )}

          <motion.input
            animate={error ? { x: [-4, 4, -2, 2, 0] } : {}}
            transition={{ duration: 0.3 }}
            className={`
              w-full bg-white/5 p-4 relative z-0
              text-white font-mono text-sm placeholder:text-white/20
              focus:outline-none 
              border transition-all duration-300
              ${error 
                ? 'border-red-500 focus:border-red-500 bg-red-900/10' 
                : 'border-white/10 focus:border-orange-500 focus:bg-white/10'
              }
              ${className}
            `}
            {...props}
          />
          
          {/* Glitch decorative corners for error */}
          <AnimatePresence>
          {error && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
             >
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500 pointer-events-none" />
             </motion.div>
          )}
          </AnimatePresence>
      </div>
    </div>
  );
};

export default Input;
