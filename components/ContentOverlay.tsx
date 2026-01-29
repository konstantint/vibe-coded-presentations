import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beat } from '../types';
import TextReveal from './TextReveal';
import { Sparkles, Terminal, Cpu, User, Bot } from 'lucide-react';

interface ContentOverlayProps {
  beat: Beat;
}

const ContentOverlay: React.FC<ContentOverlayProps> = ({ beat }) => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center w-full h-full p-8 md:p-16 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={beat.id}
          className="max-w-6xl w-full flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Shared Header */}
          <BeatHeader beat={beat} />

          {/* Bespoke Layout Switcher */}
          <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
            {beat.id === 0 && <BeatStatic beat={beat} />}
            {beat.id === 1 && <BeatEntropy beat={beat} />}
            {beat.id === 2 && <BeatCode beat={beat} />}
            {beat.id === 3 && <BeatVibe beat={beat} />}
            {beat.id >= 4 && <BeatStandard beat={beat} />}
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Shared Components ---

const BeatHeader: React.FC<{ beat: Beat }> = ({ beat }) => (
  <motion.div 
    className="mb-12 flex items-center gap-4 overflow-hidden"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <span 
      className="font-mono text-sm tracking-widest uppercase px-2 py-1 rounded bg-white/10 border border-white/5 backdrop-blur-sm"
      style={{ color: beat.highlightColor }}
    >
      Beat 0{beat.id}
    </span>
    <span className="h-px w-12 bg-white/20" />
    <span className="font-mono text-sm text-white/40 tracking-widest uppercase">
      {beat.title}
    </span>
  </motion.div>
);

const BreathingText: React.FC<{ children: React.ReactNode, color?: string }> = ({ children, color }) => (
    <motion.span
        className="inline-block font-semibold"
        style={{ color: color }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
        {children}
    </motion.span>
);

// --- Bespoke Beat Components ---

// Beat 0: Static (Standard)
const BeatStatic: React.FC<{ beat: Beat }> = ({ beat }) => (
    <div className="text-center">
         <div className="relative mb-8">
            <div className="absolute inset-0 blur-3xl opacity-20" style={{ background: beat.highlightColor }} />
            <TextReveal 
                text={beat.subtitle || beat.title}
                className="text-5xl md:text-8xl font-bold text-white leading-tight tracking-tight relative z-10"
                mode="word"
                delay={0.3}
            />
        </div>
        <div className="max-w-2xl mx-auto">
            <TextReveal 
                text={beat.body || ""}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light"
                mode="word"
                delay={0.8}
            />
        </div>
    </div>
);

// Beat 1: Entropy (Physics/Jailbreak)
const BeatEntropy: React.FC<{ beat: Beat }> = ({ beat }) => (
    <div className="relative w-full flex flex-col items-center justify-center">
        {/* Background Jail Grid */}
        <div className="absolute inset-0 border border-white/5 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] -z-10" />

        <div className="mb-12 relative">
             <motion.h1 
                className="text-6xl md:text-9xl font-bold text-white/90"
                animate={{ 
                    x: [0, -2, 2, -1, 1, 0], 
                    y: [0, 1, -1, 0]
                }}
                transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
             >
                Breaking the <span className="text-red-500">grid</span>.
             </motion.h1>
             {/* The "Jail" being broken */}
             <motion.div 
                className="absolute -inset-4 border border-red-500/30 rounded-lg"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.02, 1], rotate: [0, 1, -1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
             />
        </div>

        <div className="max-w-3xl text-center text-xl md:text-2xl text-gray-300 leading-relaxed">
            <p className="mb-6">
                Bespoke software used to be <BreathingText color="#fca5a5">expensive</BreathingText>.
            </p>
            <div className="relative inline-block border border-white/10 bg-white/5 p-4 rounded mb-6 backdrop-blur-sm">
                 <span className="font-mono text-sm text-white/30 absolute -top-3 left-2 bg-black px-1">TEMPLATE_ID_882</span>
                 So we forced our dynamic ideas into rigid, pre-fabricated templates.
            </div>
            <p>
                But rigidity kills the <BreathingText color="#ef4444">vibe</BreathingText>.
            </p>
        </div>
    </div>
);

// Beat 2: Code (Chat Interface & Background Code)
const BeatCode: React.FC<{ beat: Beat }> = ({ beat }) => {
    // Foreshadowing Beat 5's simulation
    const promptText = "For the background of Beat 05, make a crowd dynamics simulation over an invisible continually shifting procedural noise field.";
    
    // Expanded code snippet
    const codeFull = `import { createNoise2D } from 'simplex-noise';
import { Vector2 } from './math';

// Physics Configuration
const FLOCK_CONFIG = {
  separation: 2.0,
  alignment: 1.5,
  cohesion: 1.0,
  perceptionRadius: 50,
  maxSpeed: 4.0
};

// Initialize Agents with random vectors
const agents = Array.from({ length: 500 }, () => ({
  pos: new Vector2(Math.random() * width, Math.random() * height),
  vel: Vector2.random().scale(FLOCK_CONFIG.maxSpeed),
  acc: new Vector2(0, 0)
}));

export function renderFrame(ctx: CanvasRenderingContext2D, t: number) {
  // Clear buffer with trail effect
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, width, height);

  // Update agents based on flow field
  agents.forEach(agent => {
    // 1. Calculate Field Forces
    const noiseVal = noise2D(agent.pos.x * 0.002, agent.pos.y * 0.002, t * 0.5);
    const flowForce = Vector2.fromAngle(noiseVal * Math.PI * 2);
    
    // 2. Apply Physics
    agent.acc.add(flowForce.scale(0.5));
    agent.vel.add(agent.acc);
    agent.vel.limit(FLOCK_CONFIG.maxSpeed);
    agent.pos.add(agent.vel);
    
    // Reset acceleration for next frame
    agent.acc.multiply(0);

    // 3. Screen Wrap
    if (agent.pos.x > width) agent.pos.x = 0;
    if (agent.pos.x < 0) agent.pos.x = width;
    if (agent.pos.y > height) agent.pos.y = 0;
    if (agent.pos.y < 0) agent.pos.y = height;

    // 4. Draw
    ctx.beginPath();
    ctx.arc(agent.pos.x, agent.pos.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = \`hsl(\${t * 50}, 70%, 50%)\`;
    ctx.fill();
  });
}`;

    const [displayPrompt, setDisplayPrompt] = useState("");
    const [displayCode, setDisplayCode] = useState("");
    const [phase, setPhase] = useState<'idle' | 'user-typing' | 'ai-thinking' | 'coding' | 'exiting'>('idle');
    const [aiState, setAiState] = useState("");
    
    // Animation Controls
    const [containerOpacity, setContainerOpacity] = useState(0);
    const [animDuration, setAnimDuration] = useState(0.8);

    const scrollRef = useRef<HTMLDivElement>(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        let active = true;

        const runSequence = async () => {
            if (!active) return;
            
            // RESET
            setDisplayPrompt("");
            setDisplayCode("");
            setPhase('user-typing');
            setAiState("");
            setContainerOpacity(0);
            setAnimDuration(0.8);
            
            await new Promise(r => setTimeout(r, 500));
            if (!active) return;

            // 1. TYPE PROMPT (Fast)
            for (let i = 0; i <= promptText.length; i++) {
                if (!active) return;
                setDisplayPrompt(promptText.slice(0, i));
                await new Promise(r => setTimeout(r, 10 + Math.random() * 20)); 
            }
            
            await new Promise(r => setTimeout(r, 300));
            if (!active) return;
            setPhase('ai-thinking');
            
            // 2. THINKING START
            setAiState("Analyzing requirements...");
            await new Promise(r => setTimeout(r, 600));
            
            if (!active) return;
            setPhase('coding');
            setContainerOpacity(0.7); // Start slightly transparent but visible

            // 3. CODE GENERATION + CONTINUOUS THINKING
            const thoughts = [
                "Generating physics...",
                "Optimizing vectors...",
                "Applying noise...",
                "Compiling shaders...",
                "Simulating agents...",
            ];
            
            let thoughtIndex = 0;
            const thinkInterval = setInterval(() => {
                if (thoughtIndex < thoughts.length) {
                    setAiState(thoughts[thoughtIndex]);
                    thoughtIndex = (thoughtIndex + 1) % thoughts.length;
                }
            }, 1500);

            // Character-by-Character Code Typing
            let codeBuffer = "";
            let currentOpacityLevel = 0.7;

            for (let i = 0; i < codeFull.length; i++) {
                if (!active) break;
                
                const char = codeFull[i];
                codeBuffer += char;
                setDisplayCode(codeBuffer);
                
                // Auto scroll
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }

                // --- Opacity Logic ---
                const lines = codeBuffer.split('\n').length;
                
                // Fade out further after many lines
                if (lines > 6 && currentOpacityLevel === 0.7) {
                    currentOpacityLevel = 0.4; // Fade to ~40%
                    setAnimDuration(2);
                    setContainerOpacity(0.4);
                }

                // --- Timing Logic ---
                // Base Speed: Fast
                let baseDelay = 5; 
                let newlineDelay = 30; 
                let punctuationDelay = 15; 
                let spaceDelay = 1; 

                // Speed up at end
                if (currentOpacityLevel === 0.4) {
                    baseDelay = 2; 
                    newlineDelay = 10;
                    punctuationDelay = 5;
                }

                let delay = baseDelay;
                if (char === '\n') delay = newlineDelay;
                else if (char === ';' || char === '}') delay = punctuationDelay;
                else if (char === ' ') delay = spaceDelay;

                await new Promise(r => setTimeout(r, delay));
            }
            
            clearInterval(thinkInterval);
            setAiState("Code implemented.");
            
            // Wait before reset
            await new Promise(r => setTimeout(r, 2000));
            
            if (active) {
                setPhase('exiting');
                // The exit transition is handled by AnimatePresence + exit prop
                await new Promise(r => setTimeout(r, 800)); // allow exit animation to play
                runSequence(); // Restart
            }
        };

        runSequence();

        return () => {
            active = false;
            isMounted.current = false;
        }; 
    }, [codeFull, promptText]);

    return (
        <div className="w-full h-[600px] relative flex flex-col justify-center items-center">
            
            {/* TEXT HEADER - Static Position */}
            <div className="text-center space-y-4 mb-8 relative z-20">
                <TextReveal 
                    text="The cost of creation is trending to zero."
                    className="text-3xl md:text-5xl font-bold text-white"
                />
                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1 }}
                    className="text-blue-200/80 text-xl font-light"
                >
                    Imagine it. Magic it.
                </motion.p>
            </div>

            {/* CHAT CONTAINER - Foreground Layer (Z-10) */}
            <div className="w-full max-w-2xl relative z-10 space-y-4 min-h-[200px]">
                
                {/* 1. USER BUBBLE */}
                <div className="flex justify-start w-full">
                    <motion.div 
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="bg-slate-800/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl rounded-tl-sm max-w-[80%] shadow-lg flex items-start gap-3"
                    >
                        <div className="p-2 bg-blue-500/20 rounded-full shrink-0">
                             <User size={16} className="text-blue-400" />
                        </div>
                        <div className="text-slate-200 text-lg leading-snug font-light">
                            {displayPrompt}
                            {phase === 'user-typing' && (
                                <motion.span 
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-0.5 h-4 bg-blue-400 ml-1 align-middle"
                                />
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* 2. AI BUBBLE */}
                <AnimatePresence>
                {phase !== 'user-typing' && phase !== 'idle' && (
                    <div className="flex justify-end w-full">
                         <motion.div 
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-indigo-900/60 backdrop-blur-md border border-indigo-500/30 p-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-lg flex items-start gap-3"
                        >
                            <div className="text-indigo-100 text-lg leading-snug font-light text-right w-full">
                                <div className="flex items-center justify-end gap-2 mb-1 text-xs font-mono text-indigo-300 uppercase tracking-widest">
                                    {aiState}
                                    {phase === 'coding' && (
                                         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                            <Cpu size={12} />
                                         </motion.div>
                                    )}
                                </div>
                                <span className="text-sm opacity-80 italic">Generating custom shader & physics logic...</span>
                            </div>
                            <div className="p-2 bg-indigo-500/20 rounded-full shrink-0">
                                <Bot size={16} className="text-indigo-400" />
                            </div>
                        </motion.div>
                    </div>
                )}
                </AnimatePresence>
            </div>


            {/* CODE PROJECTION - Background Layer (Z-0) */}
            {/* Positioned absolutely to appear "behind" the chat physically, but dimmed to look like a projection */}
            <AnimatePresence>
            {phase === 'coding' && (
                <motion.div 
                    className="absolute top-20 w-full max-w-4xl z-0 pointer-events-none"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 50, opacity: containerOpacity }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: animDuration }}
                >
                    <div className="relative w-full overflow-hidden rounded-xl border border-white/5 bg-black/60 backdrop-blur-[2px] shadow-2xl transform perspective-1000 rotate-x-12 scale-95 origin-top">
                        {/* Header */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                            </div>
                            <span className="text-xs font-mono text-white/20 ml-2">generator_output.ts</span>
                        </div>
                        {/* Code Body */}
                        <div 
                            ref={scrollRef}
                            className="p-6 font-mono text-xs md:text-sm leading-relaxed text-blue-100/90 h-[400px] overflow-hidden relative"
                        >
                             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-10" />
                             <pre className="whitespace-pre-wrap blur-[1.5px]">
                                    <span dangerouslySetInnerHTML={{ 
                                        __html: displayCode
                                            .replace(/&/g, "&amp;")
                                            .replace(/</g, "&lt;")
                                            .replace(/>/g, "&gt;")
                                            .replace(/\b(import|from|const|function|return|if|else|forEach|export)\b/g, '<span class="text-purple-300/80">$1</span>')
                                            .replace(/\b(createNoise2D|Vector2|Array|Math|CanvasRenderingContext2D)\b/g, '<span class="text-yellow-200/80">$1</span>')
                                            .replace(/'([^']*)'/g, '<span class="text-green-300/80">\'$1\'</span>')
                                            .replace(/(\/\/.*)/g, '<span class="text-white/30 italic">$1</span>')
                                    }} />
                             </pre>
                        </div>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};

// Beat 3: Vibe (Temporal Epizeuxis)
const BeatVibe: React.FC<{ beat: Beat }> = ({ beat }) => {
    const [cycleIndex, setCycleIndex] = useState(0);
    const phrases = ["bullet point", "TITLE", "transition"];
    const endings = ["custom logic", "bespoke code", "a purpose"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCycleIndex(prev => (prev + 1) % phrases.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-12">
                Telling stories with <span className="text-purple-400 font-mono">algorithms</span>.
            </h1>

            <div className="text-2xl md:text-4xl text-gray-300 leading-relaxed h-32 flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-3">
                    <span className="opacity-50">Every</span>
                    <AnimatePresence mode="wait">
                        <motion.span 
                            key={phrases[cycleIndex]}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={`font-bold uppercase tracking-widest ${
                                cycleIndex === 1 ? 'text-white text-5xl' : 'text-purple-300'
                            }`}
                        >
                            {phrases[cycleIndex]}
                        </motion.span>
                    </AnimatePresence>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                    <span>can be backed by</span>
                    <AnimatePresence mode="wait">
                         <motion.span 
                            key={endings[cycleIndex]}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="overflow-hidden whitespace-nowrap text-purple-400 font-mono bg-purple-900/30 px-2 rounded"
                         >
                            {endings[cycleIndex]}
                         </motion.span>
                    </AnimatePresence>
                </div>
            </div>
             
             <motion.p 
                className="mt-12 text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
             >
                Not 3D renders for the sake of it, but behavior that reinforces the narrative.
             </motion.p>
        </div>
    );
}

// Fallback / Standard Component
const BeatStandard: React.FC<{ beat: Beat }> = ({ beat }) => (
    <BeatStatic beat={beat} />
);

export default ContentOverlay;