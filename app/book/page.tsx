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
  const [bgPattern, setBgPattern] = useState<string>('dots'); // pattern: dots, grid, diamond, water, none
  const [dustMotes, setDustMotes] = useState<any[]>([]);
  const [waterDrops, setWaterDrops] = useState<any[]>([]);
  const [stickers, setStickers] = useState<any[]>([]);
  const [stickerMenuOpen, setStickerMenuOpen] = useState(false);
  const [stickerCategory, setStickerCategory] = useState<'Cute' | 'Stationery' | 'Plants' | 'Desk' | 'Dev'>('Cute');
  const stickerPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [activeStickerMenu, setActiveStickerMenu] = useState<string | null>(null);
  const [stickerMenuMode, setStickerMenuMode] = useState<'actions' | 'edit'>('actions');
  
  // Interactive features states
  const [lampOn, setLampOn] = useState<boolean>(false);
  const [bookOpen, setBookOpen] = useState<boolean>(false);
  const [devActiveTab, setDevActiveTab] = useState<'React' | 'SVG' | 'Motion'>('React');
  const [surprises, setSurprises] = useState<Array<{ id: number; x: number; y: number; text: string }>>([]);
  const [surpriseCounter, setSurpriseCounter] = useState(0);
  const [currentSpread, setCurrentSpread] = useState(1);
  const [hoverFlipRight, setHoverFlipRight] = useState(false);
  const [stamps, setStamps] = useState<{x: number, y: number, rotation: number}[]>([]);

  const addStamp = (e: React.MouseEvent<HTMLDivElement>) => {
    playSound('freesound_community-stamp-102627.mp3');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotation = Math.random() * 360;
    setStamps([...stamps, { x, y, rotation }]);
  };
  const [hoverFlipLeft, setHoverFlipLeft] = useState(false);

  const playSound = (fileName: string) => {
    try {
      const audio = new Audio(`/${fileName}`);
      audio.play();
    } catch (e) {
      console.error('Failed to play sound:', e);
    }
  };

  // iPod States
  const [ipodMenu, setIpodMenu] = useState<number>(0); // 0: Play Lo-Fi, 1: About Ranjit, 2: Core Stack, 3: Projects, 4: Contact
  const [ipodScreen, setIpodScreen] = useState<'menu' | 'now-playing' | 'about' | 'stack' | 'projects' | 'contact'>('menu');
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [musicProgress, setMusicProgress] = useState<number>(0);

  // Camera States
  const [cameraState, setCameraState] = useState<'idle' | 'floating' | 'flashing' | 'printing' | 'finished'>('idle');
  const [pictureData, setPictureData] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

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

  const ipodMenuItems = [
    "♫ Play Lo-Fi Music"
  ];

  const patterns = [
    { id: 'dots', label: 'Dots' },
    { id: 'grid', label: 'Grid' },
    { id: 'diamond', label: 'Diamond' },
    { id: 'water', label: 'Rain' },
    { id: 'none', label: 'None' }
  ];

  const stickerPacks = {
    Cute: ['cute_bear_1782691975916.png', 'cute_cat_1782691963839.png', 'cute_kirby_1782691950902.png', 'cute_pig_1782691969568.png'],
    Plants: ['flower.svg', 'cactus.svg', 'herb.svg', 'leaf.svg', 'tree.svg'],
    Stationery: ['pencil.svg', 'palette.svg'],
    Desk: ['coffee.svg', 'book.svg', 'computer.svg'],
    Dev: ['react.svg', 'ts.svg', 'js.svg', 'html.svg', 'css.svg', 'python.svg', 'github.svg', 'figma.svg', 'cpp.svg', 'tailwind.svg', 'nextjs.svg']
  };

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

  // Auto play music when opened (optional effect)
  useEffect(() => {
    // any side effects
  }, []);

  // Generate dust motes on client-side only to prevent SSR hydration mismatch
  useEffect(() => {
    const motes = Array.from({ length: 25 }).map(() => {
      const size = 2 + Math.random() * 4;
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${15 + Math.random() * 25}s`,
        animationDelay: `-${Math.random() * 20}s`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.1 + Math.random() * 0.4
      };
    });
    setDustMotes(motes);

    const drops: any[] = [];
    while (drops.length < 30) {
      const leftRaw = Math.random() * 100;
      const topRaw = Math.random() * 100;
      
      // Book is roughly at left: 15-45%, top: 20-80%
      const isOnBook = leftRaw > 15 && leftRaw < 45 && topRaw > 20 && topRaw < 80;
      
      // 85% chance to reject a drop if it lands on the book to keep drops there minimal
      if (isOnBook && Math.random() > 0.15) {
        continue;
      }

      // Slightly smaller drops
      const size = 8 + Math.random() * 18;
      drops.push({
        left: `${leftRaw}%`,
        top: `${topRaw}%`,
        width: `${size}px`,
        height: `${size + Math.random() * 4}px`, 
        animationDuration: `${4 + Math.random() * 6}s`,
        animationDelay: `-${Math.random() * 8}s`,
      });
    }
    setWaterDrops(drops);
  }, []);

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
  // Camera click handler
  const handleCameraClick = async () => {
    if (cameraState !== 'idle') return;

    setCameraState('floating');
    
    // Wait for the camera to float to the center
    setTimeout(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        cameraStreamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        
        // Brief delay for webcam to adjust light
        setTimeout(() => {
          playSound('freesound_community-camera-shutter-and-flash-combined-6827.mp3');
          setCameraState('flashing');
          
          // Flash effect timing - capture the image while flash is active
          setTimeout(() => {
            if (canvasRef.current && videoRef.current) {
              const context = canvasRef.current.getContext('2d');
              if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                setPictureData(canvasRef.current.toDataURL('image/png'));
              }
            }
            
            // Wait for flash to subside before finishing
            setTimeout(() => {
              if (cameraStreamRef.current) {
                cameraStreamRef.current.getTracks().forEach(track => track.stop());
              }
              setCameraState('finished');
            }, 500);
          }, 150);
        }, 500);
      } catch (err) {
        console.log("Webcam access denied or unavailable", err);
        // Fallback dummy image logic
        const dummyCanvas = document.createElement('canvas');
        dummyCanvas.width = 400;
        dummyCanvas.height = 300;
        const ctx = dummyCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ff9ed2';
          ctx.fillRect(0, 0, 400, 300);
          ctx.fillStyle = '#fff';
          ctx.font = '24px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Webcam Unavailable', 200, 150);
          setPictureData(dummyCanvas.toDataURL('image/png'));
        }
        
        playSound('freesound_community-camera-shutter-and-flash-combined-6827.mp3');
          setCameraState('flashing');
        setTimeout(() => {
          setCameraState('finished');
        }, 650);
      }
    }, 1000);
  };

  return (
    <div 
      ref={deskRef}
      className="book-page-container" 
      style={{ backgroundColor }}
      onClick={() => {
        if (activeControl === 'cover' || activeControl === 'background') {
          setActiveControl(null);
        }
        if (activeStickerMenu) {
          setActiveStickerMenu(null);
        }
      }}
    >
      {/* Hidden Audio Player for iPod Lo-Fi Theme */}
      <audio 
        ref={audioRef} 
        src="/Blue%20Dot%20Sessions%20-%20Winter%20Theme.mp3" 
        loop 
        playsInline
      />

      {/* Background Pattern Grid */}
      {bgPattern !== 'none' && bgPattern !== 'water' && (
        <div 
          className="desk-grid" 
          style={{
            backgroundImage: bgPattern === 'dots' 
              ? 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)' 
              : bgPattern === 'grid'
              ? 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)'
              : 'linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.3) 49%, rgba(255, 255, 255, 0.3) 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, rgba(255, 255, 255, 0.3) 49%, rgba(255, 255, 255, 0.3) 51%, transparent 51%)',
            backgroundSize: bgPattern === 'dots' ? '24px 24px' : bgPattern === 'grid' ? '30px 30px' : '40px 40px'
          }}
        />
      )}

      {/* Water Droplets Pattern */}
      {bgPattern === 'water' && (
        <div className="water-drops-container">
          {waterDrops.map((dropStyle, i) => (
            <div 
              key={i} 
              className="water-drop" 
              style={dropStyle}
            />
          ))}
        </div>
      )}

      {/* Soft overlay shadows */}
      <div className={`darkness-overlay ${lampOn ? 'lamp-on' : ''}`} />
      <div className={`spotlight-overlay ${lampOn ? 'lamp-on' : ''}`} />

      {/* Placed Stickers */}
      {stickers.map((stk) => (
        <motion.div
          key={stk.id}
          drag
          dragMomentum={false}
          initial={{ x: stk.x, y: stk.y }}
          className="placed-sticker-wrapper"
          style={{ zIndex: activeStickerMenu === stk.id ? 200 : 50, position: 'absolute' }}
          onPointerDown={() => {
            stickerPressTimer.current = setTimeout(() => {
              setActiveStickerMenu(stk.id);
              setStickerMenuMode('actions');
            }, 500);
          }}
          onPointerUp={() => {
            if (stickerPressTimer.current) clearTimeout(stickerPressTimer.current);
          }}
          onPointerLeave={() => {
            if (stickerPressTimer.current) clearTimeout(stickerPressTimer.current);
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="placed-sticker"
            initial={{ rotate: stk.rotation, scale: 0 }}
            animate={{ rotate: stk.rotation, scale: stk.scale || 1 }}
            whileDrag={{ scale: (stk.scale || 1) * 1.1 }}
          >
            <img src={stk.url} alt="sticker" draggable="false" />
          </motion.div>

          <AnimatePresence>
            {activeStickerMenu === stk.id && (
              <motion.div 
                className="sticker-context-popover"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                {stickerMenuMode === 'actions' ? (
                  <div className="sticker-actions-menu">
                    <button onClick={() => setStickerMenuMode('edit')}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                      <span>Resize</span>
                    </button>
                    <button className="delete-btn" onClick={() => {
                       setStickers(prev => prev.filter(s => s.id !== stk.id));
                       setActiveStickerMenu(null);
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      <span>Delete</span>
                    </button>
                  </div>
                ) : (
                  <div className="sticker-edit-menu">
                    <div className="slider-row">
                      <span>Size</span>
                      <input 
                        type="range" 
                        min="50" max="250" 
                        value={(stk.scale || 1) * 100}
                        onChange={(e) => {
                           setStickers(prev => prev.map(s => s.id === stk.id ? {...s, scale: parseInt(e.target.value) / 100} : s));
                        }}
                      />
                      <span className="slider-val">{Math.round((stk.scale || 1) * 100)}%</span>
                    </div>
                    <div className="slider-row">
                      <span>Tilt</span>
                      <input 
                        type="range" 
                        min="-180" max="180" 
                        value={stk.rotation}
                        onChange={(e) => {
                           setStickers(prev => prev.map(s => s.id === stk.id ? {...s, rotation: parseInt(e.target.value)} : s));
                        }}
                      />
                      <span className="slider-val">{Math.round(stk.rotation)}°</span>
                    </div>
                    <div className="edit-done-row">
                      <button onClick={() => setActiveStickerMenu(null)}>Done</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Paper airplane */}
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

        {/* Distant Hot Air Balloons */}
        <div className="hot-air-balloon balloon-1" style={{ top: '20%', animationDelay: '0s', animationDuration: '70s' }}>
          <svg viewBox="0 0 24 24" width="36" height="36" fill="rgba(255, 140, 180, 0.6)">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.5 1.5 5.5 3 8h8c1.5-2.5 3-5.5 3-8 0-3.87-3.13-7-7-7zm-1.5 18h3v2h-3v-2z"/>
          </svg>
        </div>
        <div className="hot-air-balloon balloon-2" style={{ top: '55%', animationDelay: '20s', animationDuration: '90s' }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="rgba(160, 207, 240, 0.5)">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.5 1.5 5.5 3 8h8c1.5-2.5 3-5.5 3-8 0-3.87-3.13-7-7-7zm-1.5 18h3v2h-3v-2z"/>
          </svg>
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
      <div 
        className="control-pills-bar"
        onClick={(e) => e.stopPropagation()}
      >
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
        <AnimatePresence>
          {(activeControl === 'cover' || activeControl === 'background') && (
            <motion.div 
              className={`color-picker-popover pointer-${activeControl}`}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <div className="colors-grid">
                {colorPalette.map((col, idx) => {
                  const isSelected = activeControl === 'cover' 
                    ? coverColor === col.hex 
                    : backgroundColor === col.hex;

                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: idx * 0.03, 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17 
                      }}
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
                    </motion.button>
                  );
                })}
              </div>

              {/* Pattern Options */}
              {activeControl === 'background' && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.05em' }}>PATTERN</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {patterns.map((pat, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setBgPattern(pat.id)}
                        className={`pattern-btn ${bgPattern === pat.id ? 'selected' : ''}`}
                      >
                        {pat.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inspo Pill */}
        <button 
          onClick={() => {
            setActiveControl('surprise'); // keeping the state as surprise for logic
            triggerSurprise();
          }}
          className={`control-pill-btn ${activeControl === 'surprise' ? 'active-surprise' : ''}`}
        >
          <span style={{ color: '#db2777', animation: 'pulse 1s infinite' }}>✦</span>
          <span>inspo</span>
        </button>
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
        drag={cameraState === 'idle' || cameraState === 'finished'}
        dragMomentum={false}
        dragConstraints={deskRef}
        onTap={handleCameraClick}
        className="camera-container"
        initial={{ rotate: -7, scale: 0.85, x: 50, y: 600 }}
        animate={
          (cameraState === 'idle' || cameraState === 'finished') ? { zIndex: 15 } :
          { x: typeof window !== 'undefined' ? window.innerWidth / 2 - 120 : 500, y: typeof window !== 'undefined' ? window.innerHeight / 2 - 150 : 400, rotate: 0, scale: 1, zIndex: 100 }
        }
        transition={{ duration: cameraState === 'finished' ? 2.5 : 0.8, type: "spring", bounce: 0.2 }}
        whileDrag={{ scale: 0.9, zIndex: 50 }}
        style={{ position: 'absolute', zIndex: 15 }}
      >
        <div className="camera-shadow" />
        <div className="camera-body-top">
          <AnimatePresence>
            {cameraState === 'flashing' && (
              <motion.div
                className="camera-flash-glow"
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 40 }}
                exit={{ opacity: 0, scale: 40 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
          <div className="camera-flash">
            <div className="flash-texture" />
            <motion.div 
              className="flash-active-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: cameraState === 'flashing' ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            />
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
        <motion.div
          className="open-book-spread"
          initial={false}
          animate={{ x: bookOpen ? 0 : -160 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
              {/* Metal spiral rings in the center spine */}
              <div className="open-book-spine-rings" style={{ zIndex: 50 }}>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="spiral-ring" />
                ))}
              </div>

              {/* ── LEFT PAGE: COVER & BIO ── */}
              <motion.div 
                className="open-book-left"
                initial={false}
                animate={
                  bookOpen 
                    ? { rotateY: 0, transitionEnd: { zIndex: 30 } }
                    : { rotateY: 180, zIndex: 50 }
                }
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{ transformOrigin: "right center" }}
              >
                {/* ── FRONT FACE (Inner Page - Left Half - PAGE 1) ── */}
                <div className="open-book-left-front">
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header">
                      <span style={{ color: '#b91c1c' }}>Profile Journal</span>
                      <span className="journal-page-num">Page 1</span>
                    </h2>
                    <div className="journal-profile">
                      <div className="profile-avatar-circle">
                        <img src="/gibli.png" alt="Avatar" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                      </div>
                      <div>
                        <h3 className="profile-name">Ranjit Singh Dhunna</h3>
                        <p className="profile-tag">Software Designer</p>
                      </div>
                    </div>
                    <p className="journal-bio">
                      Hey! I'm a full-stack engineer and machine learning creator based in Canada. 
                      I focus on building delightful, high-fidelity developer tools, models, and immersive frontends that blend functionality with rich styling.
                    </p>
                    <div style={{ flex: 1 }} />
                    <div className="open-book-footer">
                      <div className="footer-socials" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <a href="https://www.linkedin.com/in/ranjit-singh-dhunna-772790307" target="_blank" rel="noopener noreferrer" className="footer-social-link" onClick={(e) => e.stopPropagation()}>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        <span style={{ fontSize: '11px', color: '#9ca3af', fontStyle: 'italic' }}>Please hire me, my plants are dying 🌱</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── BACK FACE (Closed Cover) ── */}
                <div 
                  className="open-book-left-back" 
                  style={{ backgroundColor: coverColor }}
                  onClick={() => { playSound('freesound_community-one-page-book-flip-101928.mp3'); setBookOpen(true); }}
                >
                  <div className="book-spine-line" />
                  <div className="book-spine-shine" />
                  <div className="book-elastic-strap" />
                  <div className="book-corner-metal" />
                  <div />
                  <div className="closed-book-label">
                    <h1 className="label-title">Journal</h1>
                    <div className="label-sub">DESIGN + CODE</div>
                  </div>
                  <div className="tap-open-invitation">
                    <span>tap to open</span>
                    <span style={{ color: '#f43f5e' }}>♡</span>
                  </div>
                </div>
              </motion.div>

              {/* ── RIGHT PAGE: Base Right - PAGE 8 ── */}
              <div className="open-book-right">
                <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  
                  {stamps.map((stamp, i) => (
                    <div 
                      key={i} 
                      style={{
                        position: 'absolute',
                        left: stamp.x,
                        top: stamp.y,
                        transform: `translate(-50%, -50%) rotate(${stamp.rotation}deg)`,
                        width: '60px',
                        height: '60px',
                        border: '3px solid #be123c',
                        borderRadius: '50%',
                        color: '#be123c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Caveat, cursive',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        opacity: 0.7,
                        pointerEvents: 'none',
                        zIndex: 10
                      }}
                    >
                      APPROVED
                    </div>
                  ))}

                  <div 
                    onClick={addStamp}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      cursor: 'crosshair',
                      zIndex: 5
                    }}
                  />

                  <h2 className="journal-header" style={{ width: '100%', pointerEvents: 'none', zIndex: 20 }}>
                    <span style={{ color: '#0f766e' }}>End of Journal</span>
                    <span className="journal-page-num">Page 10</span>
                  </h2>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 20 }}>
                    <p style={{ fontFamily: 'Caveat, cursive', fontSize: '32px', color: '#6b7280', transform: 'rotate(-5deg)' }}>Thanks for reading!</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '16px' }}>(Click anywhere to leave a stamp)</p>
                  </div>
                  <div className="open-book-footer" style={{ width: '100%', pointerEvents: 'auto', zIndex: 20 }}>
                    <div className="footer-socials"></div>
                    <button onClick={(e) => { 
                      e.stopPropagation(); 
                      setStamps([]); 
                    }} className="close-bookmark-btn">
                      <span>Clear Stamps</span>
                      <span className="close-bookmark-ribbon" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ── 3D TURNING PAGE LAYER 4 (Pages 8 & 9) ── */}
              <motion.div
                className="turning-page-layer"
                initial={false}
                animate={{ 
                  rotateY: currentSpread > 4
                    ? (bookOpen && currentSpread === 5 && hoverFlipLeft ? -170 : -180)
                    : (bookOpen && currentSpread === 4 && hoverFlipRight ? -10 : 0),
                  ...(currentSpread > 4 ? { transitionEnd: { zIndex: 34 } } : { zIndex: 36 })
                }}
                transition={{ duration: 0.6, ease: "easeInOut", zIndex: { duration: 0 } }}
                style={{
                  position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
                  transformOrigin: 'left center', transformStyle: 'preserve-3d', pointerEvents: 'none'
                }}
              >
                {/* FRONT FACE (Page 8) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '0 12px 12px 0', overflow: 'hidden', boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.05)', padding: '24px', paddingLeft: '32px', pointerEvents: 'auto' }}>
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header" style={{ width: '100%' }}>
                      <span style={{ color: '#c2410c' }}>Competitions & Events</span>
                      <span className="journal-page-num">Page 8</span>
                    </h2>
                    <div className="journal-works">
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>ConUHacks X Hackathon</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>Jan 2026</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>CyberSci Canada CTF</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Nov 2025</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Awarded by Cineplex</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>@hack 2025 CTF</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Mar 2025</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>Ranked 6th</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>ConUHacks IX Hackathon</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>Feb 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* BACK FACE (Page 9) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '12px 0 0 12px', overflow: 'hidden', transform: 'rotateY(180deg)', boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.05)', padding: '24px', pointerEvents: 'auto' }}>
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header"><span style={{ color: '#0f766e' }}>Philosophy & Tech Stack</span><span className="journal-page-num">Page 9</span></h2>
                    
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#4b5563', fontStyle: 'italic', paddingLeft: '8px' }}>
                        "A craftsman is only as good as their tools, but an engineer is defined by how they adapt them."
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                          <h4 style={{ fontSize: '10px', color: '#0f766e', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Frontend</h4>
                          <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.4' }}>React, Next.js, Tailwind, Framer Motion, Three.js</p>
                        </div>
                        
                        <div>
                          <h4 style={{ fontSize: '10px', color: '#0f766e', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Backend</h4>
                          <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.4' }}>Python, Node, Express, FastAPI, Django, PostgreSQL</p>
                        </div>
                        
                        <div>
                          <h4 style={{ fontSize: '10px', color: '#0f766e', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Applied AI</h4>
                          <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.4' }}>PyTorch, LangChain, OpenCV, Ollama, Whisper</p>
                        </div>
                        
                        <div>
                          <h4 style={{ fontSize: '10px', color: '#0f766e', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Cloud & Ops</h4>
                          <p style={{ fontSize: '11px', color: '#4b5563', lineHeight: '1.4' }}>Docker, AWS, Vercel, Supabase, Git, Linux</p>
                        </div>
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dashed #d1d5db' }}>
                        <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#4b5563' }}>
                          I believe in blending rigorous engineering with delightful user experiences. Whether it's training a neural network or polishing a micro-interaction, every detail matters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── 3D TURNING PAGE LAYER 3 (Pages 6 & 7) ── */}
              <motion.div
                className="turning-page-layer"
                initial={false}
                animate={{ 
                  rotateY: currentSpread > 3
                    ? (bookOpen && currentSpread === 4 && hoverFlipLeft ? -170 : -180)
                    : (bookOpen && currentSpread === 3 && hoverFlipRight ? -10 : 0),
                  ...(currentSpread > 3 ? { transitionEnd: { zIndex: 33 } } : { zIndex: 37 })
                }}
                transition={{ duration: 0.6, ease: "easeInOut", zIndex: { duration: 0 } }}
                style={{
                  position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
                  transformOrigin: 'left center', transformStyle: 'preserve-3d', pointerEvents: 'none'
                }}
              >
                {/* FRONT FACE (Page 6) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '0 12px 12px 0', overflow: 'hidden', boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.05)', padding: '24px', paddingLeft: '32px', pointerEvents: 'auto' }}>
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header"><span style={{ color: '#7c2d12' }}>More Featured Work</span><span className="journal-page-num">Page 6</span></h2>
                    <div className="journal-works">
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Hospital DBMS</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>PostgreSQL • MongoDB</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Click2Bill</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Google Sheets • Apps Script</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Scénix</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • MediaPipe • Gemini 2.5</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>CANHEALTH</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>FastAPI • React • Gemini • ElevenLabs</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* BACK FACE (Page 7) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '12px 0 0 12px', overflow: 'hidden', transform: 'rotateY(180deg)', boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.05)', padding: '24px', pointerEvents: 'auto' }}>
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header"><span style={{ color: '#c2410c' }}>Competitions & Events</span><span className="journal-page-num">Page 7</span></h2>
                    <div className="journal-works">
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>AlgoTime Member</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>SCS Concordia • Sep 2024 - Present</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Hack the Mountain</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>May 2026</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>MPC Hacks</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>May 2026</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>CS Games 2026</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '2px' }}>Mar 2026</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.3', color: '#6b7280' }}>1st in Web Challenge, 2nd in AI and 3rd in CTF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>


              {/* ── 3D TURNING PAGE LAYER 2 (Pages 4 & 5) ── */}
              <motion.div
                className="turning-page-layer"
                initial={false}
                animate={{ 
                  rotateY: currentSpread > 2
                    ? (bookOpen && currentSpread === 3 && hoverFlipLeft ? -170 : -180)
                    : (bookOpen && currentSpread === 2 && hoverFlipRight ? -10 : 0),
                  ...(currentSpread > 2 ? { transitionEnd: { zIndex: 32 } } : { zIndex: 38 })
                }}
                transition={{ duration: 0.6, ease: "easeInOut", zIndex: { duration: 0 } }}
                style={{
                  position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
                  transformOrigin: 'left center', transformStyle: 'preserve-3d', pointerEvents: 'none'
                }}
              >
                {/* FRONT FACE (Page 4) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '0 12px 12px 0', overflow: 'hidden', boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.05)', padding: '24px', paddingLeft: '32px', pointerEvents: 'auto' }}>
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header"><span style={{ color: '#7c2d12' }}>Featured Works</span><span className="journal-page-num">Page 4</span></h2>
                    <div className="journal-works">
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Predicting Customer Churn</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Python • scikit-learn • pandas • seaborn</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Skin Lesion CNN Classifier</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>PyTorch • ResNet-18 • VGG-16</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Health Companion App</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Figma • UI/UX • Accessibility</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>FLUX: Collaborative Scheduling</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • TypeScript • Supabase</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>MediVault</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>OpenRouter • MongoDB • ElevenLabs</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* BACK FACE (Page 5) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '12px 0 0 12px', overflow: 'hidden', transform: 'rotateY(180deg)', boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.05)', padding: '24px', pointerEvents: 'auto' }}>
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header"><span style={{ color: '#7c2d12' }}>Featured Works</span><span className="journal-page-num">Page 5</span></h2>
                    <div className="journal-works">
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Events & Ticketing App</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • TypeScript • PostgreSQL</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>INTERBU: AI Interview Coach</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • Flask • Whisper</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>DRIP GENIUS</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Roboflow • K-means • CV</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Code Buddy</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>React • Vite • Node.js • Express</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>Universal Resume Parser</h4>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Python • Ollama LLM • LangChain</p>
                        </div>
                        <a href="https://github.com/Ranjit-Singh-Dhunna" target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{color: '#6b7280'}}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── 3D TURNING PAGE LAYER 1 (Pages 2 & 3) ── */}
              <motion.div
                className="turning-page-layer"
                initial={false}
                animate={{ 
                  rotateY: currentSpread > 1 
                    ? (bookOpen && currentSpread === 2 && hoverFlipLeft ? -170 : -180) 
                    : (bookOpen && currentSpread === 1 && hoverFlipRight ? -10 : 0),
                  ...(currentSpread > 1 ? { transitionEnd: { zIndex: 31 } } : { zIndex: 39 })
                }}
                transition={{ 
                  duration: 0.6, ease: "easeInOut",
                  zIndex: { duration: 0 }
                }}
                style={{
                  position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
                  transformOrigin: 'left center', transformStyle: 'preserve-3d', pointerEvents: 'none'
                }}
              >
                {/* FRONT FACE (Page 2 - Philosophy) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '0 12px 12px 0', overflow: 'hidden', boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.05)', padding: '24px', paddingLeft: '32px', pointerEvents: 'auto' }}>
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header"><span style={{ color: '#d97706' }}>Design Philosophy</span><span className="journal-page-num">Page 2</span></h2>
                    <div className="journal-philosophy">
                      <p>
                        The tactile nature of physical objects often grounds the creative process but this interactive workspace bridges the gap between digital utility and physical experience, crafting an environment that feels less like software and more like a personal desk.
                      </p>
                      <p>
                        Every draggable sticker, glowing lamp, and rustling page invites exploration. The deliberate imperfections serve to soften the harsh perfection of typical digital interfaces, creating a sanctuary that fosters genuine connection and focused thought.
                      </p>
                    </div>
                  </div>
                </div>
                {/* BACK FACE (Page 3 - Work Experience) */}
                <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '12px 0 0 12px', overflow: 'hidden', transform: 'rotateY(180deg)', boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.05)', padding: '24px', pointerEvents: 'auto' }}>
                  <div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <h2 className="journal-header"><span style={{ color: '#9d174d' }}>Work Experience</span><span className="journal-page-num">Page 3</span></h2>
                    <div className="journal-works">
                      <div className="work-item" style={{ alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div className="work-info">
                          <h4>Software Intern</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>Immense Star Solutions</p>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>May 2026 - Aug 2026</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>Django • REST APIs • Git • Databases</p>
                        </div>
                      </div>
                      <div className="work-item" style={{ alignItems: 'flex-start' }}>
                        <div className="work-info">
                          <h4>Fullstack & Applied AI Developer</h4>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '0' }}>SofiaPulse</p>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>Dec 2025 - Jan 2026</p>
                          <p style={{ fontSize: '10px', lineHeight: '1.4', color: '#9ca3af' }}>GenAI Editor • Full-stack • UI/UX • Responsive Design</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* HOTZONES FOR PAGE TURNING */}
              {currentSpread < 5 && bookOpen && (
                <div 
                  style={{ position: 'absolute', right: 0, top: 0, width: '20%', height: 'calc(100% - 80px)', zIndex: 60, cursor: 'pointer' }}
                  onMouseEnter={() => setHoverFlipRight(true)}
                  onMouseLeave={() => setHoverFlipRight(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoverFlipRight(false);
                    playSound('freesound_community-one-page-book-flip-101928.mp3');
                      setCurrentSpread(currentSpread + 1);
                  }}
                />
              )}
              {bookOpen && (
                <div 
                  style={{ position: 'absolute', left: 0, top: 0, width: '20%', height: 'calc(100% - 80px)', zIndex: 60, cursor: 'pointer' }}
                  onMouseEnter={() => { if (currentSpread > 1) setHoverFlipLeft(true); }}
                  onMouseLeave={() => setHoverFlipLeft(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoverFlipLeft(false);
                    if (currentSpread > 1) {
                      playSound('freesound_community-one-page-book-flip-101928.mp3');
                      setCurrentSpread(currentSpread - 1);
                    } else {
                      playSound('freesound_community-one-page-book-flip-101928.mp3');
                      setBookOpen(false);
                    }
                  }}
                />
              )}
            </motion.div>
      </div>

      {/* Floating Dust Motes (Sunlight particles) */}
      <div className="dust-motes-container">
        {dustMotes.map((moteStyle, i) => (
          <div 
            key={i} 
            className="dust-mote" 
            style={moteStyle}
          />
        ))}
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

      {/* Hidden webcam elements */}
      <video ref={videoRef} style={{ display: 'none' }} playsInline muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Final Picture Display */}
      <AnimatePresence>
        {cameraState === 'finished' && pictureData && (
          <motion.div
            className="final-picture-container"
            initial={{ opacity: 1, scale: 0.1, y: 250, rotate: -20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotate: [0, -15, 15, -10, 10, -5, 5, 0]
            }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          >
            <div className="polaroid-frame">
              <div className="polaroid-image-wrapper">
                <img src={pictureData} alt="Captured" />
                <svg className="polaroid-flower-doodle-top" width="70" height="65" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(10, 10) scale(0.7)">
                    <path d="M50 20 Q60 5 70 20 Q85 10 80 25 Q95 35 80 45 Q90 60 75 60 Q80 75 65 70 Q55 85 45 70 Q30 75 35 60 Q20 60 30 45 Q15 35 30 25 Q25 10 40 20 Q30 5 50 20 Z" stroke="#111827" strokeWidth="5" fill="#7dd3fc" strokeLinejoin="round" />
                    <circle cx="55" cy="45" r="10" stroke="#111827" strokeWidth="5" fill="#fef08a" />
                  </g>
                  <g transform="translate(50, 35) scale(0.55) rotate(25)">
                    <path d="M50 20 Q60 5 70 20 Q85 10 80 25 Q95 35 80 45 Q90 60 75 60 Q80 75 65 70 Q55 85 45 70 Q30 75 35 60 Q20 60 30 45 Q15 35 30 25 Q25 10 40 20 Q30 5 50 20 Z" stroke="#111827" strokeWidth="6" fill="#86efac" strokeLinejoin="round" />
                    <circle cx="55" cy="45" r="12" stroke="#111827" strokeWidth="6" fill="#fef08a" />
                  </g>
                </svg>
                <svg className="polaroid-flower-doodle" width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 20 Q60 5 70 20 Q85 10 80 25 Q95 35 80 45 Q90 60 75 60 Q80 75 65 70 Q55 85 45 70 Q30 75 35 60 Q20 60 30 45 Q15 35 30 25 Q25 10 40 20 Q30 5 50 20 Z" stroke="#111827" strokeWidth="4" fill="#f9a8d4" strokeLinejoin="round" />
                  <circle cx="55" cy="45" r="8" stroke="#111827" strokeWidth="4" fill="#fef08a" />
                </svg>
              </div>
              <div className="polaroid-caption">Today's Vibe!!</div>
            </div>
            <div className="polaroid-actions">
              <a href={pictureData} download="my_desk_picture.png" className="polaroid-btn">Download</a>
              <button onClick={() => { setCameraState('idle'); setPictureData(null); }} className="polaroid-btn close-btn">X</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sticker Menu Overlays and Buttons */}
      <button 
        className="sticker-add-btn"
        onClick={() => setStickerMenuOpen(true)}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>

      <AnimatePresence>
        {stickerMenuOpen && (
          <motion.div 
            className="sticker-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStickerMenuOpen(false)}
          >
            <motion.div 
              className="sticker-menu-popover"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticker-grid">
                {stickerPacks[stickerCategory].map((stickerFilename) => (
                  <button 
                    key={stickerFilename} 
                    className="sticker-item-btn"
                    onClick={() => {
                      setStickers(prev => [...prev, {
                        id: Math.random().toString(),
                        url: `/stickers/${stickerFilename}`,
                        x: window.innerWidth / 2 - 50 + (Math.random() * 40 - 20),
                        y: window.innerHeight / 2 - 50 + (Math.random() * 40 - 20),
                        rotation: Math.random() * 40 - 20,
                        scale: 1
                      }]);
                      setStickerMenuOpen(false);
                    }}
                  >
                    <img src={`/stickers/${stickerFilename}`} alt={stickerFilename} />
                  </button>
                ))}
              </div>
              
              <div className="sticker-categories-wrapper">
                <div className="sticker-categories">
                  {(['Cute', 'Stationery', 'Plants', 'Desk', 'Dev'] as const).map((cat) => (
                    <button 
                      key={cat}
                      className={`sticker-cat-btn ${stickerCategory === cat ? 'active' : ''}`}
                      onClick={() => setStickerCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
