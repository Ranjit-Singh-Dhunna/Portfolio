"use client";

import React, { useState } from 'react';

// Define project interface
interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links?: {
    github?: string;
    demo?: string;
  };
}

interface ProjectCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  projects: Project[];
}

export default function ProjectsLake() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories: ProjectCategory[] = [
    {
      id: 'ai-portal',
      title: 'AI PORTAL',
      subtitle: 'PROJECT 1 // AI MODEL',
      iconName: 'portal',
      projects: [
        {
          id: 'ai-1',
          title: 'SofiaPulse GenAI Ad-Builder',
          description: 'A full-stack, AI-powered ad template generator that integrates generative diffusion models directly with responsive HTML layouts. Allows advertisers to tweak prompts and overlay text in a seamless, real-time editor.',
          tech: ['Next.js', 'FastAPI', 'Stable Diffusion', 'PostgreSQL', 'TailwindCSS'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/ad-builder' }
        },
        {
          id: 'ai-2',
          title: 'Neural Style Transfer Studio',
          description: 'Real-time feed styling using convolutional neural network models in TensorFlow. Features low-latency filters and a customizable style weight dashboard for fine-grained style blend controls.',
          tech: ['Python', 'TensorFlow', 'OpenCV', 'React', 'WebSockets'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/neural-style' }
        },
        {
          id: 'ai-3',
          title: 'SimTerrain RL Agent',
          description: 'A reinforcement learning agent trained with PPO to navigate challenging, procedural 2D pixel-art obstacles. Includes a visual web monitor showing live Q-values and training progress charts.',
          tech: ['Python', 'PyTorch', 'Gymnasium', 'HTML5 Canvas', 'TypeScript'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/rl-terrain-agent' }
        }
      ]
    },
    {
      id: 'systems-cairn',
      title: 'SYSTEMS CAIRN',
      subtitle: 'PROJECT 2 // BACKEND',
      iconName: 'cairn',
      projects: [
        {
          id: 'sys-1',
          title: 'High-Throughput Go Task Queue',
          description: 'A distributed asynchronous task runner written in Go using gRPC. Processes hundreds of thousands of jobs per second with custom priority queuing, automatic retries, and distributed Redis coordination.',
          tech: ['Go', 'gRPC', 'Redis', 'Docker', 'Prometheus'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/go-runner' }
        },
        {
          id: 'sys-2',
          title: 'GraphQL API Gatekeeper',
          description: 'A performant API Gateway layer for microservices that handles real-time GraphQL query validation, nested query depth analysis, JWT auth, and token-bucket rate limiting.',
          tech: ['TypeScript', 'GraphQL', 'Apollo Server', 'Redis', 'Express'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/gatekeeper' }
        },
        {
          id: 'sys-3',
          title: 'Chiseled Secure Vault DB',
          description: 'A custom, lightweight chiseled key-value store with an append-only Write-Ahead Log (WAL), a binary search log compactor, and secure AES-256 encryption at rest.',
          tech: ['Rust', 'Cargo', 'AES-256', 'Linux Systems'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/secure-vault-db' }
        }
      ]
    },
    {
      id: 'frontend-spire',
      title: 'CRYSTAL SPIRE',
      subtitle: 'PROJECT 3 // FRONTEND',
      iconName: 'crystals',
      projects: [
        {
          id: 'fe-1',
          title: 'Interactive Pixel Canvas',
          description: 'A real-time collaborative whiteboard workspace that allows thousands of simultaneous users to paint pixel art. Synchronized using lock-free WebSockets and rendered via optimized low-latency canvas buffers.',
          tech: ['React', 'TypeScript', 'WebSockets', 'HTML5 Canvas', 'Node.js'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/pixel-canvas', demo: '#' }
        },
        {
          id: 'fe-2',
          title: 'Responsive Ad Template Renderer',
          description: 'A custom layout engine designed for the ad publishing pipeline. Translates dynamic structured JSON templates into pixel-perfect, lightning-fast rendering components that support diverse dimensions and aspect ratios.',
          tech: ['React', 'CSS Grid', 'ResizeObserver', 'Vite', 'Vitest'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/ad-renderer' }
        },
        {
          id: 'fe-3',
          title: 'Retro Arcade Physics Engine',
          description: 'A lightweight 2D rigid-body arcade physics library written in TypeScript. Designed specifically for retro pixel-art games, featuring AABB collision resolutions and FM-synthesized sound effects.',
          tech: ['TypeScript', 'HTML5 Audio', 'Canvas API', 'Webpack'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/retro-engine' }
        }
      ]
    },
    {
      id: 'fullstack-obelisk',
      title: 'INTEGRATION OBELISK',
      subtitle: 'PROJECT 4 // FULLSTACK & TOOLS',
      iconName: 'obelisk',
      projects: [
        {
          id: 'fs-1',
          title: 'SofiaPulse AI Ad Editor',
          description: 'A full-stack interactive ad editor that enables users to generate and integrate GenAI images directly into custom ad templates, utilizing stable diffusion APIs and a customized HTML canvas layout renderer.',
          tech: ['Next.js', 'FastAPI', 'Stable Diffusion', 'PostgreSQL', 'TailwindCSS'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/ad-builder' }
        },
        {
          id: 'fs-2',
          title: 'Ad Template Compiler CLI',
          description: 'A performance-focused command-line utility and web-compiling workspace that parses and compiles structural ad components into compressed, single-bundle responsive ad widgets ready for production delivery.',
          tech: ['Node.js', 'TypeScript', 'Webpack', 'Babel', 'Commander.js'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/ad-compiler' }
        },
        {
          id: 'fs-3',
          title: 'Multi-Agent Pixel Simulator',
          description: 'A real-time simulator that models pathfinding and goal-directed cooperation between autonomous agents in a procedurally generated pixel-art grid.',
          tech: ['TypeScript', 'HTML5 Canvas', 'Express', 'A* Algorithm'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/agent-simulator' }
        }
      ]
    }
  ];

  const handleOpenModal = (catId: string) => {
    setActiveCategory(catId);
    const category = categories.find(c => c.id === catId);
    if (category && category.projects.length > 0) {
      setActiveProjectId(category.projects[0].id);
    }
  };

  const handleCloseModal = () => {
    setActiveCategory(null);
    setActiveProjectId(null);
  };

  const selectedCategory = categories.find(c => c.id === activeCategory);
  const selectedProject = selectedCategory?.projects.find(p => p.id === activeProjectId);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      fontFamily: 'var(--font-pixelify), monospace',
      overflow: 'hidden',
    }}>
      
      {/* CSS Animations style block */}
      <style>{`
        @keyframes pulseGlow {
          0% { opacity: 0.45; filter: drop-shadow(0 0 1px #00f0ff); }
          50% { opacity: 0.95; filter: drop-shadow(0 0 8px #00f0ff); }
          100% { opacity: 0.45; filter: drop-shadow(0 0 1px #00f0ff); }
        }
        @keyframes flickerFlame {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(1.04) translateY(-1px) translateX(1px); }
          60% { transform: scale(0.96) translateY(1px) translateX(-1px); }
          80% { transform: scale(1.02) translateY(-1px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes floatSparkle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(-16px) scale(0.5); opacity: 0; }
        }
        @keyframes pointerLineGlow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        .glow-hover {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .glow-hover:hover {
          filter: drop-shadow(0 0 12px #00f0ff) brightness(1.25);
          transform: translateY(-4px);
        }
        .pointer-text {
          font-size: 1.1rem;
          fill: #7d9685;
          text-shadow: 2px 2px 0 #151710;
          transition: all 0.3s ease;
          letter-spacing: 0.1em;
        }
        .pointer-text-hover {
          fill: #00f0ff !important;
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.6), 2px 2px 0 #151710 !important;
        }
        .pointer-line {
          stroke: #3c5443;
          stroke-width: 2;
          fill: none;
          transition: all 0.3s ease;
        }
        .pointer-line-hover {
          stroke: #00f0ff !important;
          stroke-dasharray: 4;
          animation: pointerLineGlow 0.5s linear infinite;
        }
      `}</style>

      {/* ── INTERACTIVE ARTIFACTS OVERLAY VIEWPORT (1400x800 Aspect Lock wrapper) ── */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '1400px',
        height: '100%',
        maxHeight: '800px',
        pointerEvents: 'none',
      }}>

        {/* ── ARTIFACT 1: LEFT PORTAL (AI PORTAL) ── */}
        <div 
          className="glow-hover"
          onClick={() => handleOpenModal('ai-portal')}
          onMouseEnter={() => setHoveredCategory('ai-portal')}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            position: 'absolute',
            left: '10%',
            top: '50%',
            width: '180px',
            height: '220px',
            pointerEvents: 'auto',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 120 150">
            {/* Chiseled Stone Base */}
            <path d="M 10,140 L 20,125 L 100,125 L 110,140 Z" fill="#2d352c" stroke="#151710" strokeWidth="3" />
            <path d="M 20,125 L 25,120 L 95,120 L 100,125 Z" fill="#424c3e" stroke="#151710" strokeWidth="2" />
            <rect x="5" y="140" width="110" height="8" fill="#1b201a" stroke="#151710" strokeWidth="2" />

            {/* Side Pillars */}
            {/* Left Pillar */}
            <path d="M 22,120 L 22,40 L 36,40 L 36,120 Z" fill="#2d352c" stroke="#151710" strokeWidth="3" />
            <path d="M 24,120 L 24,42 L 28,42 L 28,120 Z" fill="#424c3e" /> {/* Highlight */}
            {/* Right Pillar */}
            <path d="M 84,120 L 84,40 L 98,40 L 98,120 Z" fill="#2d352c" stroke="#151710" strokeWidth="3" />
            <path d="M 86,120 L 86,42 L 90,42 L 90,120 Z" fill="#424c3e" /> {/* Highlight */}

            {/* Arch Lintel (Top arch block) */}
            <path d="M 16,40 L 22,26 L 98,26 L 104,40 L 84,40 L 75,32 L 45,32 L 36,40 Z" fill="#2d352c" stroke="#151710" strokeWidth="3" />
            <path d="M 22,26 L 25,22 L 95,22 L 98,26 Z" fill="#424c3e" />
            
            {/* Stone cracks/details */}
            <path d="M 36,65 L 30,70" stroke="#151710" strokeWidth="2" fill="none" />
            <path d="M 84,95 L 90,92" stroke="#151710" strokeWidth="2" fill="none" />
            <path d="M 50,26 L 50,32" stroke="#151710" strokeWidth="2" fill="none" />

            {/* Portal Gate Glow (Base portal background) */}
            <ellipse cx="60" cy="80" rx="20" ry="36" fill="rgba(0, 240, 255, 0.12)" />

            {/* Floating Portal Flame */}
            <g style={{
              transformOrigin: '60px 75px',
              animation: 'flickerFlame 3s ease-in-out infinite',
            }}>
              {/* Outer flame */}
              <path d="M 60,45 C 75,65 72,98 60,105 C 48,98 45,65 60,45 Z" fill="#00a8ff" opacity="0.6" />
              {/* Inner bright core */}
              <path d="M 60,55 C 70,70 68,90 60,95 C 52,90 50,70 60,55 Z" fill="#00f0ff" opacity="0.95" style={{ animation: 'pulseGlow 2s infinite' }} />
            </g>

            {/* Portal side runes (glowing chiseled marks) */}
            <rect x="27" y="55" width="4" height="4" fill="#00f0ff" style={{ animation: 'pulseGlow 2.5s infinite' }} />
            <rect x="27" y="85" width="4" height="4" fill="#00f0ff" style={{ animation: 'pulseGlow 1.8s infinite' }} />
            <rect x="89" y="65" width="4" height="4" fill="#00f0ff" style={{ animation: 'pulseGlow 2.2s infinite' }} />
            <rect x="89" y="95" width="4" height="4" fill="#00f0ff" style={{ animation: 'pulseGlow 1.5s infinite' }} />
          </svg>
        </div>


        {/* ── ARTIFACT 2: MIDDLE CAIRN (SYSTEMS CAIRN) ── */}
        <div 
          className="glow-hover"
          onClick={() => handleOpenModal('systems-cairn')}
          onMouseEnter={() => setHoveredCategory('systems-cairn')}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            position: 'absolute',
            left: '46%',
            top: '34%',
            width: '120px',
            height: '180px',
            pointerEvents: 'auto',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 100 150">
            {/* Water ripples around base */}
            <ellipse cx="50" cy="138" rx="28" ry="6" fill="none" stroke="#2d352c" strokeWidth="2" opacity="0.5" />
            <ellipse cx="50" cy="138" rx="18" ry="4" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.4" style={{ animation: 'pulseGlow 2.5s infinite' }} />

            {/* Bottom Rock */}
            <path d="M 15,135 C 15,115 25,100 50,100 C 75,100 85,115 85,135 Z" fill="#2d352c" stroke="#151710" strokeWidth="3" />
            <path d="M 22,112 C 30,105 45,103 52,103" fill="none" stroke="#424c3e" strokeWidth="2" />
            {/* Bottom Rock Rune (Chiseled) */}
            <path d="M 45,122 H 55 L 48,114 H 56" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="square" style={{ animation: 'pulseGlow 2.2s infinite' }} />

            {/* Middle Rock */}
            <path d="M 24,102 C 24,85 35,74 52,74 C 69,74 76,85 76,102 Z" fill="#2d352c" stroke="#151710" strokeWidth="3" />
            <path d="M 32,86 C 40,80 50,78 56,78" fill="none" stroke="#424c3e" strokeWidth="2" />
            {/* Middle Rock Rune */}
            <path d="M 46,92 L 52,84 L 52,94" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="square" style={{ animation: 'pulseGlow 1.7s infinite' }} />

            {/* Top Rock */}
            <path d="M 34,74 C 34,60 40,52 51,52 C 62,52 66,60 66,74 Z" fill="#2d352c" stroke="#151710" strokeWidth="3" />
            <path d="M 40,60 C 44,55 52,55 55,55" fill="none" stroke="#424c3e" strokeWidth="2" />
            {/* Top Rock Rune */}
            <path d="M 48,68 V 58 H 54 V 63 H 48" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="square" style={{ animation: 'pulseGlow 2.8s infinite' }} />

            {/* Companion small stone in water on the right */}
            <path d="M 80,140 C 80,132 84,126 90,126 C 96,126 98,132 98,140 Z" fill="#2d352c" stroke="#151710" strokeWidth="2" />
            <path d="M 88,136 H 92" fill="none" stroke="#00f0ff" strokeWidth="1.5" style={{ animation: 'pulseGlow 2s infinite' }} />
          </svg>
        </div>


        {/* ── ARTIFACT 3: RIGHT CRYSTALS (CRYSTAL SPIRE) ── */}
        <div 
          className="glow-hover"
          onClick={() => handleOpenModal('frontend-spire')}
          onMouseEnter={() => setHoveredCategory('frontend-spire')}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            position: 'absolute',
            left: '82%',
            top: '44%',
            width: '130px',
            height: '190px',
            pointerEvents: 'auto',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 110 150">
            {/* Submerged Supporting Rock */}
            <path d="M 10,130 L 22,105 L 88,105 L 100,130 L 85,138 L 25,138 Z" fill="#2d352c" stroke="#151710" strokeWidth="3" />
            <path d="M 22,105 L 28,100 L 82,100 L 88,105 Z" fill="#424c3e" stroke="#151710" strokeWidth="2" />

            {/* Left Crystal */}
            <polygon points="20,105 12,85 28,52 38,78 30,105" fill="#00d8ff" opacity="0.8" stroke="#151710" strokeWidth="2.5" />
            <polygon points="20,105 28,52 30,105" fill="#e0ffff" opacity="0.5" /> {/* Highlight facet */}

            {/* Right Crystal */}
            <polygon points="70,105 60,82 78,60 88,88 80,105" fill="#00d8ff" opacity="0.8" stroke="#151710" strokeWidth="2.5" />
            <polygon points="70,105 78,60 80,105" fill="#e0ffff" opacity="0.5" />

            {/* Main Center Crystal Spire */}
            <polygon points="40,105 32,70 52,30 68,64 60,105" fill="#00f0ff" stroke="#151710" strokeWidth="3" />
            <polygon points="40,105 52,30 60,105" fill="#e0ffff" opacity="0.65" style={{ animation: 'pulseGlow 3s infinite' }} />

            {/* Floating Spark particles (using custom SVG delay/offset circles) */}
            <circle cx="28" cy="40" r="2.5" fill="#e0ffff" style={{ animation: 'floatSparkle 2.5s infinite', animationDelay: '0.2s' }} />
            <circle cx="52" cy="20" r="3" fill="#00f0ff" style={{ animation: 'floatSparkle 3s infinite', animationDelay: '1s' }} />
            <circle cx="78" cy="50" r="2" fill="#e0ffff" style={{ animation: 'floatSparkle 2.2s infinite', animationDelay: '0.5s' }} />
          </svg>
        </div>

        {/* ── ARTIFACT 4: BOTTOM OBELISK (INTEGRATION OBELISK) ── */}
        <div 
          className="glow-hover"
          onClick={() => handleOpenModal('fullstack-obelisk')}
          onMouseEnter={() => setHoveredCategory('fullstack-obelisk')}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            position: 'absolute',
            left: '60%',
            top: '94%',
            width: '100px',
            height: '160px',
            pointerEvents: 'auto',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 80 140">
            {/* Water ripples at base */}
            <ellipse cx="40" cy="128" rx="20" ry="5" fill="none" stroke="#2d352c" strokeWidth="2" opacity="0.5" />
            <ellipse cx="40" cy="128" rx="12" ry="3" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.4" style={{ animation: 'pulseGlow 2.5s infinite' }} />

            {/* Chiseled Stone Base */}
            <path d="M 22,125 L 30,115 L 50,115 L 58,125 Z" fill="#2d352c" stroke="#151710" strokeWidth="2.5" />
            <path d="M 30,115 L 34,110 L 46,110 L 50,115 Z" fill="#424c3e" stroke="#151710" strokeWidth="2" />

            {/* Obelisk Shaft */}
            <path d="M 32,110 L 35,35 L 40,25 L 45,35 L 48,110 Z" fill="#2d352c" stroke="#151710" strokeWidth="2.5" />
            {/* Chiseled Face Highlights */}
            <path d="M 35,110 L 37,36 L 40,27 Z" fill="#424c3e" />
            <path d="M 40,27 L 43,36 L 45,110 Z" fill="#1b201a" opacity="0.3" />

            {/* Vertical Glowing Runes on the front face */}
            <g style={{ animation: 'pulseGlow 2s infinite' }}>
              <rect x="39" y="42" width="2.5" height="5" fill="#00f0ff" />
              <rect x="39" y="58" width="2.5" height="2.5" fill="#00f0ff" />
              <rect x="39" y="70" width="2.5" height="5" fill="#00f0ff" />
              <rect x="39" y="86" width="2.5" height="2.5" fill="#00f0ff" />
              <rect x="39" y="98" width="2.5" height="5" fill="#00f0ff" />
            </g>

            {/* Floating Capstone/Crystal right above obelisk tip */}
            <g style={{
              transformOrigin: '40px 15px',
              animation: 'flickerFlame 2.5s ease-in-out infinite',
            }}>
              <polygon points="40,5 44,12 40,19 36,12" fill="#00f0ff" stroke="#151710" strokeWidth="1.5" style={{ animation: 'pulseGlow 1.5s infinite' }} />
            </g>
          </svg>
        </div>


        {/* ── VECTOR POINTER LINES AND LABELS OVERLAYS ── */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1400 800"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            pointerEvents: 'none',
            zIndex: 2,
            overflow: 'visible',
          }}
        >
          {/* ── PORTAL LINE ── */}
          <path 
            d="M 220 540 L 150 490 L 80 490" 
            className={`pointer-line ${hoveredCategory === 'ai-portal' ? 'pointer-line-hover' : ''}`}
          />
          <text 
            x="80" 
            y="475" 
            className={`pointer-text ${hoveredCategory === 'ai-portal' ? 'pointer-text-hover' : ''}`}
          >
            PROJECT 1 // AI MODEL
          </text>

          {/* ── CAIRN LINE ── */}
          <path 
            d="M 680 390 L 730 350 L 830 350" 
            className={`pointer-line ${hoveredCategory === 'systems-cairn' ? 'pointer-line-hover' : ''}`}
          />
          <text 
            x="730" 
            y="335" 
            className={`pointer-text ${hoveredCategory === 'systems-cairn' ? 'pointer-text-hover' : ''}`}
          >
            PROJECT 2 // BACKEND
          </text>

          {/* ── CRYSTAL LINE ── */}
          <path 
            d="M 1200 480 L 1150 430 L 1050 430" 
            className={`pointer-line ${hoveredCategory === 'frontend-spire' ? 'pointer-line-hover' : ''}`}
          />
          <text 
            x="1050" 
            y="415" 
            className={`pointer-text ${hoveredCategory === 'frontend-spire' ? 'pointer-text-hover' : ''}`}
            textAnchor="start"
          >
            PROJECT 3 // FRONTEND
          </text>

          {/* ── OBELISK LINE ── */}
          <path 
            d="M 880 828 L 790 750 L 690 750" 
            className={`pointer-line ${hoveredCategory === 'fullstack-obelisk' ? 'pointer-line-hover' : ''}`}
          />
          <text 
            x="690" 
            y="735" 
            className={`pointer-text ${hoveredCategory === 'fullstack-obelisk' ? 'pointer-text-hover' : ''}`}
          >
            PROJECT 4 // FULLSTACK & TOOLS
          </text>
        </svg>

      </div>


      {/* ── CHISELED STONE TABLET MODAL OVERLAY ── */}
      {activeCategory && selectedCategory && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 15, 10, 0.75)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          backdropFilter: 'blur(3px)',
        }}>
          {/* Stone Tablet Outer Board Container */}
          <div style={{
            position: 'relative',
            width: '90%',
            maxWidth: '960px',
            backgroundColor: '#242921', // Chiseled slate background
            border: '6px solid #3c4538', // Muted green-gray stone border
            boxShadow: `
              inset 0 0 0 4px #151710,
              0 10px 25px rgba(0, 0, 0, 0.85)
            `,
            clipPath: `polygon(
              0px 16px, 6px 16px, 6px 10px, 10px 10px, 10px 6px, 16px 6px, 16px 0px,
              calc(100% - 16px) 0px, calc(100% - 16px) 6px, calc(100% - 10px) 6px, calc(100% - 10px) 10px, calc(100% - 6px) 10px, calc(100% - 6px) 16px, 100% 16px,
              100% calc(100% - 16px), calc(100% - 6px) calc(100% - 16px), calc(100% - 6px) calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) calc(100% - 6px), calc(100% - 16px) calc(100% - 6px), calc(100% - 16px) 100%,
              16px 100%, 16px calc(100% - 6px), 10px calc(100% - 6px), 10px calc(100% - 10px), 6px calc(100% - 10px), 6px calc(100% - 16px), 0px calc(100% - 16px)
            )`,
            padding: '2.5rem',
            color: '#7d9685', // Faded ancient green-gray text color
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderBottom: '3px solid #3c4538',
              paddingBottom: '1rem',
            }}>
              <div>
                <h2 style={{
                  fontSize: '2.4rem',
                  color: '#00f0ff', // Glowing active title
                  textShadow: '0 0 10px rgba(0, 240, 255, 0.45), 2px 2px 0 #151710',
                  margin: 0,
                  letterSpacing: '0.05em'
                }}>
                  {selectedCategory.title}
                </h2>
                <div style={{ fontSize: '1rem', color: '#56665a', marginTop: '0.2rem' }}>
                  {selectedCategory.subtitle}
                </div>
              </div>

              {/* Close Button - Chiseled style */}
              <button 
                onClick={handleCloseModal}
                style={{
                  backgroundColor: '#2d352c',
                  border: '3px solid #3c4538',
                  boxShadow: 'inset 0 0 0 2px #151710, 0 3px 0 #151710',
                  color: '#7d9685',
                  fontFamily: 'inherit',
                  fontSize: '1.2rem',
                  padding: '0.4rem 1.2rem',
                  cursor: 'pointer',
                  clipPath: `polygon(
                    0px 6px, 4px 6px, 4px 4px, 6px 4px, 6px 0px,
                    calc(100% - 6px) 0px, calc(100% - 6px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 6px, 100% 6px,
                    100% calc(100% - 6px), calc(100% - 4px) calc(100% - 6px), calc(100% - 4px) calc(100% - 4px), calc(100% - 6px) calc(100% - 4px), calc(100% - 6px) 100%,
                    6px 100%, 6px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 6px), 0px calc(100% - 6px)
                  )`,
                  outline: 'none',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#00f0ff';
                  e.currentTarget.style.borderColor = '#00f0ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#7d9685';
                  e.currentTarget.style.borderColor = '#3c4538';
                }}
              >
                CLOSE [X]
              </button>
            </div>

            {/* Modal Content - Two Column Layout */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '320px 1fr',
              gap: '2rem',
              flex: 1,
              minHeight: '280px',
            }}>
              {/* Left Column: Project Selector List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
                borderRight: '3px solid #3c4538',
                paddingRight: '1.5rem',
              }}>
                {selectedCategory.projects.map((proj) => {
                  const isActive = proj.id === activeProjectId;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => setActiveProjectId(proj.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        backgroundColor: isActive ? '#3c4538' : '#1b201a',
                        border: isActive ? '3px solid #00f0ff' : '3px solid #3c4538',
                        boxShadow: 'inset 0 0 0 2px #151710',
                        color: isActive ? '#00f0ff' : '#7d9685',
                        fontFamily: 'inherit',
                        fontSize: '1.2rem',
                        padding: '0.8rem 1.2rem',
                        cursor: 'pointer',
                        clipPath: `polygon(
                          0px 8px, 4px 8px, 4px 4px, 8px 4px, 8px 0px,
                          calc(100% - 8px) 0px, calc(100% - 8px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 8px, 100% 8px,
                          100% calc(100% - 8px), calc(100% - 4px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px), calc(100% - 8px) calc(100% - 4px), calc(100% - 8px) 100%,
                          8px 100%, 8px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 8px), 0px calc(100% - 8px)
                        )`,
                        outline: 'none',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) e.currentTarget.style.color = '#e0fff0';
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) e.currentTarget.style.color = '#7d9685';
                      }}
                    >
                      {proj.title}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Active Project Detail Panel */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                justifyContent: 'space-between',
              }}>
                {selectedProject ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      <h3 style={{
                        fontSize: '1.8rem',
                        color: '#dfb65d', // Warm light bronze title
                        textShadow: '2px 2px 0 #151710',
                        margin: 0,
                      }}>
                        {selectedProject.title}
                      </h3>
                      
                      <p style={{
                        fontSize: '1.15rem',
                        lineHeight: 1.6,
                        color: '#b8c0af', // Chalk green text for description
                        margin: 0,
                        fontFamily: 'monospace',
                      }}>
                        {selectedProject.description}
                      </p>

                      {/* Tech tags */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                      }}>
                        {selectedProject.tech.map((t) => (
                          <span 
                            key={t}
                            style={{
                              backgroundColor: '#1b201a',
                              border: '2px solid #3c4538',
                              padding: '0.2rem 0.6rem',
                              fontSize: '0.9rem',
                              color: '#7d9685',
                              fontFamily: 'monospace',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    {selectedProject.links && (
                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        borderTop: '2px solid #3c4538',
                        paddingTop: '1rem',
                      }}>
                        {selectedProject.links.github && (
                          <a
                            href={selectedProject.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#2d352c',
                              border: '3px solid #3c4538',
                              boxShadow: 'inset 0 0 0 2px #151710',
                              color: '#dfb65d',
                              textDecoration: 'none',
                              fontSize: '1.1rem',
                              padding: '0.4rem 1.2rem',
                              clipPath: `polygon(
                                0px 6px, 4px 6px, 4px 4px, 6px 4px, 6px 0px,
                                calc(100% - 6px) 0px, calc(100% - 6px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 6px, 100% 6px,
                                100% calc(100% - 6px), calc(100% - 4px) calc(100% - 6px), calc(100% - 4px) calc(100% - 4px), calc(100% - 6px) calc(100% - 4px), calc(100% - 6px) 100%,
                                6px 100%, 6px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 6px), 0px calc(100% - 6px)
                              )`,
                              transition: 'all 0.2s ease',
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.borderColor = '#dfb65d';
                              e.currentTarget.style.color = '#e0fff0';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.borderColor = '#3c4538';
                              e.currentTarget.style.color = '#dfb65d';
                            }}
                          >
                            GITHUB REPO
                          </a>
                        )}
                        {selectedProject.links.demo && (
                          <a
                            href={selectedProject.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#2d352c',
                              border: '3px solid #3c4538',
                              boxShadow: 'inset 0 0 0 2px #151710',
                              color: '#00f0ff',
                              textDecoration: 'none',
                              fontSize: '1.1rem',
                              padding: '0.4rem 1.2rem',
                              clipPath: `polygon(
                                0px 6px, 4px 6px, 4px 4px, 6px 4px, 6px 0px,
                                calc(100% - 6px) 0px, calc(100% - 6px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 6px, 100% 6px,
                                100% calc(100% - 6px), calc(100% - 4px) calc(100% - 6px), calc(100% - 4px) calc(100% - 4px), calc(100% - 6px) calc(100% - 4px), calc(100% - 6px) 100%,
                                6px 100%, 6px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 6px), 0px calc(100% - 6px)
                              )`,
                              transition: 'all 0.2s ease',
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.borderColor = '#00f0ff';
                              e.currentTarget.style.color = '#e0fff0';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.borderColor = '#3c4538';
                              e.currentTarget.style.color = '#00f0ff';
                            }}
                          >
                            LIVE DEMO
                          </a>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ color: '#56665a', fontSize: '1.1rem', fontFamily: 'monospace' }}>
                    Select a project to view its details.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
