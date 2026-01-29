import { Beat, VisualMode } from './types';

export const PRES_BEATS: Beat[] = [
  {
    id: 0,
    title: "The Static Era",
    subtitle: "Why are we still simulating acetate foils?",
    body: "Traditional slide decks are artifacts of a physical limitation. We project static rectangles because we used to carry physical paper. But software is alive.",
    visualMode: VisualMode.GRID,
    highlightColor: "#64748b" // Slate 500
  },
  {
    id: 1,
    title: "Entropy & Rigidity",
    subtitle: "Breaking the grid.",
    body: "Bespoke software used to be expensive. So we forced our dynamic ideas into rigid, pre-fabricated templates. But rigidity kills the vibe.",
    visualMode: VisualMode.CHAOS,
    highlightColor: "#ef4444" // Red 500
  },
  {
    id: 2,
    title: "Code as Commodity",
    subtitle: "The cost of creation is trending to zero.",
    body: "We are entering an era where if you can imagine a specific interaction, you can magic it into existence. Code is no longer a barrier; it's a medium.",
    visualMode: VisualMode.FLOW,
    codeSnippet: `const dream = await ai.generate({
  concept: fluidity(),
  context: presentation()
});`,
    highlightColor: "#3b82f6" // Blue 500
  },
  {
    id: 3,
    title: "Vibe Coding",
    subtitle: "Telling stories with algorithms.",
    body: "Every bullet point, every title, every transition can be backed by custom logic. Instead of picking a prebuilt transition effect from a menu, you create movement that specifically meets your needs.",
    visualMode: VisualMode.NETWORK,
    highlightColor: "#a855f7" // Purple 500
  },
  {
    id: 4,
    title: "The Extravaganza",
    subtitle: "Let the computer help tell the story.",
    body: "Why settle for a 'slide' when you can have a simulation? Why show a chart when you can show the data living and breathing?",
    visualMode: VisualMode.CONVERGENCE,
    highlightColor: "#10b981" // Emerald 500
  },
  {
    id: 5,
    title: "Magic into Existence",
    subtitle: "The future is bespoke.",
    body: "This presentation isn't a file. It's an app. Built for this moment, for this audience. Welcome to the future of storytelling.",
    visualMode: VisualMode.EXPLOSION,
    highlightColor: "#f59e0b" // Amber 500
  }
];