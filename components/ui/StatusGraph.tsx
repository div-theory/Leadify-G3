
import React, { useEffect, useRef } from 'react';

interface StatusGraphProps {
  color?: string;
  className?: string;
}

const StatusGraph: React.FC<StatusGraphProps> = ({ color = '#F97316', className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI setup
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Config
    const pointCount = 60;
    const points: number[] = new Array(pointCount).fill(0.5); // Start middle
    
    // Slower speed for smoother transitions
    const speed = 0.02; 
    let animationFrameId: number;
    
    // Target value for smoothing
    let target = 0.5;
    
    // Grid settings
    const gridSize = 30; // 30px square cells

    const draw = () => {
      // 1. Update Data
      // Random walk towards a varying target - reduced frequency for less erratic movement
      if (Math.random() < 0.02) target = Math.random() * 0.6 + 0.2; // New target between 0.2 and 0.8
      
      // Move last point towards target
      const current = points[points.length - 1];
      const next = current + (target - current) * speed;
      
      // Shift and push
      points.shift();
      points.push(next);

      // 2. Clear
      ctx.clearRect(0, 0, rect.width, rect.height);

      // 3. Draw Grid (Squares with subtle stroke)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Calculate coverage
      const cols = Math.ceil(rect.width / gridSize);
      const rows = Math.ceil(rect.height / gridSize);

      // Vertical lines
      for (let i = 0; i <= cols; i++) {
        const x = i * gridSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let i = 0; i <= rows; i++) {
        const y = i * gridSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
        ctx.stroke();
      }

      // 4. Draw Graph
      const step = rect.width / (pointCount - 1);
      
      ctx.beginPath();
      ctx.moveTo(0, rect.height - (points[0] * rect.height));
      
      // Create path
      for (let i = 1; i < pointCount; i++) {
        // Smooth curve
        const x = i * step;
        const y = rect.height - (points[i] * rect.height);
        
        // Quadratic Bezier for smoothness
        const prevX = (i - 1) * step;
        const prevY = rect.height - (points[i - 1] * rect.height);
        const cpX = (prevX + x) / 2;
        ctx.quadraticCurveTo(cpX, prevY, x, y);
      }

      // Gradient Fill
      const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
      gradient.addColorStop(0, `${color}80`); // 50% opacity
      gradient.addColorStop(1, `${color}00`); // 0% opacity

      ctx.lineTo(rect.width, rect.height);
      ctx.lineTo(0, rect.height);
      ctx.closePath();
      
      ctx.fillStyle = gradient;
      ctx.fill();

      // Stroke Line
      ctx.beginPath();
      ctx.moveTo(0, rect.height - (points[0] * rect.height));
       for (let i = 1; i < pointCount; i++) {
        const x = i * step;
        const y = rect.height - (points[i] * rect.height);
        const prevX = (i - 1) * step;
        const prevY = rect.height - (points[i - 1] * rect.height);
        const cpX = (prevX + x) / 2;
        ctx.quadraticCurveTo(cpX, prevY, x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. Draw Leading Dot
      const lastX = rect.width;
      const lastY = rect.height - (points[pointCount - 1] * rect.height);
      
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      
      // Glow
      ctx.beginPath();
      ctx.arc(lastX, lastY, 8, 0, Math.PI * 2);
      ctx.fillStyle = `${color}40`;
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [color]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
};

export default StatusGraph;
