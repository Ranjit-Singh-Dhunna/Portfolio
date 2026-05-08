"use client";
import { useState, UIEvent, useEffect } from 'react';

const projectsData = [
  { name: "Predicting Customer Churn", tag: "Machine Learning · Analytics", color: "#FF0055" },
  { name: "Skin Lesion CNN", tag: "Deep Learning · Healthcare", color: "#00FF99" },
  { name: "Health Companion", tag: "Mobile App · Wellness", color: "#0066FF" },
  { name: "Events & Ticketing App", tag: "Full Stack · E-Commerce", color: "#FF5500" },
  { name: "INTERBU", tag: "Startup · Platform", color: "#00EEFF" },
  { name: "DRIP GENIUS", tag: "AI · Fashion Tech", color: "#FF00FF" },
  { name: "Code Buddy", tag: "Developer Tool · AI", color: "#55FF00" },
  { name: "Universal Resume Parser", tag: "NLP · Automation", color: "#FFD700" },
  { name: "Click2Bill", tag: "FinTech · SaaS", color: "#FF4500" },
  { name: "FLUX", tag: "Productivity · SaaS", color: "#FFCC00" },
  { name: "MediVault", tag: "Health Records · Web App", color: "#9900FF" }
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
    "स्वागत",
    "ДОБРО ПОЖАЛОВАТЬ",
    "ようこそ",
    "স্বাগতম"
  ];

  const projectTitleTexts = [
    "HAVE A LOOK AT SOME PROJECTS",
    "ਕੁਝ ਪ੍ਰੋਜੈਕਟਾਂ 'ਤੇ ਨਜ਼ਰ ਮਾਰੋ",
    "VOICI QUELQUES PROJETS",
    "看看一些项目",
    "ECHA UN VISTAZO A ALGUNOS PROYECTOS",
    "कुछ प्रोजेक्ट्स पर नज़र डालें",
    "ПОСМОТРИТЕ НА НЕКОТОРЫЕ ПРОЕКТЫ",
    "いくつかのプロジェクトを見てください",
    "কিছু প্রকল্প দেখে নিন"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setLangIndex((prev) => (prev + 1) % welcomeTexts.length);
        setFade(true);
      }, 600); // Wait for fade out
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleProjectClick = (name: string) => {
    setActiveProject(name);
    setModalOpen(true);
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
              
              <button className="theme-btn style-btn" data-theme="comic" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">Comic</span>
              </button>
              
              <button className="theme-btn style-btn" data-theme="pixel" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">Pixel</span>
              </button>

              <button className="theme-btn style-btn" data-theme="minimal" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">Minimalistic</span>
              </button>

              <button className="theme-btn style-btn" data-theme="desktop" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">Desktop</span>
              </button>

              <button className="theme-btn style-btn" data-theme="hyper" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">Hyper Scroll</span>
              </button>

              <button className="theme-btn style-btn" data-theme="traditional" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">Traditional</span>
              </button>

              <button className="theme-btn style-btn" data-theme="book" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">Book</span>
              </button>

              <button className="theme-btn style-btn" data-theme="stalker" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">Stalker</span>
              </button>

              <button className="theme-btn style-btn" data-theme="3d" style={{ backgroundColor: 'transparent', color: 'inherit' }}>
                <span className="btn-label">3D</span>
              </button>

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
                  whiteSpace: 'nowrap', // Prevent wrapping from changing height
                  transform: (langIndex === 1 || langIndex === 5 || langIndex === 8) ? 'translateY(-2px)' : 'translateY(0)',
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
                  position: 'relative',
                  marginBottom: (
                    p.name.toLowerCase().replace(/\s/g, '') === "healthcompanion" || 
                    p.name.toLowerCase().replace(/\s/g, '') === "codebuddy" || 
                    p.name.toLowerCase().replace(/\s/g, '') === "medivault"
                  ) ? '0px' : undefined 
                }}
              >
                {/* Color Splash Effect */}
                {(() => {
                  const isSquare = p.name === "Predicting Customer Churn" || p.name === "Events & Ticketing App" || p.name === "Universal Resume Parser";
                  const width = isSquare ? 90 : 130;
                  const height = isSquare ? 90 : 50;
                  const borderRadius = isSquare 
                    ? '30% 70% 70% 30% / 30% 30% 70% 70%' 
                    : '50% 50% 50% 50% / 30% 30% 70% 70%';
                  
                  return (
                    <div 
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%) scale(${hoveredProject === idx ? 1.4 : 0.6})`,
                        width: `${width}px`,
                        height: `${height}px`,
                        backgroundColor: p.color,
                        borderRadius: borderRadius,
                        filter: 'blur(35px)',
                        opacity: hoveredProject === idx ? 0.7 : 0,
                        transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                        pointerEvents: 'none',
                        zIndex: 0
                      }}
                    />
                  );
                })()}
                
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
    </>
  );
}
