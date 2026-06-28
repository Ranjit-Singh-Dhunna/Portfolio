"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import "./book.css";

// Projects list matching other views
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
  }
];

export default function BookThemePage() {
  const router = useRouter();
  const deskRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Layout customizing states
  const [activeControl, setActiveControl] = useState<'cover' | 'background' | 'surprise' | null>(null);
  const [coverColor, setCoverColor] = useState<string>('#a3e0cb'); // default mint cover
  const [backgroundColor, setBackgroundColor] = useState<string>('#f6afcb'); // default pink desk
  
  // Interactive features states
  const [lampOn, setLampOn] = useState<boolean>(false);
  const [bookOpen, setBookOpen] = useState<boolean>(false);
  const [devActiveTab, setDevActiveTab] = useState<'React' | 'SVG' | 'Motion'>('React');
  const [surprises, setSurprises] = useState<Array<{ id: number; x: number; y: number; text: string }>>([]);
  const [surpriseCounter, setSurpriseCounter] = useState(0);

  // iPod States
  const [ipodMenu, setIpodMenu] = useState<number>(0); // 0: Play Lo-Fi, 1: About Ranjit, 2: Core Stack, 3: Projects, 4: Contact
  const [ipodScreen, setIpodScreen] = useState<'menu' | 'now-playing' | 'about' | 'stack' | 'projects' | 'contact'>('menu');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [musicProgress, setMusicProgress] = useState<number>(0);

  // Color options for customizing
  const colorPalette = [
    // Top row
    { name: 'Light Pink', hex: '#fadbe5' },
    { name: 'Pink', hex: '#f5c5d6' },
    { name: 'Magenta', hex: '#f9a2ba' },
    { name: 'Coral', hex: '#f99878' },
    { name: 'Peach', hex: '#fbb984' },
    { name: 'Yellow', hex: '#ffde71' },
    { name: 'Pale Yellow', hex: '#fcef97' },
    { name: 'Mint', hex: '#abdfc5' },
    // Bottom row
    { name: 'Green', hex: '#9bc59a' },
    { name: 'Blue', hex: '#99cbf0' },
    { name: 'Purple', hex: '#b3b0e3' },
    { name: 'Lavender', hex: '#dbcae6' },
    { name: 'Soft Pink', hex: '#f9badc' }
  ];

  // Presets mapping
  const presets = [
    { cover: '#a3e0cb', bg: '#f6afcb' }, // Mint & Pink
    { cover: '#f6afcb', bg: '#ece4db' }, // Pink & Cream
    { cover: '#a0cff0', bg: '#c8b0f5' }  // Blue & Purple
  ];

  // iPod lists
  const ipodMenuItems = [
    "♫ Play Lo-Fi Music",
    "☕ About Ranjit",
    "⚡ Core Stack",
    "💼 Projects Index",
    "✉ Get In Touch"
  ];

  // Dev activity grid configurations
  const getDevGridPattern = () => {
    // 4 rows x 8 cols
    const baseGrid = Array(32).fill(false);
    if (devActiveTab === 'React') {
      // Draw an 'R' shape
      const activeIdxs = [0, 1, 2, 3, 4, 8, 11, 16, 17, 18, 19, 20, 24, 27, 28, 31];
      activeIdxs.forEach(i => baseGrid[i] = true);
    } else if (devActiveTab === 'SVG') {
      // Draw a smiley face
      const activeIdxs = [1, 2, 5, 6, 9, 10, 13, 14, 16, 23, 25, 26, 27, 28, 29, 30];
      activeIdxs.forEach(i => baseGrid[i] = true);
    } else if (devActiveTab === 'Motion') {
      // Draw a heart shape
      const activeIdxs = [1, 2, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 26, 27, 28, 29];
      activeIdxs.forEach(i => baseGrid[i] = true);
    }
    return baseGrid;
  };

  // Music progress timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingMusic) {
      interval = setInterval(() => {
        setMusicProgress(p => (p >= 100 ? 0 : p + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingMusic]);

  // Audio play handler
  const handleMusicToggle = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(err => {
        console.log("Audio play blocked by browser:", err);
      });
      setIsPlayingMusic(true);
    }
  };

  // Surprise trigger
  const triggerSurprise = () => {
    const texts = ["✨ Awesome! ✨", "❤️ Sweet! ❤️", "⭐ Magical! ⭐", "🍀 Lucky! 🍀", "☁️ Fluffy! ☁️", "🍩 Yummy! 🍩"];
    const text = texts[Math.floor(Math.random() * texts.length)];
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
    const x = 100 + Math.random() * (screenWidth - 300);
    const y = 100 + Math.random() * (screenHeight - 350);
    setSurprises(prev => [...prev, { id: surpriseCounter, x, y, text }]);
    setSurpriseCounter(c => c + 1);
  };

  return (
    <div 
      ref={deskRef}
      className="book-page-container" 
      style={{ backgroundColor }}
    >
      {/* Hidden Audio Player for iPod Lo-Fi Theme */}
      <audio 
        ref={audioRef} 
        src="/Blue%20Dot%20Sessions%20-%20Winter%20Theme.mp3" 
        loop 
        playsInline
      />

      {/* Repeating dot grid on the desk surface */}
      <div className="desk-grid" />

      {/* Soft overlay shadows */}
      <div className={`darkness-overlay ${lampOn ? 'lamp-on' : ''}`} />
      <div className={`spotlight-overlay ${lampOn ? 'lamp-on' : ''}`} />

      {/* Floating clouds in background with faces */}
      <div className="cloud-bg">
        <div className="cloud-element" style={{ width: '180px', height: '60px', top: '15%', left: '5%', animationDuration: '40s' }}>
          <span className="cloud-face">( •◡•)</span>
        </div>
        <div className="cloud-element" style={{ width: '220px', height: '80px', top: '40%', right: '10%', animationDuration: '65s' }}>
          <span className="cloud-face">( •◡•)</span>
        </div>
        <div className="cloud-element" style={{ width: '200px', height: '70px', bottom: '10%', left: '25%', animationDuration: '50s' }}>
          <span className="cloud-face">( •◡•)</span>
        </div>
      </div>

      {/* Change Artstyle floating pill */}
      <a 
        href="/"
        onClick={(e) => {
          e.preventDefault();
          router.push('/');
        }}
        className="back-artstyle-pill"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Change Artstyle</span>
      </a>

      {/* ── TOP CONTROL PILLS ── */}
      <div className="control-pills-bar">
        {/* Cover Color Pill */}
        <button 
          onClick={() => setActiveControl(activeControl === 'cover' ? null : 'cover')}
          className={`control-pill-btn ${activeControl === 'cover' ? 'active-cover' : ''}`}
        >
          <span className="pill-dot" style={{ backgroundColor: coverColor }} />
          <span>cover colour</span>
        </button>

        {/* Background Pill */}
        <button 
          onClick={() => setActiveControl(activeControl === 'background' ? null : 'background')}
          className={`control-pill-btn ${activeControl === 'background' ? 'active-bg' : ''}`}
        >
          <span className="pill-dot" style={{ backgroundColor }} />
          <span>background</span>
        </button>

        {/* Color Palette Popover */}
        {(activeControl === 'cover' || activeControl === 'background') && (
          <div className={`color-picker-popover pointer-${activeControl}`}>
            <div className="colors-grid">
              {colorPalette.map((col, idx) => {
                const isSelected = activeControl === 'cover' 
                  ? coverColor === col.hex 
                  : backgroundColor === col.hex;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (activeControl === 'cover') {
                        setCoverColor(col.hex);
                      } else if (activeControl === 'background') {
                        setBackgroundColor(col.hex);
                      }
                    }}
                    className={`color-circle-btn ${isSelected ? 'selected' : ''}`}
                    style={{ backgroundColor: col.hex, color: col.hex }}
                    title={`Select ${col.name}`}
                  >
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Surprise Pill */}
        <button 
          onClick={() => {
            setActiveControl('surprise');
            triggerSurprise();
          }}
          className={`control-pill-btn ${activeControl === 'surprise' ? 'active-surprise' : ''}`}
        >
          <span style={{ color: '#db2777', animation: 'pulse 1s infinite' }}>✦</span>
          <span>surprise</span>
        </button>

        {/* Preset pill thumbnails */}
        <div className="presets-container">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCoverColor(preset.cover);
                setBackgroundColor(preset.bg);
              }}
              className="preset-thumbnail"
            >
              <div style={{ width: '50%', height: '100%', backgroundColor: preset.cover }} />
              <div style={{ width: '50%', height: '100%', backgroundColor: preset.bg }} />
            </button>
          ))}
        </div>
      </div>

      {/* ── DRAGGABLE MECHANICAL KEYBOARD (TOP-LEFT) ── */}
      <motion.div 
        drag 
        dragMomentum={false}
        dragConstraints={deskRef}
        initial={{ x: 50, y: 150, rotate: -5, scale: 1.4 }}
        animate={{ scale: 1.4 }}
        whileDrag={{ scale: 1.45, zIndex: 50 }}
        className="keyboard-container"
      >
        {/* Keyboard Frame Detail */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px', marginBottom: '4px' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#9ca3af' }} />
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#9ca3af' }} />
          </div>
          <span style={{ fontSize: '7px', color: '#9ca3af', fontFamily: 'monospace', letterSpacing: '1px' }}>AGY-60 MK</span>
        </div>

        {/* Keyboard Keys Layout */}
        <div className="keyboard-grid">
          {/* Row 1 */}
          {["Esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Bsp"].map((key, i) => (
            <div 
              key={i} 
              className="keyboard-key"
              style={{ 
                gridColumn: key === "Bsp" ? "span 2" : "span 1",
                backgroundColor: key === "Esc" ? "#f6afcb" : "white",
                color: key === "Esc" ? "white" : "#374151"
              }}
            >
              {key}
            </div>
          ))}
          {/* Row 2 */}
          {["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"].map((key, i) => (
            <div 
              key={i} 
              className="keyboard-key"
              style={{ gridColumn: key === "Tab" ? "span 2" : "span 1" }}
            >
              {key}
            </div>
          ))}
          {/* Row 3 */}
          {["Caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"].map((key, i) => (
            <div 
              key={i} 
              className="keyboard-key"
              style={{ 
                gridColumn: key === "Enter" ? "span 3" : (key === "Caps" ? "span 2" : "span 1"),
                backgroundColor: key === "Enter" ? "#a3e0cb" : "white",
                fontWeight: key === "Enter" ? 'bold' : 'normal'
              }}
            >
              {key}
            </div>
          ))}
          {/* Row 4 */}
          {["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "Shift", "▲", "/"].map((key, i) => (
            <div 
              key={i} 
              className="keyboard-key"
              style={{ gridColumn: key === "Shift" ? "span 3" : "span 1" }}
            >
              {key}
            </div>
          ))}
          {/* Row 5 */}
          {["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl", "◄", "▼", "►"].map((key, i) => (
            <div 
              key={i} 
              className="keyboard-key"
              style={{ gridColumn: key === "Space" ? "span 7" : "span 1" }}
            >
              {key === "Space" ? "" : key}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        <div className="keyboard-tooltip">
          <span>hold to move</span>
        </div>
      </motion.div>

      {/* ── DRAGGABLE POLAROID CAMERA ── */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={deskRef}
        className="camera-container"
        initial={{ rotate: -7, scale: 0.85, x: 50, y: 600 }}
        whileDrag={{ scale: 0.9, zIndex: 50 }}
        style={{ position: 'absolute', zIndex: 15 }}
      >
        <div className="camera-shadow" />
        <div className="camera-body-top">
          <div className="camera-flash">
            <div className="flash-texture" />
          </div>
          <div className="camera-viewfinder">
            <div className="viewfinder-lens" />
          </div>
          <div className="camera-lens-wrapper">
            <div className="camera-lens-outer">
              <div className="camera-lens-mid">
                <div className="camera-lens-inner">
                  <div className="camera-lens-core" />
                  <div className="camera-lens-reflection" />
                </div>
              </div>
            </div>
          </div>
          <div className="camera-sensor-dot" />
          <div className="camera-red-button" />
          <div className="camera-yellow-switch">
             <div className="yellow-switch-knob" />
          </div>
        </div>
        <div className="camera-body-bottom">
          <div className="camera-film-slot">
             <div className="film-slot-inner" />
          </div>
          <div className="camera-stripes">
            <div className="stripe" style={{ backgroundColor: '#00A3E0' }} />
            <div className="stripe" style={{ backgroundColor: '#78B227' }} />
            <div className="stripe" style={{ backgroundColor: '#FDB615' }} />
            <div className="stripe" style={{ backgroundColor: '#F05A28' }} />
            <div className="stripe" style={{ backgroundColor: '#E31837' }} />
          </div>
          <div className="camera-logo">Polaroid</div>
        </div>

        <div className="desk-item-tooltip" style={{ left: '50%', top: '-55px', transform: 'translateX(-50%) rotate(-2deg)', fontSize: '36px' }}>
          <span>Click for picture</span>
        </div>
      </motion.div>

      {/* ── DRAGGABLE DEV ACTIVITY TABLET (BOTTOM-LEFT) ── */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={deskRef}
        initial={{ rotate: -4 }}
        whileDrag={{ scale: 1.02, zIndex: 50 }}
        onTap={() => window.open('https://github.com/Ranjit-Singh-Dhunna', '_blank')}
        className="dev-tablet-container"
        style={{ top: '76%', left: '70%', position: 'absolute', zIndex: 10 }}
      >
        {/* Tablet Header */}
        <div className="tablet-header">
          <div className="tablet-status">
            <span className="tablet-status-dot" />
            <span className="tablet-title">dev activity</span>
          </div>
          <span className="tablet-counter">52 commits</span>
        </div>

        {/* Contribution Grid */}
        <div className="dev-grid-screen">
          {getDevGridPattern().map((isActive, idx) => (
            <div 
              key={idx} 
              className={`dev-grid-dot ${isActive ? 'active' : ''}`}
            />
          ))}
        </div>

        <div className="desk-item-tooltip" style={{ left: '50%', bottom: '-50px', transform: 'translateX(-50%) rotate(-3deg)', fontSize: '31px' }}>
          <span>View Github</span>
        </div>
      </motion.div>


      {/* ── DRAGGABLE GLASSES (BOTTOM-LEFT) ── */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={deskRef}
        initial={{ rotate: 15 }}
        whileDrag={{ scale: 1.03, zIndex: 50 }}
        className="glasses-container"
        style={{ position: 'absolute', top: '9%', left: '67%' }}
      >
        <div className="glasses-shadow" />
        <svg viewBox="0 0 120 60" width="100" height="50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="left-lens">
              <path d="M 15 20 Q 25 12 50 15 Q 55 35 45 45 Q 25 48 15 35 Q 10 25 15 20 Z" />
            </clipPath>
            <clipPath id="right-lens">
              <path d="M 105 20 Q 95 12 70 15 Q 65 35 75 45 Q 95 48 105 35 Q 110 25 105 20 Z" />
            </clipPath>
          </defs>

          {/* Arms (back) */}
          <path d="M 20 15 Q 35 25 60 30 L 70 32" stroke="#d6cca7" strokeWidth="6" strokeLinecap="round" />
          <path d="M 100 15 Q 85 25 60 30 L 50 32" stroke="#bfaa80" strokeWidth="6" strokeLinecap="round" />

          {/* Bridge */}
          <path d="M 45 18 Q 60 14 75 18" stroke="#595e60" strokeWidth="6" strokeLinecap="round" />

          {/* Left Lens Fill & Reflections */}
          <g clipPath="url(#left-lens)">
            <rect x="-10" y="-10" width="100" height="100" fill="rgba(235, 238, 209, 0.9)" />
            <rect x="35" y="-10" width="15" height="80" transform="rotate(35 32 30)" fill="rgba(255,255,255,0.5)" />
            <rect x="15" y="-10" width="5" height="80" transform="rotate(35 32 30)" fill="rgba(255,255,255,0.5)" />
          </g>
          {/* Left Lens Stroke */}
          <path d="M 15 20 Q 25 12 50 15 Q 55 35 45 45 Q 25 48 15 35 Q 10 25 15 20 Z" stroke="#595e60" strokeWidth="5" strokeLinejoin="round" />

          {/* Right Lens Fill & Reflections */}
          <g clipPath="url(#right-lens)">
            <rect x="-10" y="-10" width="100" height="100" fill="rgba(235, 238, 209, 0.9)" />
            <rect x="90" y="-10" width="15" height="80" transform="rotate(35 88 30)" fill="rgba(255,255,255,0.5)" />
            <rect x="70" y="-10" width="5" height="80" transform="rotate(35 88 30)" fill="rgba(255,255,255,0.5)" />
          </g>
          {/* Right Lens Stroke */}
          <path d="M 105 20 Q 95 12 70 15 Q 65 35 75 45 Q 95 48 105 35 Q 110 25 105 20 Z" stroke="#595e60" strokeWidth="5" strokeLinejoin="round" />

          {/* Side Hinges */}
          <path d="M 12 21 L 5 18 L 8 28 Z" fill="#595e60" stroke="#595e60" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 108 21 L 115 18 L 112 28 Z" fill="#595e60" stroke="#595e60" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </motion.div>


      {/* ── CENTER INTERACTIVE BOOK ── */}
      <div className="book-center-wrapper">
        <AnimatePresence mode="wait">
          {!bookOpen ? (
            /* CLOSED BOOK COVER VIEW */
            <motion.div
              key="closed"
              onClick={() => setBookOpen(true)}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="closed-book-cover"
              style={{ backgroundColor: coverColor }}
            >
              <div className="book-spine-line" />
              <div className="book-spine-shine" />
              <div className="book-elastic-strap" />
              <div className="book-corner-metal" />

              <div />

              {/* Middle Label Sticker */}
              <div className="closed-book-label">
                {/* MS logo */}
                <div className="label-logo-box">
                  <span>MS</span>
                  <span className="label-logo-sparkle">✦</span>
                </div>
                {/* portfolio title */}
                <h1 className="label-title">
                  portfolio
                </h1>
                {/* design code text */}
                <div className="label-sub">
                  DESIGN + CODE
                </div>
              </div>

              {/* Tap to open */}
              <div className="tap-open-invitation">
                <span>tap to open</span>
                <span style={{ color: '#f43f5e' }}>♡</span>
              </div>
            </motion.div>
          ) : (
            /* OPEN DUAL-PAGE BOOK VIEW */
            <motion.div
              key="open"
              initial={{ scale: 0.95, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="open-book-spread"
              style={{ border: '6px solid ' + coverColor }}
            >
              {/* Metal spiral rings in the center spine */}
              <div className="open-book-spine-rings">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="spiral-ring" />
                ))}
              </div>

              {/* ── LEFT PAGE: BIO & SKILLS ── */}
              <div className="open-book-left">
                <div>
                  <h2 className="journal-header">
                    <span>Profile Journal</span>
                    <span className="journal-page-num">Page 1</span>
                  </h2>

                  {/* Profile Picture and details */}
                  <div className="journal-profile">
                    <div className="profile-avatar-circle">
                      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="#3d2b1f" strokeWidth="2.5">
                        <circle cx="20" cy="14" r="6" fill="#3d2b1f" opacity="0.15" />
                        <circle cx="20" cy="14" r="6" stroke="#3d2b1f" />
                        <path d="M10 32c0-6 5-10 10-10s10 4 10 10" stroke="#3d2b1f" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="profile-name">Ranjit Singh Dhunna</h3>
                      <p className="profile-tag">Software Designer</p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="journal-bio">
                    Hey! I'm a full-stack engineer and machine learning creator based in Canada. 
                    I focus on building delightful, high-fidelity developer tools, models, and immersive frontends that blend functionality with rich styling.
                  </p>
                </div>

                {/* Stack */}
                <div className="journal-stack-section">
                  <h4 className="journal-stack-title">Core Stack:</h4>
                  <ul className="journal-stack-list">
                    <li>React & Next.js</li>
                    <li>Framer Motion</li>
                    <li>Python (ML)</li>
                    <li>TypeScript & Node</li>
                  </ul>
                </div>
              </div>

              {/* ── RIGHT PAGE: PROJECTS INDEX ── */}
              <div className="open-book-right">
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <h2 className="journal-header">
                      <span>Featured Works</span>
                      <span className="journal-page-num">Page 2</span>
                    </h2>

                    {/* Scrollable projects */}
                    <div className="book-inner-scroll" style={{ maxHeight: '210px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {projectsData.map((project, idx) => (
                        <a 
                          key={idx}
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-item-link"
                        >
                          <div className="project-item-header">
                            <span className="project-item-name">
                              {project.name}
                            </span>
                            <span className="project-item-btn" style={{ backgroundColor: project.color }}>
                              Go ↗
                            </span>
                          </div>
                          <span className="project-item-tag">
                            {project.tag}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Footer & close ribbon */}
                  <div className="open-book-footer">
                    <div className="footer-socials">
                      <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                      <a href="https://www.linkedin.com/in/ranjit-singh-dhunna-772790307" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setBookOpen(false);
                      }}
                      className="close-bookmark-btn"
                    >
                      <span>Close Bookmark</span>
                      <span className="close-bookmark-ribbon" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


      {/* ── DRAGGABLE IPOD CLASSIC (MIDDLE-RIGHT) ── */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={deskRef}
        initial={{ rotate: -8, scale: 1.15 }}
        whileDrag={{ scale: 1.2, zIndex: 50 }}
        className="ipod-container"
        style={{ top: '400px', right: '50px' }}
      >
        <div className="ipod-shadow" />

        {/* Screen */}
        <div className="ipod-screen">
          <div className="ipod-screen-header">
            <span>iPod</span>
            <div className="ipod-battery">
              <div className="ipod-battery-fill" style={{ width: isPlayingMusic ? '80%' : '30%' }} />
            </div>
          </div>

          <div className="ipod-content-area">
            {ipodScreen === 'menu' && (
              <div className="ipod-menu-list">
                {ipodMenuItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`ipod-menu-item ${ipodMenu === idx ? 'selected' : ''}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

            {ipodScreen === 'now-playing' && (
              <div className="ipod-nowplaying">
                <div className="ipod-np-title">Lo-Fi: Winter Theme</div>
                <div className="ipod-np-artist">Blue Dot Sessions</div>
                <div className="ipod-np-progress-bar">
                  <div className="ipod-np-progress-fill" style={{ width: `${musicProgress}%` }} />
                </div>
                <div className="ipod-np-time">
                  <span>0:{musicProgress.toString().padStart(2, '0')}</span>
                  <span>1:40</span>
                </div>
              </div>
            )}

            {ipodScreen === 'about' && (
              <div className="ipod-text-info">
                <strong className="ipod-text-title">About Ranjit:</strong>
                <span>• Full-stack & ML creator.</span>
                <span>• Concordia Uni represent.</span>
                <span>• Enjoys retro interfaces.</span>
              </div>
            )}

            {ipodScreen === 'stack' && (
              <div className="ipod-text-info">
                <strong className="ipod-text-title">Core Stack:</strong>
                <span>• Next.js / React / TS</span>
                <span>• Tailwind / Framer Motion</span>
                <span>• Python / PyTorch / Docker</span>
              </div>
            )}

            {ipodScreen === 'projects' && (
              <div className="ipod-text-info">
                <strong className="ipod-text-title">Projects Index:</strong>
                <span>• skin-lesion-cnn</span>
                <span>• customer-churn-ml</span>
                <span>• health-companion-app</span>
              </div>
            )}

            {ipodScreen === 'contact' && (
              <div className="ipod-text-info">
                <strong className="ipod-text-title">Get in Touch:</strong>
                <span>• Github: Ranjit-Singh-Dhunna</span>
                <span>• LinkedIn: in/ranjit-singh-dhunna</span>
                <span>• Email: ranjit@dhunna.com</span>
              </div>
            )}
          </div>
        </div>

        {/* Click Wheel */}
        <div className="ipod-wheel-body">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIpodScreen('menu');
            }}
            className="ipod-wheel-btn ipod-wheel-menu"
          >
            MENU
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                setIpodMenu(m => (m + 1) % ipodMenuItems.length);
              }
            }}
            className="ipod-wheel-btn ipod-wheel-next"
          >
            ▶▶|
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                setIpodMenu(m => (m - 1 + ipodMenuItems.length) % ipodMenuItems.length);
              }
            }}
            className="ipod-wheel-btn ipod-wheel-prev"
          >
            |◀◀
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleMusicToggle();
              if (ipodScreen === 'menu' && ipodMenu === 0) {
                setIpodScreen('now-playing');
              }
            }}
            className="ipod-wheel-btn ipod-wheel-play"
          >
            ▶||
          </button>

          {/* Center Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (ipodScreen === 'menu') {
                if (ipodMenu === 0) {
                  setIpodScreen('now-playing');
                  if (!isPlayingMusic) handleMusicToggle();
                } else if (ipodMenu === 1) {
                  setIpodScreen('about');
                } else if (ipodMenu === 2) {
                  setIpodScreen('stack');
                } else if (ipodMenu === 3) {
                  setIpodScreen('projects');
                } else if (ipodMenu === 4) {
                  setIpodScreen('contact');
                }
              } else {
                setIpodScreen('menu');
              }
            }}
            className="ipod-wheel-center"
          />
        </div>

        <div className="desk-item-tooltip" style={{ left: '50%', bottom: '-35px', transform: 'translateX(-50%) rotate(-2deg)', fontSize: '27px' }}>
          <span>Play music</span>
        </div>
      </motion.div>


      {/* ── DRAGGABLE DESK LAMP (TOP-RIGHT) ── */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={deskRef}
        initial={{ scale: 1.3 }}
        animate={{ scale: 1.3 }}
        whileDrag={{ scale: 1.4, zIndex: 50 }}
        onTap={(e) => {
          setLampOn(!lampOn);
        }}
        className="lamp-container"
        style={{ top: '60px', right: '40px', cursor: 'pointer' }}
      >
        <div className="lamp-shadow" />

        {/* Lamp Base */}
        <div className="lamp-base">
          <div className="lamp-base-inner" />
          
          {/* Toggle Switch */}
          <div className="lamp-switch">
            <div className="lamp-switch-base" />
            <div className={`lamp-switch-pin ${lampOn ? 'on' : 'off'}`} />
          </div>
          
          {/* Base Joint */}
          <div className="lamp-base-joint" />
        </div>

        {/* Lamp Shade */}
        <div className="lamp-shade">
          <div className="lamp-shade-back" />
          <div className="lamp-shade-main">
            <div className={`lamp-bulb ${lampOn ? 'on' : 'off'}`} />
          </div>
          <div className={`lamp-light-beam ${lampOn ? 'on' : 'off'}`} />
        </div>

        {/* Tooltip */}
        <div className="lamp-tooltip">
          <span>tap to</span>
          <span>light it!</span>
        </div>
      </motion.div>


      {/* ── DRAGGABLE BEAR STICKER (BOTTOM-RIGHT) ── */}      {/* Floating Sparkle / Surprise Popups */}
      <AnimatePresence>
        {surprises.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0, y: item.y }}
            animate={{ scale: 1.1, opacity: 1, y: item.y - 40 }}
            exit={{ scale: 0.8, opacity: 0, y: item.y - 80 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setTimeout(() => {
                setSurprises(prev => prev.filter(p => p.id !== item.id));
              }, 1200);
            }}
            className="surprise-label-pop"
            style={{ left: item.x }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Add Item Sticker button bottom-right */}
      <button
        onClick={triggerSurprise}
        className="floating-add-btn"
      >
        +
      </button>

    </div>
  );
}
