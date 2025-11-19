
import React, { useRef, useEffect, useState } from 'react';

const WebsiteReveal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true }); // Explicit alpha for performance
    if (!ctx) return;

    // Setup sizing
    const setSize = () => {
        const dpr = window.devicePixelRatio || 1;
        // Cap DPR at 2 to avoid massive canvases on 3x/4x screens
        const safeDpr = Math.min(dpr, 2); 
        
        canvas.width = window.innerWidth * safeDpr;
        canvas.height = window.innerHeight * safeDpr;
        ctx.scale(safeDpr, safeDpr);
        
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // OPTIMIZATION: Reduced from 40x80 (3200 blocks) to 12x24 (288 blocks)
    // This is ~90% lighter on the GPU while keeping the chunky brutalist look.
    const rows = 12; 
    const columns = 24;
    const duration = 0.8; // Faster reveal (was 1.2s)

    const totalBlocks = rows * columns;
    
    // Pre-calculate delays
    const blocks = new Float32Array(totalBlocks);
    for (let i = 0; i < totalBlocks; i++) {
        const col = i % columns;
        const xProgress = col / columns;
        const noise = Math.random();
        // Simplified progress logic
        const progress = (xProgress * 0.4) + (noise * 0.6);
        blocks[i] = progress * 0.4; 
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const draw = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#050505";

        let activeBlocks = 0;
        
        // Calculate dimensions once per frame
        // Use logic width/height (window inner sizes)
        const rectW = window.innerWidth / columns;
        const rectH = window.innerHeight / rows;

        // Expand slightly to fix sub-pixel gaps
        const drawW = Math.ceil(rectW + 1);
        const drawH = Math.ceil(rectH + 1);

        for (let i = 0; i < totalBlocks; i++) {
            const delay = blocks[i];
            const timeSinceStart = elapsed - delay;
            
            if (timeSinceStart < duration) {
                activeBlocks++;
                
                let opacity = 1;
                if (timeSinceStart > 0) {
                    const t = timeSinceStart / duration;
                    // Faster falloff
                    opacity = 1 - (t * t * (3 - 2 * t));
                }

                if (opacity > 0.05) {
                    ctx.globalAlpha = opacity;
                    const c = i % columns;
                    const r = Math.floor(i / columns);
                    
                    ctx.fillRect(
                        Math.floor(c * rectW),
                        Math.floor(r * rectH),
                        drawW,
                        drawH
                    );
                }
            }
        }

        if (activeBlocks > 0) {
            animationFrameId = requestAnimationFrame(draw);
        } else {
            setIsComplete(true);
        }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
        window.removeEventListener('resize', setSize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isComplete) return null;

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
};

export default WebsiteReveal;
