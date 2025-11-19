
import React, { useRef, useState, useEffect } from 'react';

interface PixelRevealProps {
  children: React.ReactNode;
  className?: string;
  blockColor?: string;
  delay?: number;
  duration?: number;
  rows?: number;
  columns?: number;
  direction?: 'left' | 'right';
  style?: React.CSSProperties;
  enableHover?: boolean;
}

const PixelReveal: React.FC<PixelRevealProps> = ({ 
  children, 
  className = "", 
  blockColor = "#050505",
  delay = 0,
  duration = 0.4, // Snappier default
  rows = 10, // OPTIMIZATION: Reduced default density (was 24)
  columns = 20, // OPTIMIZATION: Reduced default density (was 48)
  direction = 'left',
  style = {},
  enableHover = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 } // Trigger almost immediately when pixel is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle content resize with debounce to prevent thrashing
  useEffect(() => {
    if (!ref.current || !canvasRef.current) return;
    
    let timeoutId: number;
    const resizeObserver = new ResizeObserver(() => {
       clearTimeout(timeoutId);
       timeoutId = window.setTimeout(() => {
           if (canvasRef.current && ref.current) {
                const canvas = canvasRef.current;
                const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR
                const rect = ref.current.getBoundingClientRect();
                
                if (Math.abs(canvas.width - rect.width * dpr) > 5) {
                    canvas.width = rect.width * dpr;
                    canvas.height = rect.height * dpr;
                    const ctx = canvas.getContext('2d');
                    if (ctx) ctx.scale(dpr, dpr);
                    canvas.style.width = `${rect.width}px`;
                    canvas.style.height = `${rect.height}px`;
                }
           }
       }, 100);
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (enableHover && isComplete && !isScanning) {
      setIsScanning(true);
    }
  };

  const setupCanvas = (canvas: HTMLCanvasElement) => {
    if (!ref.current) return null;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = ref.current.getBoundingClientRect();
    
    // Only resize if strictly needed
    if (canvas.width === 0 || Math.abs(canvas.width - rect.width * dpr) > 1) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
    }
    
    return { ctx, rect };
  };

  // 1. Entrance Animation
  useEffect(() => {
    if (!isVisible || isComplete) return;
    if (!canvasRef.current || !ref.current) return;
    const canvas = canvasRef.current;
    
    let ctx: CanvasRenderingContext2D | null = null;
    let rect: DOMRect | null = null;

    const setup = setupCanvas(canvas);
    if (setup) {
        ctx = setup.ctx;
        rect = setup.rect;
    } else {
        return;
    }

    const computedStyle = getComputedStyle(ref.current);
    const cssColor = computedStyle.getPropertyValue('--reveal-color').trim();
    const effectiveColor = cssColor || blockColor;

    const totalBlocks = rows * columns;
    const blocks = new Float32Array(totalBlocks); 
    
    // Simplified random distribution
    for (let i = 0; i < totalBlocks; i++) {
      const col = i % columns;
      const xProgress = direction === 'left' ? col / columns : (columns - 1 - col) / columns;
      blocks[i] = delay + ((xProgress * 0.5) + (Math.random() * 0.5)) * 0.5; 
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const drawEntrance = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      
      // Avoid re-fetching setup every frame if possible, but needed for robustness
      // Optimized: Just use existing canvas dims
      if (!ctx) return;

      const width = rect!.width;
      const height = rect!.height;
      const blockW = width / columns;
      const blockH = height / rows;
      const drawW = Math.ceil(blockW + 0.5);
      const drawH = Math.ceil(blockH + 0.5);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = effectiveColor;

      let activeBlocks = 0;

      for (let i = 0; i < totalBlocks; i++) {
        const blockDelay = blocks[i];
        const timeSinceStart = elapsed - blockDelay;

        if (timeSinceStart < duration) {
            let opacity = 1;
            if (timeSinceStart > 0) {
               const t = timeSinceStart / duration;
               opacity = 1 - (t * t); // Simple quadratic ease out
            }

            if (opacity > 0.05) {
               activeBlocks++;
               ctx.globalAlpha = opacity;
               
               const col = i % columns;
               const row = Math.floor(i / columns);
               
               ctx.fillRect(
                   Math.floor(col * blockW), 
                   Math.floor(row * blockH), 
                   drawW, 
                   drawH
               );
            }
        }
      }

      if (activeBlocks > 0) {
        animationFrameId = requestAnimationFrame(drawEntrance);
      } else {
        ctx.clearRect(0, 0, width, height);
        setIsComplete(true);
      }
    };

    animationFrameId = requestAnimationFrame(drawEntrance);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isComplete, rows, columns, direction, delay, duration, blockColor]);


  // 2. Hover Scan Animation
  useEffect(() => {
    if (!isScanning || !canvasRef.current || !ref.current) return;
    const canvas = canvasRef.current;
    
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, rect } = setup;

    const computedStyle = getComputedStyle(ref.current);
    const cssColor = computedStyle.getPropertyValue('--reveal-color').trim();
    const effectiveColor = cssColor || blockColor;

    let startTime: number | null = null;
    let animationFrameId: number;
    const scanDuration = 0.4; // Faster scan

    const drawScan = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = elapsed / scanDuration;

      if (progress >= 1) {
         ctx.clearRect(0, 0, rect.width, rect.height);
         setIsScanning(false);
         return;
      }

      const width = rect.width;
      const height = rect.height;
      const blockW = width / columns;
      const blockH = height / rows;
      const drawW = Math.ceil(blockW + 0.5);
      const drawH = Math.ceil(blockH + 0.5);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = effectiveColor;

      const maxDiagonal = columns + rows;
      const scanWidth = maxDiagonal * 0.2; 
      const scanPos = (progress * (maxDiagonal + scanWidth * 2)) - scanWidth;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const diagonalIndex = c + r; 
            const dist = Math.abs(diagonalIndex - scanPos);
            
            if (dist < scanWidth) {
                const normDist = dist / scanWidth;
                // Simplified probability check
                if (Math.random() > normDist) {
                    ctx.globalAlpha = 1 - normDist;
                    ctx.fillRect(
                        Math.floor(c * blockW),
                        Math.floor(r * blockH),
                        drawW,
                        drawH
                    );
                }
            }
        }
      }

      animationFrameId = requestAnimationFrame(drawScan);
    };

    animationFrameId = requestAnimationFrame(drawScan);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isScanning, rows, columns, blockColor]);

  return (
    <div 
      ref={ref} 
      className={`relative grid ${className}`} 
      onMouseEnter={handleMouseEnter}
      style={{ 
        gridTemplateAreas: "'stack'",
        ...style
      }}
    >
      <div className="z-10" style={{ gridArea: "stack" }}>
        {children}
      </div>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-200 ${(!isComplete || isScanning) ? 'opacity-100' : 'opacity-0'}`}
        style={{ gridArea: "stack" }}
      />
    </div>
  );
};

export default PixelReveal;
