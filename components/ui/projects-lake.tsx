"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Firefly {
  angle: number;
  speed: number;
  radius: number;
  yOffset: number;
  riseSpeed: number;
  size: number;
  color: string;
}

interface FireflyCanvasProps {
  width: number;
  height: number;
  particleCount?: number;
  colorTheme?: 'cyan' | 'blue' | 'mixed';
  verticalMin?: number;
  verticalMax?: number;
  radiusMin?: number;
  radiusMax?: number;
  style?: React.CSSProperties;
}

const FireflyCanvas: React.FC<FireflyCanvasProps> = ({
  width,
  height,
  particleCount = 15,
  colorTheme = 'mixed',
  verticalMin = -100,
  verticalMax = 100,
  radiusMin = 30,
  radiusMax = 60,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const colors = {
      cyan: ['#00f0ff', '#80f7ff', '#00e1ff'],
      blue: ['#00a2ff', '#4faeff', '#0072ff'],
      mixed: ['#00f0ff', '#00a2ff', '#80f7ff', '#4faeff']
    }[colorTheme];

    const particles: Firefly[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.003, // Slightly reduced spin speed
        radius: radiusMin + Math.random() * (radiusMax - radiusMin), // Custom orbital radius per relic
        yOffset: verticalMin + Math.random() * (verticalMax - verticalMin),
        riseSpeed: 0.08 + Math.random() * 0.12, // Restored vertical rise speed
        size: 2 + Math.random() * 1.5, // 2px to 3.5px base wisp core size
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach((p) => {
        p.angle = (p.angle + p.speed) % (Math.PI * 2);
        p.yOffset -= p.riseSpeed;
        if (p.yOffset < verticalMin) {
          p.yOffset = verticalMax;
          p.angle = Math.random() * Math.PI * 2;
        }

        const x = centerX + p.radius * Math.cos(p.angle);
        const y = centerY + p.yOffset + (p.radius * 0.22) * Math.sin(p.angle);

        const sinVal = Math.sin(p.angle);
        if (sinVal > 0) {
          const opacity = 0.5 + sinVal * 0.5; // Baseline opacity 0.5
          const pSize = p.size;

          ctx.save();
          // Use additive blend mode for maximum luminescent brightness
          ctx.globalCompositeOperation = 'lighter';

          // ================= PASS 1: SOFT NEON BLOOM AURA =================
          ctx.save();
          ctx.shadowBlur = 18 + pSize * 4.0;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = opacity * 0.45; // Soft glow aura
          ctx.beginPath();
          ctx.arc(x, y, pSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // ================= PASS 2: SOLID CORE & CARDINAL FLARES =================
          ctx.save();
          ctx.shadowBlur = 6 + pSize;
          ctx.shadowColor = p.color;
          
          // Center Core (Pure white hot-spot for intense luminescent center)
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = opacity * 1.0;
          ctx.beginPath();
          ctx.arc(x, y, pSize / 2, 0, Math.PI * 2);
          ctx.fill();

          // Cardinal Flares (Neon color)
          ctx.fillStyle = p.color;
          ctx.globalAlpha = opacity * 0.85;
          ctx.beginPath();
          ctx.arc(x, y - pSize * 1.1, pSize / 3.5, 0, Math.PI * 2); // Top flare
          ctx.arc(x, y + pSize * 1.1, pSize / 3.5, 0, Math.PI * 2); // Bottom flare
          ctx.arc(x - pSize * 1.1, y, pSize / 3.5, 0, Math.PI * 2); // Left flare
          ctx.arc(x + pSize * 1.1, y, pSize / 3.5, 0, Math.PI * 2); // Right flare
          ctx.fill();

          // Corner outer details
          ctx.globalAlpha = opacity * 0.50;
          ctx.beginPath();
          ctx.arc(x - pSize, y - pSize, pSize / 5, 0, Math.PI * 2); // Top-Left
          ctx.arc(x + pSize, y - pSize, pSize / 5, 0, Math.PI * 2); // Top-Right
          ctx.arc(x - pSize, y + pSize, pSize / 5, 0, Math.PI * 2); // Bottom-Left
          ctx.arc(x + pSize, y + pSize, pSize / 5, 0, Math.PI * 2); // Bottom-Right
          ctx.fill();

          ctx.restore();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [width, height, particleCount, colorTheme, verticalMin, verticalMax, radiusMin, radiusMax]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 5,
        ...style,
      }}
    />
  );
};

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
      overflow: 'visible',
    }}>
      
      <style>{`
        @keyframes pixelRuneGlow {
          0%, 100% { opacity: 0.55; filter: brightness(0.9); }
          50% { opacity: 1; filter: brightness(1.3); }
        }
        @keyframes pixelRuneGlowAlt {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes pixelSparkle {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 1; }
        }
        @keyframes portalSwirl {
          0%, 100% { filter: brightness(0.9) saturate(0.9); }
          50% { filter: brightness(1.15) saturate(1.1); }
        }
        .lake-relic {
          cursor: pointer;
        }
        .lake-relic img {
          transition: filter 0.35s ease;
          filter: var(--base-filter, none);
        }
        .lake-relic:hover img {
          filter: var(--hover-filter, none);
        }
        .pixel-rune-glow {
          animation: pixelRuneGlow 2.5s ease-in-out infinite;
        }
        .pixel-rune-glow-alt {
          animation: pixelRuneGlowAlt 2s ease-in-out infinite;
        }
        .pixel-sparkle {
          animation: pixelSparkle 1.5s ease-in-out infinite;
        }
        .portal-swirl {
          animation: portalSwirl 4s ease-in-out infinite;
      `}</style>

      {/* ── INTERACTIVE ARTIFACTS OVERLAY VIEWPORT ── */}
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

        {/* ═══════════════════════════════════════════════════════════
            ARTIFACT 1 — SUNKEN PORTAL ARCH  (AI / ML)
           ═══════════════════════════════════════════════════════════ */}
        <div 
          className="lake-relic"
          onClick={() => handleOpenModal('ai-portal')}
          onMouseEnter={() => setHoveredCategory('ai-portal')}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            position: 'absolute',
            left: '20.5%',
            top: '30%',
            width: '245px',
            height: '226px',
            pointerEvents: 'auto',
            animationDelay: '0s',
            '--base-filter': 'brightness(0.65) saturate(0.65)',
            '--hover-filter': 'brightness(1.35) saturate(1.25)',
            transform: 'rotate(12deg)',
          } as React.CSSProperties}
        >
          <img 
            src="/arti1-removebg-preview.png" 
            alt="AI Portal" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', 
              imageRendering: 'pixelated' 
            }} 
          />
          <FireflyCanvas 
            width={300} 
            height={300} 
            particleCount={12} 
            colorTheme="mixed" 
            verticalMin={-85} 
            verticalMax={85} 
            radiusMin={50}
            radiusMax={85}
            style={{ transform: 'translate(-54%, -55%)' }}
          />
        </div>


        {/* ═══════════════════════════════════════════════════════════
            ARTIFACT 3 — CRYSTAL FORMATION  (FRONTEND)
           ═══════════════════════════════════════════════════════════ */}
        <div 
          className="lake-relic"
          onClick={() => handleOpenModal('frontend-spire')}
          onMouseEnter={() => setHoveredCategory('frontend-spire')}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            position: 'absolute',
            left: '50.2%',
            top: '89.5%',
            width: '170px',
            height: '187px',
            pointerEvents: 'auto',
            animationDelay: '2.4s',
            '--base-filter': 'brightness(0.65) saturate(0.65)',
            '--hover-filter': 'brightness(1.35) saturate(1.25)',
            transform: 'rotate(35deg)',
          } as React.CSSProperties}
        >
          <img 
            src="/arti3-removebg-preview.png" 
            alt="Crystal Spire" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', 
              imageRendering: 'pixelated' 
            }} 
          />
          <FireflyCanvas 
            width={250} 
            height={250} 
            particleCount={9} 
            colorTheme="blue" 
            verticalMin={-65} 
            verticalMax={65} 
            style={{ transform: 'translate(-53%, -54%)' }}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            ARTIFACT 4 — INTEGRATION OBELISK  (FULLSTACK & TOOLS)
           ═══════════════════════════════════════════════════════════ */}
        <div 
          className="lake-relic"
          onClick={() => handleOpenModal('fullstack-obelisk')}
          onMouseEnter={() => setHoveredCategory('fullstack-obelisk')}
          onMouseLeave={() => setHoveredCategory(null)}
          style={{
            position: 'absolute',
            left: '68.9%',
            top: '15.5%',
            width: '210px',
            height: '286px',
            pointerEvents: 'auto',
            animationDelay: '3.6s',
            '--base-filter': 'brightness(0.8) saturate(0.8)',
            '--hover-filter': 'brightness(1.45) saturate(1.35)',
          } as React.CSSProperties}
        >
          <img 
            src="/arti4-removebg-preview.png" 
            alt="Integration Obelisk" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain', 
              imageRendering: 'pixelated' 
            }} 
          />
          <FireflyCanvas 
            width={320} 
            height={320} 
            particleCount={14} 
            colorTheme="cyan" 
            verticalMin={-110} 
            verticalMax={110} 
          />
        </div>



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
