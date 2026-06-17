"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import DitherButton from './dither-button';
import Button03 from './pixel-broke-button';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories: ProjectCategory[] = [
    {
      id: 'ai-portal',
      title: 'AI PORTAL',
      subtitle: 'GROUP 1 // COMPUTER VISION & ANALYTICS',
      iconName: 'portal',
      projects: [
        {
          id: 'scenix',
          title: 'Scénix: Biomechanics Coach',
          description: 'Built an end-to-end athletic performance analysis platform leveraging Google\'s BlazePose CNN for real-time joint tracking and Gemini 2.5 Flash AI for biomechanical assessment, enabling users to capture movement data via webcam or video upload and receive detailed coaching feedback on form, symmetry, and technique.',
          tech: ['React', 'Vite', 'Google GenAI', 'Supabase', 'MediaPipe BlazePose', 'Tailwind CSS'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/scenix' }
        },
        {
          id: 'skin-lesion',
          title: 'Skin Lesion CNN Classifier',
          description: 'Engineered a full deep learning pipeline to classify skin lesions across 3 dermoscopic datasets (ISIC 2017, HAM10000, DERM12345), benchmarking 3 CNN architectures: ResNet-18, VGG-16 and MobileNetV2, in both from-scratch and transfer learning modes for early melanoma detection. Implemented Grad-CAM visual explainability and inverse-frequency weighted loss to handle class imbalance.',
          tech: ['PyTorch', 'ResNet-18', 'VGG-16', 'MobileNetV2', 'YAML'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/skin-lesion' }
        },
        {
          id: 'customer-churn',
          title: 'Predicting Customer Churn',
          description: 'Built an end-to-end churn prediction pipeline on 1,001 StreamFlex subscriber records, training a Decision Tree Classifier tuned via GridSearchCV across 224 hyperparameter combinations, achieving 81.5% accuracy and 92.75% recall on a held-out test set. Conducted full EDA with 14 custom visualisations and surfaced top 3 churn drivers.',
          tech: ['Python', 'scikit-learn', 'pandas', 'seaborn'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/churn-prediction' }
        },
        {
          id: 'resume-parser',
          title: 'Universal Resume Parser',
          description: 'Built a resume parser using Ollama LLM to extract employability-specific data from any resume. Implemented hyperlink detection, multi-domain support, and context-aware parsing for tech, business, healthcare, and creative resumes.',
          tech: ['Python', 'Ollama LLM', 'PDFPlumber', 'LangChain'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/resume-parser' }
        },
        {
          id: 'drip-genius',
          title: 'DRIP GENIUS: Outfit Recommender',
          description: 'Fashion recommendation app to analyze clothing images and generate personalized outfit suggestions. Implemented computer vision-based clothing detection, K-means colour analysis, and responsive UI.',
          tech: ['Roboflow', 'K-means Clustering', 'React', 'TailwindCSS'],
          links: { demo: '#' }
        }
      ]
    },
    {
      id: 'fullstack-obelisk',
      title: 'INTEGRATION OBELISK',
      subtitle: 'GROUP 2 // FULLSTACK & AI INTEGRATIONS',
      iconName: 'obelisk',
      projects: [
        {
          id: 'canhealth',
          title: 'CANHEALTH: FinTech Platform',
          description: 'Architected a healthcare fintech platform combining AI-powered fraud detection and a patient credit line system. Integrated Google Gemini for real-time anomaly tracking, ElevenLabs voice agents for conversational financial support, and Brim Financial infrastructure for programmable cards and policy automation.',
          tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'Google Gemini', 'ElevenLabs', 'Brim Financial'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/canhealth' }
        },
        {
          id: 'medivault',
          title: 'MediVault',
          description: 'Built a decentralized marketplace enabling patients to securely digitize, own, and monetize their medical records. Integrated OpenRouter and ElevenLabs for AI engagement, Solana for transactions, and Snowflake/MongoDB for secure data infrastructure.',
          tech: ['OpenRouter', 'Dialogue', 'MongoDB', 'ElevenLabs', 'Snowflake', 'Vultr', 'Solana'],
          links: { demo: '#' }
        },
        {
          id: 'flux',
          title: 'FLUX: Scheduling App',
          description: 'Developed scheduling platform as a team of 5, leveraging Gemini AI to automate the extraction of structured availability from timetable screenshots. Utilized dimensional graph analysis to model cognitive load and peak focus hours to finalize meetings.',
          tech: ['React', 'TypeScript', 'Supabase', 'Gemini AI'],
          links: { demo: '#' }
        },
        {
          id: 'interbu',
          title: 'INTERBU: AI Interview Coach',
          description: 'Built an AI interview coach for personalized, resume and job description-based practice. Added local data storage and offline LLM fallback for privacy and reliability.',
          tech: ['React', 'Flask', 'Whisper'],
          links: { demo: '#' }
        },
        {
          id: 'code-buddy',
          title: 'Code Buddy: Code Review Tool',
          description: 'Built an AI-powered code review tool providing instant, syntax-aware feedback for learners. Integrated a live code editor and markdown-rendered responses.',
          tech: ['React', 'Vite', 'Node.js', 'Express'],
          links: { demo: '#' }
        }
      ]
    },
    {
      id: 'frontend-spire',
      title: 'CRYSTAL SPIRE',
      subtitle: 'GROUP 3 // WEB APPLICATIONS & SYSTEMS',
      iconName: 'crystals',
      projects: [
        {
          id: 'events-ticketing',
          title: 'Events & Ticketing App',
          description: 'Led a 7-person team to build a campus events and ticketing platform. Developed features enabling event discovery, QR code ticketing, social connections, organizer analytics dashboards, and admin moderation tools.',
          tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL'],
          links: { demo: '#' }
        },
        {
          id: 'hospital-db',
          title: 'Hospital Database System',
          description: 'Developed a hospital database management system handling patient records, appointments, staff schedules, billing, and medical histories. Designed two flexible architectures for both SQL (PostgreSQL) and NoSQL (MongoDB).',
          tech: ['PostgreSQL', 'MongoDB', 'SQL', 'NoSQL'],
          links: {}
        },
        {
          id: 'click2bill',
          title: 'Click2Bill Invoice System',
          description: 'Developed a service request and invoicing system streamlining form submissions, invoice generation, and email delivery for a real shop owner. Implemented workflow automation with searchable records and PDF templates.',
          tech: ['Google Sheets', 'Apps Script', 'PDF-Email Integration'],
          links: { demo: '#' }
        },
        {
          id: 'health-companion',
          title: 'Health Companion App',
          description: 'Spearheaded mixed-methods research with 60 participants to engineer an Adaptive UI system with three distinct interface modes, successfully bridging the tech-literacy gap for senior users. Developed OCR onboarding flow with high-fidelity prototype in Figma.',
          tech: ['Figma', 'UX Research', 'Mixed-Methods', 'WCAG AA'],
          links: { github: 'https://github.com/Ranjit-Singh-Dhunna/health-companion' }
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
            '--base-filter': 'brightness(0.72) saturate(0.72)',
            '--hover-filter': 'brightness(1.08) saturate(1.05)',
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
            top: '87%',
            width: '195px',
            height: '215px',
            pointerEvents: 'auto',
            animationDelay: '2.4s',
            '--base-filter': 'brightness(0.72) saturate(0.72)',
            '--hover-filter': 'brightness(1.08) saturate(1.05)',
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
            '--base-filter': 'brightness(0.85) saturate(0.85)',
            '--hover-filter': 'brightness(1.15) saturate(1.1)',
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
      {mounted && activeCategory && selectedCategory && createPortal(
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 15, 10, 0.75)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          backdropFilter: 'blur(3px)',
        }}>
          {/* Parent filter wrapper to apply drop-shadow to the clipped shape */}
          <div style={{
            position: 'relative',
            width: '94%',
            maxWidth: '1150px',
            filter: 'drop-shadow(0 12px 35px rgba(0, 0, 0, 0.95))',
          }}>
            {/* Stone Tablet Outer Board (Behaves as the solid stone border) */}
            <div style={{
              backgroundColor: '#3c4538', // Stone border color
              padding: '6px', // border thickness (6px)
              boxSizing: 'border-box',
              clipPath: `polygon(
                0px 16px, 6px 16px, 6px 10px, 10px 10px, 10px 6px, 16px 6px, 16px 0px,
                calc(100% - 16px) 0px, calc(100% - 16px) 6px, calc(100% - 10px) 6px, calc(100% - 10px) 10px, calc(100% - 6px) 10px, calc(100% - 6px) 16px, 100% 16px,
                100% calc(100% - 16px), calc(100% - 6px) calc(100% - 16px), calc(100% - 6px) calc(100% - 10px), calc(100% - 10px) calc(100% - 10px), calc(100% - 10px) calc(100% - 6px), calc(100% - 16px) calc(100% - 6px), calc(100% - 16px) 100%,
                16px 100%, 16px calc(100% - 6px), 10px calc(100% - 6px), 10px calc(100% - 10px), 6px calc(100% - 10px), 6px calc(100% - 16px), 0px calc(100% - 16px)
              )`,
            }}>
              {/* Stone Tablet Inner Body (Popup content container) */}
              <div style={{
                backgroundColor: '#242921', // Chiseled slate background
                boxShadow: `
                  inset 4px 4px 0 0 #56665a,
                  inset -4px -4px 0 0 #151710
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
                fontFamily: 'var(--font-pixelify), monospace',
                flexDirection: 'column',
                gap: '1.5rem',
                width: '100%',
                boxSizing: 'border-box',
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
                    <Button03
                      key={proj.id}
                      text={proj.title}
                      onClick={() => setActiveProjectId(proj.id)}
                      isActive={isActive}
                      align="center"
                      style={{
                        width: '100%',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-pixelify), monospace',
                        fontWeight: 'bold',
                      }}
                    />
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
                        fontFamily: 'var(--font-pixelify), monospace',
                        fontWeight: 'bold',
                        letterSpacing: '0.02em',
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
                              fontFamily: 'var(--font-pixelify), monospace',
                              fontWeight: 'bold',
                              clipPath: `polygon(
                                0px 4px, 4px 4px, 4px 0px,
                                calc(100% - 4px) 0px, calc(100% - 4px) 4px, 100% 4px,
                                100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
                                4px 100%, 4px calc(100% - 4px), 0px calc(100% - 4px)
                              )`
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
                        {selectedProject.links?.github && (
                          <DitherButton
                            onClick={() => window.open(selectedProject.links?.github, '_blank', 'noopener,noreferrer')}
                            ditherColor="#9e8143"
                            ditherOpacity={0.55}
                            ditherSize={4}
                            style={{
                              backgroundColor: '#2d352c',
                              border: '3px solid #3c4538',
                              boxShadow: 'inset 0 0 0 2px #151710',
                              color: '#dfb65d',
                              fontSize: '1.1rem',
                              padding: '0.4rem 1.2rem',
                              clipPath: `polygon(
                                0px 6px, 4px 6px, 4px 4px, 6px 4px, 6px 0px,
                                calc(100% - 6px) 0px, calc(100% - 6px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 6px, 100% 6px,
                                100% calc(100% - 6px), calc(100% - 4px) calc(100% - 6px), calc(100% - 4px) calc(100% - 4px), calc(100% - 6px) calc(100% - 4px), calc(100% - 6px) 100%,
                                6px 100%, 6px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 6px), 0px calc(100% - 6px)
                              )`,
                              cursor: 'pointer',
                              fontFamily: 'var(--font-pixelify), monospace',
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
                          </DitherButton>
                        )}
                        {selectedProject.links?.demo && (
                          <DitherButton
                            onClick={() => window.open(selectedProject.links?.demo, '_blank', 'noopener,noreferrer')}
                            ditherColor="#3c96a6"
                            ditherOpacity={0.55}
                            ditherSize={4}
                            style={{
                              backgroundColor: '#2d352c',
                              border: '3px solid #3c4538',
                              boxShadow: 'inset 0 0 0 2px #151710',
                              color: '#00f0ff',
                              fontSize: '1.1rem',
                              padding: '0.4rem 1.2rem',
                              clipPath: `polygon(
                                0px 6px, 4px 6px, 4px 4px, 6px 4px, 6px 0px,
                                calc(100% - 6px) 0px, calc(100% - 6px) 4px, calc(100% - 4px) 4px, calc(100% - 4px) 6px, 100% 6px,
                                100% calc(100% - 6px), calc(100% - 4px) calc(100% - 6px), calc(100% - 4px) calc(100% - 4px), calc(100% - 6px) calc(100% - 4px), calc(100% - 6px) 100%,
                                6px 100%, 6px calc(100% - 4px), 4px calc(100% - 4px), 4px calc(100% - 6px), 0px calc(100% - 6px)
                              )`,
                              cursor: 'pointer',
                              fontFamily: 'var(--font-pixelify), monospace',
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
                          </DitherButton>
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
    </div>
  </div>
      , document.body)}

    </div>
  );
}
