import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VisualMode } from '../types';

interface IllustrationLayerProps {
  mode: VisualMode;
}

const IllustrationLayer: React.FC<IllustrationLayerProps> = ({ mode }) => {
  return (
    <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">
        {mode === VisualMode.GRID && <GridIllustration key="grid" />}
        {mode === VisualMode.CHAOS && <ChaosIllustration key="chaos" />}
        {mode === VisualMode.FLOW && <FlowIllustration key="flow" />}
        {mode === VisualMode.NETWORK && <NetworkIllustration key="network" />}
        {mode === VisualMode.CONVERGENCE && <ScreenSimulation key="convergence" />}
        {mode === VisualMode.EXPLOSION && <FlockSimulation key="explosion" />}
      </AnimatePresence>
    </div>
  );
};

const GridIllustration = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 1 }}
    className="relative w-96 h-64 border-2 border-slate-500/30 rounded flex items-center justify-center"
  >
    <div className="absolute inset-4 border border-slate-500/20" />
    <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-500/20" />
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-500/20" />
    <motion.div 
      className="w-32 h-20 bg-slate-500/10 backdrop-blur-sm border border-slate-500/30"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const ChaosIllustration = () => (
  <div className="relative w-96 h-96">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-red-500/20 backdrop-blur-md border border-red-500/40"
        style={{
          width: 60 + Math.random() * 60,
          height: 60 + Math.random() * 60,
          left: '50%',
          top: '50%'
        }}
        initial={{ x: 0, y: 0, rotate: 0 }}
        animate={{
          x: (Math.random() - 0.5) * 400,
          y: (Math.random() - 0.5) * 400,
          rotate: Math.random() * 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />
    ))}
  </div>
);

const FlowIllustration = () => (
  <div className="absolute inset-0 w-full h-full">
    <svg className="w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
      {[...Array(5)].map((_, i) => (
        <motion.path
          key={i}
          d={`M0,${20 + i * 15} Q50,${10 + i * 15} 100,${20 + i * 15}`}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0.3, 0.6, 0.3],
            d: [
                `M0,${20 + i * 15} Q50,${10 + i * 15} 100,${20 + i * 15}`,
                `M0,${20 + i * 15} Q50,${30 + i * 15} 100,${20 + i * 15}`,
                `M0,${20 + i * 15} Q50,${10 + i * 15} 100,${20 + i * 15}`
            ]
          }}
          transition={{ 
            duration: 5 + i, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: i * 0.5
          }}
        />
      ))}
       {[...Array(5)].map((_, i) => (
        <motion.path
          key={`sub-${i}`}
          d={`M0,${25 + i * 15} Q50,${35 + i * 15} 100,${25 + i * 15}`}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
           animate={{ 
            d: [
                `M0,${25 + i * 15} Q50,${35 + i * 15} 100,${25 + i * 15}`,
                `M0,${25 + i * 15} Q50,${15 + i * 15} 100,${25 + i * 15}`,
                `M0,${25 + i * 15} Q50,${35 + i * 15} 100,${25 + i * 15}`
            ]
          }}
          transition={{ 
            duration: 7 + i, 
            repeat: Infinity, 
            ease: "easeInOut",
             delay: i * 0.3
          }}
        />
      ))}
    </svg>
  </div>
);

// --- CANVAS BASED ILLUSTRATIONS ---

// 1. Procedural Graph Automaton (Self-propagating)
const NetworkIllustration = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<{x: number, y: number, r: number, parent: number | null, age: number}[]>([]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Initial Seed
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        nodesRef.current = [{x: cx, y: cy, r: 0, parent: null, age: 0}];

        let frameId = 0;
        let frameCount = 0;

        const loop = () => {
            // Fade effect for trails
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0,0,canvas.width, canvas.height);

            // Logic: Every few frames, pick a random active node and grow
            if (frameCount % 5 === 0 && nodesRef.current.length < 200) {
                 // Prefer newer nodes to grow from
                 const candidates = nodesRef.current.filter(n => n.age < 50);
                 const source = candidates.length > 0 
                    ? candidates[Math.floor(Math.random() * candidates.length)]
                    : nodesRef.current[Math.floor(Math.random() * nodesRef.current.length)];
                
                 if (source) {
                     const angle = Math.random() * Math.PI * 2;
                     const len = 30 + Math.random() * 50;
                     const nx = source.x + Math.cos(angle) * len;
                     const ny = source.y + Math.sin(angle) * len;
                     
                     // Boundary check
                     if (nx > 0 && nx < canvas.width && ny > 0 && ny < canvas.height) {
                         nodesRef.current.push({
                             x: nx,
                             y: ny,
                             r: 3,
                             parent: nodesRef.current.indexOf(source),
                             age: 0
                         });
                     }
                 }
            }

            // Draw Lines & Nodes
            ctx.strokeStyle = '#a855f7';
            ctx.fillStyle = '#a855f7';
            
            nodesRef.current.forEach(node => {
                node.age++;
                if (node.parent !== null) {
                    const parent = nodesRef.current[node.parent];
                    ctx.beginPath();
                    ctx.lineWidth = Math.max(0.1, 2 - node.age * 0.05); // Fade out lines over time
                    ctx.moveTo(parent.x, parent.y);
                    ctx.lineTo(node.x, node.y);
                    ctx.stroke();
                }
                
                // Pulsing nodes
                const pulse = Math.sin(frameCount * 0.1 + node.x) * 2;
                if (node.age < 100) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, Math.max(0, node.r + pulse), 0, Math.PI*2);
                    ctx.fill();
                }
            });

            // Clean up old nodes
            if (nodesRef.current.length > 300) {
                nodesRef.current.splice(0, 10);
                // Reset parent indices would be complex, simpler to just let them drift visually in this ephemeral viz
            }

            frameCount++;
            frameId = requestAnimationFrame(loop);
        };
        loop();

        return () => cancelAnimationFrame(frameId);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />;
}


// 2. 3D Flying Screens (Beat 4)
const ScreenSimulation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const screensRef = useRef<any[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const numScreens = 15;
        for(let i=0; i<numScreens; i++) {
            screensRef.current.push({
                x: (Math.random() - 0.5) * canvas.width,
                y: (Math.random() - 0.5) * canvas.height,
                z: Math.random() * 1000,
                speed: 2 + Math.random() * 3,
                w: 160,
                h: 90, // 16:9 aspect ratio
                color: `hsl(${140 + Math.random() * 40}, 70%, 50%)`
            });
        }

        const focalLength = 400;
        let frame = 0;

        const loop = () => {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            screensRef.current.forEach(screen => {
                // Move forward
                screen.z -= screen.speed;
                if (screen.z < -focalLength + 50) {
                    screen.z = 1000;
                    screen.x = (Math.random() - 0.5) * canvas.width * 1.5;
                    screen.y = (Math.random() - 0.5) * canvas.height * 1.5;
                }

                // Project
                const scale = focalLength / (focalLength + screen.z);
                const x2d = screen.x * scale + cx;
                const y2d = screen.y * scale + cy;
                const w2d = screen.w * scale;
                const h2d = screen.h * scale;

                // Draw Parabolic Streams to "center" or other screens
                if (scale > 0.1) {
                    ctx.beginPath();
                    ctx.moveTo(x2d, y2d);
                    const cpX = cx + Math.sin(frame * 0.05 + screen.z) * 100;
                    const cpY = cy + Math.cos(frame * 0.05 + screen.z) * 100;
                    ctx.quadraticCurveTo(cpX, cpY, cx, cy + 200); // Flowing down
                    ctx.strokeStyle = screen.color;
                    ctx.lineWidth = 1 * scale;
                    ctx.globalAlpha = 0.2 * scale;
                    ctx.stroke();
                }

                // Draw Screen
                ctx.globalAlpha = Math.min(1, scale);
                ctx.fillStyle = 'rgba(0,0,0,0.8)';
                ctx.strokeStyle = screen.color;
                ctx.lineWidth = 2 * scale;
                
                ctx.beginPath();
                ctx.rect(x2d - w2d/2, y2d - h2d/2, w2d, h2d);
                ctx.fill();
                ctx.stroke();

                // Draw "Content" inside screen (scanning line)
                const scanY = (frame * 2) % h2d;
                ctx.fillStyle = screen.color;
                ctx.fillRect(x2d - w2d/2, y2d - h2d/2 + scanY, w2d, 2 * scale);
            });
            
            frame++;
            requestAnimationFrame(loop);
        };
        loop();
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};


// 3. Flocking / Flow Field (Beat 5)
const FlockSimulation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const agentsRef = useRef<any[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const numAgents = 200;
        for(let i=0; i<numAgents; i++) {
            agentsRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                angle: Math.random() * Math.PI * 2,
                speed: 1 + Math.random() * 2
            });
        }

        // Simple pseudo-noise function
        const noise = (x: number, y: number, t: number) => {
            return Math.sin(x * 0.005 + t) * Math.cos(y * 0.005 + t) * Math.PI * 2;
        };

        let t = 0;
        const loop = () => {
            // Fade Trail
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.fillRect(0,0,canvas.width, canvas.height);
            
            t += 0.005;

            agentsRef.current.forEach(agent => {
                // Get flow field vector
                const flowAngle = noise(agent.x, agent.y, t);
                
                // Lerp angle towards flow angle
                const diff = flowAngle - agent.angle;
                agent.angle += diff * 0.05;

                // Move
                agent.x += Math.cos(agent.angle) * agent.speed;
                agent.y += Math.sin(agent.angle) * agent.speed;

                // Wrap
                if (agent.x < 0) agent.x = canvas.width;
                if (agent.x > canvas.width) agent.x = 0;
                if (agent.y < 0) agent.y = canvas.height;
                if (agent.y > canvas.height) agent.y = 0;

                // Draw
                ctx.fillStyle = '#f59e0b'; // Amber-500
                ctx.beginPath();
                ctx.arc(agent.x, agent.y, 2, 0, Math.PI*2);
                ctx.fill();
            });

            requestAnimationFrame(loop);
        };
        loop();
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />;
};

export default IllustrationLayer;