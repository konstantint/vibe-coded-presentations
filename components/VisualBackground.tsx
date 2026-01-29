import React, { useRef, useEffect } from 'react';
import { VisualMode } from '../types';

interface VisualBackgroundProps {
  mode: VisualMode;
  accentColor: string;
}

const VisualBackground: React.FC<VisualBackgroundProps> = ({ mode, accentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = window.innerWidth < 768 ? 400 : 800;
      particlesRef.current = [];
      
      const cols = Math.floor(Math.sqrt(particleCount * (canvas.width / canvas.height)));
      const rows = Math.floor(particleCount / cols);
      const spacingX = canvas.width / cols;
      const spacingY = canvas.height / rows;

      for (let i = 0; i < particleCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: col * spacingX + spacingX / 2,
          baseY: row * spacingY + spacingY / 2,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          angle: Math.random() * Math.PI * 2,
          offset: Math.random() * 100, // For autonomous movement
          color: 'rgba(255, 255, 255, 0.5)',
          alpha: Math.random(), // For fading effects
          life: Math.random() * 100
        });
      }
    };

    const drawParticles = (time: number) => {
      // Clear with trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        // Behavior Logic based on Mode
        if (mode === VisualMode.GRID) {
          // Move towards base position (spring)
          const dx = p.baseX - p.x;
          const dy = p.baseY - p.y;
          p.x += dx * 0.05;
          p.y += dy * 0.05;
          ctx.fillStyle = `rgba(255, 255, 255, 0.3)`;
        } 
        else if (mode === VisualMode.CHAOS) {
          p.x += p.vx * 3;
          p.y += p.vy * 3;
          
          // Bounce off walls
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          
          ctx.fillStyle = accentColor;
        }
        else if (mode === VisualMode.FLOW) {
          // Flow field simulation
          const angle = (p.x / canvas.width) * Math.PI * 4 + (p.y / canvas.height) * Math.PI;
          p.vx = Math.cos(angle) * 2;
          p.vy = Math.sin(angle) * 2;
          p.x += p.vx;
          p.y += p.vy;
          
          // Smooth wrapping with fade
          if (p.x > canvas.width || p.x < 0 || p.y > canvas.height || p.y < 0) {
             // Reset to random position with 0 alpha
             p.x = Math.random() * canvas.width;
             p.y = Math.random() * canvas.height;
             p.alpha = 0;
          }

          // Fade in/out
          if (p.alpha < 0.6) p.alpha += 0.01;
          
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = p.alpha;
        }
        else if (mode === VisualMode.NETWORK) {
            // Autonomous Floating
            const t = time * 0.001;
            // Lissajous-like movement for organic drifting
            p.x += Math.sin(t + p.offset) * 0.5;
            p.y += Math.cos(t * 0.5 + p.offset) * 0.5;

            // Gentle wrap
            if (p.x < -50) p.x = canvas.width + 50;
            if (p.x > canvas.width + 50) p.x = -50;
            if (p.y < -50) p.y = canvas.height + 50;
            if (p.y > canvas.height + 50) p.y = -50;

            ctx.fillStyle = 'rgba(200, 200, 255, 0.3)';
            ctx.globalAlpha = 1;
        }
        else if (mode === VisualMode.CONVERGENCE) {
           // Spiral towards center
           const centerX = canvas.width / 2;
           const centerY = canvas.height / 2;
           const dx = p.x - centerX;
           const dy = p.y - centerY;
           const dist = Math.sqrt(dx*dx + dy*dy);
           
           const angle = Math.atan2(dy, dx);
           const velocity = 2;
           
           p.x -= Math.cos(angle + 0.2) * velocity;
           p.y -= Math.sin(angle + 0.2) * velocity;

           // Reset if too close
           if (dist < 10) {
               p.x = Math.random() * canvas.width;
               p.y = Math.random() * canvas.height;
           }
           ctx.fillStyle = accentColor;
           ctx.globalAlpha = 1;
        }
        else if (mode === VisualMode.EXPLOSION) {
            // Calm drift for the background of the explosion beat
            // The illustration layer handles the chaos
            p.x += p.vx * 0.5;
            p.y += p.vy * 0.5;
             if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
             if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
            ctx.globalAlpha = 1;
        }

        // Draw Point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha
      });

      // Connect lines in Network mode (Autonomous)
      if (mode === VisualMode.NETWORK) {
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = accentColor;
        
        // Connect nearby particles to each other
        for (let i = 0; i < particlesRef.current.length; i++) {
             // Only check a subset to save performance
             if (i % 4 !== 0) continue; 
             
             const p1 = particlesRef.current[i];
             // Check against a few others
             for (let j = i + 1; j < particlesRef.current.length; j += 10) {
                 const p2 = particlesRef.current[j];
                 const dx = p1.x - p2.x;
                 const dy = p1.y - p2.y;
                 const distSq = dx*dx + dy*dy;
                 
                 // Distance threshold: 100px (10000 sq)
                 if (distSq < 10000) {
                     ctx.beginPath();
                     ctx.moveTo(p1.x, p1.y);
                     ctx.lineTo(p2.x, p2.y);
                     ctx.globalAlpha = 1 - (distSq / 10000);
                     ctx.stroke();
                     ctx.globalAlpha = 1;
                 }
             }
        }
      }

      requestRef.current = requestAnimationFrame((t) => drawParticles(t));
    };

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    requestRef.current = requestAnimationFrame((t) => drawParticles(t));

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mode, accentColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};

export default VisualBackground;