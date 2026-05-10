"use client";
import { useState, UIEvent, useEffect } from 'react';
import Link from 'next/link';

const projectsData = [
  { 
    name: "Predicting Customer Churn", 
    tag: "Machine Learning · Analytics", 
    color: "#FF0055", 
    link: "https://github.com/Ranjit-Singh-Dhunna/Predicting-Churn-DTC-RFC" 
  },
  { 
    name: "Skin Lesion CNN", 
    tag: "Deep Learning · Healthcare", 
    color: "#FFD700", 
    link: "https://github.com/Ranjit-Singh-Dhunna/skin-lesion-cnn" 
  },
  { 
    name: "Health Companion", 
    tag: "Mobile App · Wellness", 
    color: "#0066FF", 
    link: "https://github.com/Ranjit-Singh-Dhunna/HEALTH-COMPANION-APP-" 
  },
  { 
    name: "Events & Ticketing App", 
    tag: "Full Stack · E-Commerce", 
    color: "#FF5500", 
    link: "https://github.com/Ranjit-Singh-Dhunna/Events-TicketingApp" 
  },
  { 
    name: "FLUX", 
    tag: "Productivity · SaaS", 
    color: "#00EEFF", 
    link: "https://github.com/Ranjit-Singh-Dhunna/Flux" 
  },
  { 
    name: "DRIP GENIUS", 
    tag: "AI · Fashion Tech", 
    color: "#FF00FF", 
    link: "https://github.com/Ranjit-Singh-Dhunna/Outfit-Recommendation-System" 
  },
  { 
    name: "Code Buddy", 
    tag: "Developer Tool · AI", 
    color: "#55FF00", 
    link: "https://github.com/Ranjit-Singh-Dhunna/Code-Instructor" 
  },
  { 
    name: "Universal Resume Parser", 
    tag: "NLP · Automation", 
    color: "#00FF99", 
    link: "https://github.com/Ranjit-Singh-Dhunna/Resume-Parser-JSON" 
  },
  { 
    name: "Click2Bill", 
    tag: "FinTech · SaaS", 
    color: "#7B68EE", 
    link: "https://github.com/Ranjit-Singh-Dhunna/gsheets-invoice-automation" 
  },
  { 
    name: "INTERBU", 
    tag: "Startup · Platform", 
    color: "#20B2AA", 
    link: "https://github.com/Ranjit-Singh-Dhunna/ai-interview-coach" 
  },
  { 
    name: "MediVault", 
    tag: "Health Records · Web App", 
    color: "#9900FF", 
    link: "https://github.com/Ranjit-Singh-Dhunna/MediVault" 
  }
];

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("");
  const [showProjectsLink, setShowProjectsLink] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [langIndex, setLangIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const welcomeTexts = [
    "WELCOME",
    "ਜੀ ਆਇਆਂ ਨੂੰ",
    "BONJOUR",
    "欢迎",
    "BIENVENIDO",
    "ДОБРО ПОЖАЛОВАТЬ",
    "ようこそ"
  ];

  const projectTitleTexts = [
    "HAVE A LOOK AT SOME PROJECTS",
    "ਕੁਝ ਪ੍ਰੋਜੈਕਟਾਂ 'ਤੇ ਨਜ਼ਰ ਮਾਰੋ",
    "VOICI QUELQUES PROJETS",
    "看看一些项目",
    "ECHA UN VISTAZO A ALGUNOS PROYECTOS",
    "ПОСМОТРИТЕ НА НЕКОТОРЫЕ ПРОЕКТЫ",
    "いくつかのプロジェクトを見てください"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setLangIndex((prev) => (prev + 1) % welcomeTexts.length);
        setFade(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleProjectClick = (name: string) => {
    const project = projectsData.find(p => p.name === name);
    if (project?.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const threshold = window.innerHeight * 0.3;
    setShowProjectsLink(scrollTop < threshold);
  };

  return (
    <>
      <nav>
        <div style={{ 
          perspective: '500px', 
          height: '1.5em', 
          minWidth: '200px', 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <div 
            style={{ 
              width: '100%',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
              transform: fade ? 'rotateX(0deg)' : 'rotateX(-90deg)',
              opacity: fade ? 1 : 0,
            }}
          >
            <a 
              href="#intro" 
              className="nav-logo" 
              style={{ 
                display: 'block',
                whiteSpace: 'nowrap',
                transform: (langIndex === 1) ? 'translateY(-2px)' : 'translateY(0)',
                fontSize: (langIndex === 1 || langIndex === 5 || langIndex === 8) ? '1.2rem' : '0.9rem'
              }}
            >
              {welcomeTexts[langIndex]}
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="#projects" style={{ opacity: showProjectsLink ? 1 : 0, transition: 'opacity 0.3s ease' }}>PROJECTS &darr;</a>
          <a 
            href="https://www.linkedin.com/in/ranjit-singh-dhunna-772790307" 
            target="_blank" 
            rel="noopener noreferrer"
            className="linkedin-link"
            style={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'inherit',
              transition: 'opacity 0.3s ease'
            }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        </div>
      </nav>

      <main onScroll={handleScroll}>
        {/* INTRO SECTION */}
        <section id="intro">
          <div className="intro-container">
            <div className="headline">
              Curious about <span className="name">Ranjit?</span><br />
              <span className="vibe-text">Choose your vibe.</span>
            </div>
            <div className="theme-grid">
              
              <Link href="/comic" className="theme-btn style-btn" data-theme="comic" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">Comic</span>
              </Link>
              
              <Link href="/pixel" className="theme-btn style-btn" data-theme="pixel" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">Pixel</span>
              </Link>

              <Link href="/minimal" className="theme-btn style-btn" data-theme="minimal" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">Minimalistic</span>
              </Link>

              <Link href="/desktop" className="theme-btn style-btn" data-theme="desktop" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">Desktop</span>
              </Link>

              <Link href="/hyper" className="theme-btn style-btn" data-theme="hyper" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">Hyper Scroll</span>
              </Link>

              <Link href="/traditional" className="theme-btn style-btn" data-theme="traditional" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">Traditional</span>
              </Link>

              <Link href="/book" className="theme-btn style-btn" data-theme="book" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">Book</span>
              </Link>

              <Link href="/stalker" className="theme-btn style-btn" data-theme="stalker" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">Stalker</span>
              </Link>

              <Link href="/3d" className="theme-btn style-btn" data-theme="3d" style={{ backgroundColor: 'transparent', color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="btn-label">3D</span>
              </Link>

            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <div 
            className="section-title"
            style={{ 
              perspective: '500px',
              display: 'flex',
              alignItems: 'center',
              height: 'calc(var(--padding) * 2 + 3rem)' // Stabilize total height
            }}
          >
            <div
              style={{
                width: '100%',
                height: '1.2em', // Fixed content height
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transformStyle: 'preserve-3d',
                transform: fade ? 'rotateX(0deg)' : 'rotateX(-90deg)',
                opacity: fade ? 1 : 0,
              }}
            >
              <h2 
                style={{ 
                  margin: 0, 
                  fontSize: 'inherit', 
                  fontWeight: 'inherit', 
                  textTransform: 'inherit', 
                  letterSpacing: 'inherit',
                  whiteSpace: 'nowrap'
                }}
              >
                {projectTitleTexts[langIndex]}
              </h2>
            </div>
          </div>
          <div className="projects-grid" id="projects-container">
            {projectsData.map((p, idx) => (
              <div 
                key={idx} 
                className="project-item" 
                onClick={() => handleProjectClick(p.name)}
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{ 
                  marginTop: (
                    p.name === "Skin Lesion CNN" || 
                    p.name === "Events & Ticketing App" || 
                    p.name === "DRIP GENIUS" || 
                    p.name === "Universal Resume Parser"
                  ) ? '0px' : undefined 
                }}
              >
                <div 
                  className="project-title" 
                  style={{ 
                    position: 'relative', 
                    zIndex: 1
                  }}
                >
                  {p.name}
                </div>
                <div className="project-tag" style={{ position: 'relative', zIndex: 1 }}>
                  {p.tag}
                </div>

                {/* Ink Splash Effect (Absolute and non-intrusive) */}
                {(() => {
                  const isSmall = ["INTERBU", "DRIP GENIUS", "Code Buddy", "Click2Bill", "FLUX", "MediVault"].includes(p.name);
                  const sf = isSmall ? 0.8 : (p.name === "Universal Resume Parser" ? 0.9 : 1.0);
                  
                  // Interchange splash designs
                  let splashIdx = idx;
                  if (p.name === "Skin Lesion CNN") splashIdx = 7;
                  else if (p.name === "Universal Resume Parser") splashIdx = 1;
                  else if (p.name === "FLUX") splashIdx = 9;
                  else if (p.name === "INTERBU") splashIdx = 4;
                  
                  return (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: p.name === "INTERBU" ? '20%' : (p.name === "DRIP GENIUS" ? '50%' : (isSmall ? '35%' : '50%')),
                        width: '0',
                        height: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        zIndex: 0,
                        opacity: hoveredProject === idx ? 0.9 : 0,
                        transition: 'opacity 0.5s ease',
                        filter: 'url(#ink-splash-filter)'
                      }}
                    >
                      <svg 
                        viewBox="0 0 200 200" 
                        style={{ 
                          width: `${450 * sf}px`, 
                          height: `${350 * sf}px`, 
                          flexShrink: 0,
                          overflow: 'visible' 
                        }}
                      >
                        <g fill={p.color}>
                          {/* Central Mass */}
                          <circle 
                            cx="100" cy="100" 
                            r={hoveredProject === idx ? 45 * sf : 5} 
                            style={{ transition: 'all 0.9s cubic-bezier(0.2, 1, 0.3, 1)' }} 
                          />
                          
                          {/* Organic Satellite Blobs */}
                          {Array.from({ length: 12 }).map((_, i) => {
                            const seed = (splashIdx + 1) * (i + 7);
                            const angle = (i / 12) * Math.PI * 2 + (seed % 100) / 50;
                            const dist = (40 + (seed % 50)) * sf;
                            const r = (15 + (seed % 20)) * sf;
                            const dx = Math.cos(angle) * dist;
                            const dy = Math.sin(angle) * dist;
                            return (
                              <circle 
                                key={i}
                                cx={hoveredProject === idx ? 100 + dx : 100}
                                cy={hoveredProject === idx ? 100 + dy : 100}
                                r={hoveredProject === idx ? r : 2}
                                style={{ transition: `all ${0.7 + (seed % 5) / 10}s cubic-bezier(0.2, 1, 0.3, 1)` }}
                              />
                            );
                          })}

                          {/* Fine Splatter Dots */}
                          {Array.from({ length: 20 }).map((_, i) => {
                            const seed = (splashIdx + 1) * (i + 13);
                            const angle = Math.random() * Math.PI * 2; 
                            const dist = (70 + (seed % 80)) * sf;
                            const r = (2 + (seed % 4)) * sf;
                            const dx = Math.cos(angle) * dist;
                            const dy = Math.sin(angle) * dist;
                            return (
                              <circle 
                                key={`s-${i}`}
                                cx={hoveredProject === idx ? 100 + dx : 100}
                                cy={hoveredProject === idx ? 100 + dy : 100}
                                r={hoveredProject === idx ? r : 0}
                                style={{ transition: `all ${1.0 + (seed % 10) / 10}s cubic-bezier(0.1, 1, 0.1, 1)` }}
                              />
                            );
                          })}
                        </g>
                      </svg>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL */}
      <div id="modal" className={modalOpen ? 'active' : ''}>
        <button id="modal-close" onClick={() => setModalOpen(false)}>&times;</button>
        <h1 id="modal-title">{activeProject}</h1>
        <div id="modal-status">Coming soon</div>
      </div>
      {/* SVG Filters for Ink Splash */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="ink-splash-filter">
            {/* Gooey effect: Blur + ColorMatrix */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            
            {/* Organic edge distortion */}
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="goo" in2="noise" scale="35" result="distort" />
            
            {/* Fine grain texture */}
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="grain_noise" />
            <feComposite in="distort" in2="grain_noise" operator="arithmetic" k1="0.1" k2="0.9" result="textured" />
            
            <feComposite in="textured" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
