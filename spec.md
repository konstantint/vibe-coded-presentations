# Project Specification: The End of the Slide Deck

## Overview
A dynamic, bespoke presentation engine built as a high-fidelity React application. Unlike traditional static slide decks, this project uses procedural animations, physics simulations, and interactive UI to demonstrate the future of "vibe-coded" software.

## Core Technology Stack
- **Framework**: React 18+ (Functional Components, Hooks)
- **Styling**: Tailwind CSS (Utility-first, responsive design)
- **Animation**: Framer Motion (Orchestration, AnimatePresence, spring physics)
- **Graphics**: HTML5 Canvas (Procedural particle systems, flow fields)
- **Icons**: Lucide React
- **Language**: TypeScript (Strict typing for state and props)

## Application Architecture
The application is structured in four distinct layers to create depth and visual complexity:
1. **Visual Background (Layer 1)**: A global `<canvas>` element handling atmospheric particle systems that change behavior based on the current "beat".
2. **Illustration Layer (Layer 2)**: Contextual visual metaphors (SVG paths, 3D screen simulations, flocking agents) that reinforce the narrative of each scene.
3. **Content Overlay (Layer 3)**: The primary storytelling layer containing typography, bespoke UI components (like a simulated AI chat), and text reveal animations.
4. **UI Chrome (Layer 4)**: Navigation controls, progress indicators, and fullscreen toggles.

## Scene Specifications ("Beats")

### Beat 0: The Static Era
- **Theme**: Rigidity and physical limitations.
- **Visuals**: A structured grid of particles (`GRID` mode).
- **Content**: Large, bold typography introducing the concept of software as a living medium.
- **Color**: Slate/Gray (#64748b).

### Beat 1: Entropy & Rigidity
- **Theme**: Breaking free from templates.
- **Visuals**: Chaotic, fast-moving particles bouncing off screen boundaries (`CHAOS` mode).
- **Interactions**: Glitchy text animations and "broken" UI containers.
- **Color**: Red (#ef4444).

### Beat 2: Code as Commodity
- **Theme**: AI-assisted creation and the zero cost of code.
- **Visuals**: Smooth flow-field particle simulation (`FLOW` mode).
- **Bespoke UI**: A simulated chat interface where a user prompts an AI, which then "types out" a complex physics engine in real-time behind the chat bubbles.
- **Color**: Blue (#3b82f6).

### Beat 3: Vibe Coding
- **Theme**: Algorithmic storytelling.
- **Visuals**: A procedural network graph with nodes and connecting lines that pulse and drift (`NETWORK` mode).
- **Interactions**: Dynamic text cycling through various presentation elements (titles, transitions, bullet points) being "backed by logic".
- **Color**: Purple (#a855f7).

### Beat 4: The Extravaganza
- **Theme**: Simulations over static charts.
- **Visuals**: Particles spiraling towards a central point (`CONVERGENCE` mode).
- **Illustration**: A 3D-perspective simulation of "flying screens" with scanning lines and data streams.
- **Color**: Emerald (#10b981).

### Beat 5: Magic into Existence
- **Theme**: The future is bespoke.
- **Visuals**: Calm drifting background particles (`EXPLOSION` mode).
- **Illustration**: A high-density flocking simulation (Boids-like) where agents follow a shifting procedural noise field.
- **Color**: Amber (#f59e0b).

## Key Features
- **Keyboard Navigation**: Support for Space, Arrows, and Enter for seamless transitions.
- **Responsive Design**: Mobile-optimized layouts with scaled-down particle counts for performance.
- **Fullscreen Mode**: Integrated browser fullscreen API support.
- **Vignette & Depth**: Global CSS gradients and backdrop blurs to ensure text readability over complex backgrounds.
