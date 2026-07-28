"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [walkFrame, setWalkFrame] = useState(0);
  const directionRef = useRef(1); // 1 for right, -1 for left
  const pathnameRef = useRef(pathname);
  const [themeColor, setThemeColor] = useState({
    petal: '#e8c4b8',
    vine: '#2d4a1e',
    leaf: '#4a7a35'
  });

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const lastPathRef = useRef(pathname);
  const didSnapRef = useRef(false);
  const pendingSnapRef = useRef(false);

  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const hoveredThemeRef = useRef<string | null>(null);
  const pixelHoverPct = useRef({ x: 0.5, y: 0.5 });
  const circleRef = useRef<HTMLDivElement>(null);
  const circleSize = useRef(150);
  const transitionStartTime = useRef<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTransitioningRef = useRef(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isFadingOutRef = useRef(false);
  const fadeStartTime = useRef<number | null>(null);
  const circleOpacity = useRef(1);
  const iframeLeft = useRef(0);
  const iframeTop = useRef(0);
  const bgPositionRef = useRef('center');
  const bgSizeRef = useRef('cover');
  const cursorTransformRef = useRef('translate3d(-100px, -100px, 0)');
  const cursorTransformOriginRef = useRef('21px 6px');
  const bookClipRef = useRef<HTMLDivElement>(null);
  const bookClipPathRef = useRef('circle(0px at 0px 0px)');
  const [fullScreenOverlay, setFullScreenOverlay] = useState(false);
  const fullScreenOverlayRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isDissolvingOut, setIsDissolvingOut] = useState(false);

  const updateHoveredTheme = (theme: string | null) => {
    setHoveredTheme(theme);
    hoveredThemeRef.current = theme;
  };

  useEffect(() => {
    const oldPath = lastPathRef.current;
    lastPathRef.current = pathname;
    pathnameRef.current = pathname;
    
    // When arriving at /pixel after a transition, start fade-out phase
    if ((pathname.startsWith('/pixel') || pathname.startsWith('/book')) && isTransitioningRef.current) {
      // Wait for the pixel page to fully paint, then start fading out the circle
      setTimeout(() => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
        setIsFadingOut(true);
        isFadingOutRef.current = true;
        fadeStartTime.current = performance.now();
      }, 300);
    } else {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
    }
    
    // Reset hover states on route change to prevent stuck cursor effects
    setIsHovering(false);
    updateHoveredTheme(null);
    setIsDissolvingOut(false);
    
    if ((pathname.startsWith('/pixel') || pathname.startsWith('/book')) && !(oldPath.startsWith('/pixel') || oldPath.startsWith('/book'))) {
      pendingSnapRef.current = true;
    }
  }, [pathname]);

  useEffect(() => {
    const handleTransition = () => {
      setIsTransitioning(true);
      isTransitioningRef.current = true;
    };
    const handleDissolve = () => {
      setIsDissolvingOut(true);
    };
    window.addEventListener('pixel-transition-start', handleTransition);
    window.addEventListener('pixel-dissolve-start', handleDissolve);
    return () => {
      window.removeEventListener('pixel-transition-start', handleTransition);
      window.removeEventListener('pixel-dissolve-start', handleDissolve);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    if (pathname.startsWith('/pixel') || pathname.startsWith('/book')) {
      pendingSnapRef.current = true;
    }

    let mx = 0, prevMx = 0, currentTilt = 0;
    let idleTimer: NodeJS.Timeout;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (didSnapRef.current) return;
      
      clearTimeout(idleTimer);
      setIsIdle(false);
      
      const dx = e.clientX - mousePos.current.x;
      if (Math.abs(dx) > 1) {
        directionRef.current = dx > 0 ? 1 : -1;
      }
      
      mousePos.current = { x: e.clientX, y: e.clientY };

      const pixelBtn = document.querySelector('.style-btn[data-theme="pixel"]');
      if (pixelBtn) {
        const rect = pixelBtn.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          const relativeX = e.clientX - rect.left;
          const relativeY = e.clientY - rect.top;
          pixelHoverPct.current = {
            x: relativeX / rect.width,
            y: relativeY / rect.height
          };
        }
      }

      if (cursorRef.current && !pathnameRef.current.startsWith('/pixel') && !pathnameRef.current.startsWith('/book')) {
        if (cursorRef.current.style.opacity !== '1') {
          cursorRef.current.style.opacity = '1';
        }
      }

      idleTimer = setTimeout(() => {
        setIsIdle(true);
        setIsWalking(false);
      }, 150);
    };

    const handleResize = () => {
      if (pathnameRef.current.startsWith('/pixel')) {
        pendingSnapRef.current = true;
      }
    };
    window.addEventListener('resize', handleResize);

    const tick = () => {
      // Snap the cursor immediately when the route changes to /pixel
      if (pendingSnapRef.current) {
        const peakX = window.innerWidth * 0.31;
        const peakY = window.innerHeight * 0.60;
        mousePos.current = { x: peakX, y: peakY };
        cursorPos.current = { x: peakX, y: peakY };
        directionRef.current = 1;
        pendingSnapRef.current = false;
        didSnapRef.current = true;
        setTimeout(() => {
          didSnapRef.current = false;
        }, 800);
      }

      // Easing
      const ease = 0.15;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;

      // Calculate velocity for walking animation
      const vx = mousePos.current.x - cursorPos.current.x;
      const vy = mousePos.current.y - cursorPos.current.y;
      const speed = Math.sqrt(vx*vx + vy*vy);
      if (!isTransitioningRef.current && !isFadingOutRef.current) {
        setIsWalking(speed > 1);
      }

      if (cursorRef.current) {
        if (pathnameRef.current.startsWith('/pixel')) {
          let rotation = 0;
          let scaleX = directionRef.current === 1 ? 1.2 : -1.2;
          if (speed > 1) {
            const refVx = directionRef.current === 1 ? vx : -vx;
            rotation = Math.atan2(vy, refVx) * (180 / Math.PI);
          }
          cursorTransformOriginRef.current = '0px 0px';
          cursorTransformRef.current = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) scale(${scaleX}, 1.2) rotate(${rotation}deg)`;
        } else {
          cursorTransformOriginRef.current = '21px 6px';
          cursorTransformRef.current = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        }
        cursorRef.current.style.transformOrigin = cursorTransformOriginRef.current;
        cursorRef.current.style.transform = cursorTransformRef.current;
      }

      // Update book clip-path to follow cursor
      if (bookClipRef.current) {
        const clipCenterX = mousePos.current.x;
        const clipCenterY = mousePos.current.y;
        const clipRadius = circleSize.current / 2;
        bookClipPathRef.current = `circle(${clipRadius}px at ${clipCenterX}px ${clipCenterY}px)`;
        bookClipRef.current.style.clipPath = bookClipPathRef.current;
      }

      // Handle fade-out phase: smoothly fade the overlay after page has painted
      const fadeTarget = bookClipRef.current || overlayRef.current || circleRef.current;
      if (fadeTarget && isFadingOutRef.current) {
        if (fadeStartTime.current !== null) {
          const fadeElapsed = performance.now() - fadeStartTime.current;
          const fadeDuration = 400;
          const fadeT = Math.min(1, fadeElapsed / fadeDuration);
          circleOpacity.current = 1 - fadeT;
          fadeTarget.style.opacity = `${circleOpacity.current}`;
          if (fadeT >= 1) {
            // Fade-out complete, fully unmount
            isFadingOutRef.current = false;
            setIsFadingOut(false);
            fadeStartTime.current = null;
            circleOpacity.current = 1;
            circleSize.current = 150;
            transitionStartTime.current = null;
            fullScreenOverlayRef.current = false;
            setFullScreenOverlay(false);
          }
        }
      }
      if (circleRef.current) {
        if (isTransitioningRef.current || isFadingOutRef.current) {
          circleRef.current.style.transition = 'none';
        } else {
          circleRef.current.style.transition = '';
        }
      }

      // Animate circle size independently of circleRef DOM element
      const showCircle = (!pathnameRef.current.startsWith('/pixel') && !pathnameRef.current.startsWith('/book')) || isTransitioningRef.current || isFadingOutRef.current;
      const isActiveHover = hoveredThemeRef.current === 'pixel' || hoveredThemeRef.current === 'book' || isTransitioningRef.current;
      
      if (showCircle && !isFadingOutRef.current && isActiveHover) {
        if (isTransitioningRef.current) {
          if (transitionStartTime.current === null) {
            transitionStartTime.current = performance.now();
          }
          const elapsed = performance.now() - transitionStartTime.current;
          const duration = 1200;
          const t = Math.min(1, elapsed / duration);
          
          const easeInCurve = (x: number) => {
            return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
          };
          
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const maxDist = Math.sqrt(vw * vw + vh * vh) * 2 + 200;
          
          circleSize.current = 150 + (maxDist - 150) * easeInCurve(t);
          
          if (t >= 1 && !fullScreenOverlayRef.current) {
            fullScreenOverlayRef.current = true;
            setFullScreenOverlay(true);
          }
        } else {
          transitionStartTime.current = null;
          circleSize.current = 150;
        }
      } else if (showCircle && !isFadingOutRef.current && !isActiveHover) {
        transitionStartTime.current = null;
        circleSize.current = 150;
      }

      // Apply pixel-specific DOM updates only when circleRef exists
      if (circleRef.current && showCircle && !isFadingOutRef.current && isActiveHover) {
        if (isTransitioningRef.current) {
          circleRef.current.style.width = `${circleSize.current}px`;
          circleRef.current.style.height = `${circleSize.current}px`;

          const elapsed = performance.now() - (transitionStartTime.current || performance.now());
          const t = Math.min(1, elapsed / 1200);
          const borderOpacity = t > 0.7 ? Math.max(0, 1 - (t - 0.7) / 0.3) : 1;
          circleRef.current.style.borderColor = `rgba(255, 179, 198, ${borderOpacity})`;
        } else {
          circleRef.current.style.width = '150px';
          circleRef.current.style.height = '150px';
        }

        // Background position for pixel transitions
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const ir = 2758 / 1504;
        const vr = vw / vh;
        
        let scaled_width = 0;
        let scaled_height = 0;
        let x_offset = 0;
        let y_offset = 0;
        
        if (vr > ir) {
          scaled_width = vw;
          scaled_height = vw / ir;
          x_offset = 0;
          y_offset = vh - scaled_height;
        } else {
          scaled_width = vh * ir;
          scaled_height = vh;
          x_offset = (vw - scaled_width) / 2;
          y_offset = 0;
        }
        
        const radiusX = circleSize.current / 2;
        const radiusY = circleSize.current / 2;
        const posRef = mousePos.current;
        const x_topleft = posRef.x + 4 - radiusX;
        const y_topleft = posRef.y + 18 - radiusY;
        
        const bg_x = x_offset - x_topleft;
        const bg_y = y_offset - y_topleft;
        
        bgPositionRef.current = `${bg_x}px ${bg_y}px`;
        bgSizeRef.current = `${scaled_width}px ${scaled_height}px`;
        circleRef.current.style.backgroundPosition = bgPositionRef.current;
        circleRef.current.style.backgroundSize = bgSizeRef.current;
      } else if (circleRef.current && showCircle && !isFadingOutRef.current && !isActiveHover) {
        circleRef.current.style.width = '150px';
        circleRef.current.style.height = '150px';
        bgPositionRef.current = 'center';
        bgSizeRef.current = 'cover';
        circleRef.current.style.backgroundPosition = bgPositionRef.current;
        circleRef.current.style.backgroundSize = bgSizeRef.current;
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // Walking animation frame loop
    const walkInterval = setInterval(() => {
      if (!isTransitioningRef.current && !isFadingOutRef.current) {
        setWalkFrame(prev => (prev + 1) % 4);
      }
    }, 100);

    const onMouseDown = () => setIsGrabbing(true);
    const onMouseUp = () => setIsGrabbing(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('button, a, .style-btn, .project-item');
      if (btn) {
        setIsHovering(true);
        
        const themeBtn = btn.closest('.style-btn') as HTMLElement;
        if (themeBtn) {
          const theme = themeBtn.getAttribute('data-theme');
          updateHoveredTheme(theme);
          const colors = {
            comic: { petal: '#FF6B6B', vine: '#1a1a1a', leaf: '#FFD166' },
            pixel: { petal: '#FFB3C6', vine: '#00aa44', leaf: '#00ff41' },
            stalker: { petal: '#00ff41', vine: '#003300', leaf: '#004400' },
            traditional: { petal: '#c8956c', vine: '#5c3d1e', leaf: '#6b8c42' },
            book: { petal: '#d4a8b0', vine: '#3d2b1f', leaf: '#5a6e3a' },
            '3d': { petal: '#b8a0ff', vine: '#1a0044', leaf: '#6644aa' },
            default: { petal: '#e8c4b8', vine: '#2d4a1e', leaf: '#4a7a35' }
          };
          setThemeColor((colors as any)[theme || 'default'] || colors.default);
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .style-btn, .project-item')) {
        setIsHovering(false);
        updateHoveredTheme(null);
        setThemeColor({ petal: '#e8c4b8', vine: '#2d4a1e', leaf: '#4a7a35' });
      }
    };

    const onMouseLeaveWindow = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
    };
    const onMouseEnterWindow = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      clearTimeout(idleTimer);
      cancelAnimationFrame(animationFrameId);
      clearInterval(walkInterval);
    };
  }, []);

  if (!mounted || ('ontouchstart' in window) || pathname.startsWith('/desktop')) {
    return null;
  }

  const cursorClass = `custom-cursor ${isHovering ? 'hovering' : ''} ${isGrabbing ? 'grabbing' : ''} ${isIdle ? 'idle' : ''}`;
  const isPixelPage = pathname.startsWith('/pixel');
  const isBookPage = pathname.startsWith('/book');
  return (
    <>
      {/* Book iframe revealed via clip-path - always at viewport (0,0) */}
      {(hoveredTheme === 'book' || ((isTransitioning || isFadingOut) && isBookPage)) && (
        <div
          ref={bookClipRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: (isTransitioning || isFadingOut) ? 999999 : 999998,
            pointerEvents: 'none',
            clipPath: bookClipPathRef.current,
            opacity: isFadingOut ? circleOpacity.current : 1,
            transition: 'none',
          }}
        >
          <iframe
            src="/book"
            style={{
              width: '100vw',
              height: '100vh',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
        </div>
      )}
      {fullScreenOverlay && !(hoveredTheme === 'book' || isBookPage) && (
        <div 
          ref={overlayRef}
          style={{
            position: 'fixed',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            zIndex: 999999,
            pointerEvents: 'none',
            backgroundColor: '#000',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              right: '2px',
              bottom: '2px',
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(/px1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
              backgroundRepeat: 'no-repeat',
              imageRendering: 'pixelated',
            }}
          />
        </div>
      )}
      <div 
        id="custom-cursor-container" 
        ref={cursorRef} 
        className={cursorClass}
        style={{ 
          position: 'fixed', 
          pointerEvents: 'none', 
          zIndex: 999999,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          display: mounted ? 'block' : 'none',
          transform: cursorTransformRef.current,
          transformOrigin: cursorTransformOriginRef.current
        }}
      >
      {(!isPixelPage && !isBookPage || isTransitioning || isFadingOut) && (!fullScreenOverlay || hoveredTheme === 'book' || isBookPage) && hoveredTheme !== 'book' && !(isBookPage && (isTransitioning || isFadingOut)) && (
        <div 
          ref={circleRef}
          style={{
            position: 'absolute',
            left: '4px',
            top: '18px',
            width: (isTransitioning || isFadingOut) ? `${circleSize.current}px` : '150px',
            height: (isTransitioning || isFadingOut) ? `${circleSize.current}px` : '150px',
            borderRadius: '50%',
            border: `1.5px solid ${themeColor.petal}`,
            backgroundColor: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? 'transparent' : 'rgba(255, 255, 255, 0.03)',
                        backgroundImage: (hoveredTheme === 'pixel' || (isPixelPage && (isTransitioning || isFadingOut))) ? `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.38)), url(/px1.png)` : 'none',
            backgroundSize: (hoveredTheme === 'pixel' || isTransitioning || isFadingOut) ? bgSizeRef.current : 'cover',
            backgroundPosition: bgPositionRef.current,
            backgroundRepeat: 'no-repeat',
            backdropFilter: (hoveredTheme === 'pixel' || hoveredTheme === 'book' || isTransitioning || isFadingOut) ? 'none' : 'blur(2px)',
            pointerEvents: 'none',
            overflow: 'hidden',
            transform: `translate(-50%, -50%) scale(${(isTransitioning || isFadingOut) ? 1.0 : (isHovering ? 1.0 : 0)})`,
            opacity: isFadingOut ? circleOpacity.current : ((isHovering || isTransitioning) ? 1 : 0),
            transition: (isTransitioning || isFadingOut)
              ? 'none'
              : 'width 0.3s ease, height 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, border-color 0.4s ease, background-color 0.4s ease',
            zIndex: (isTransitioning || isFadingOut) ? 10001 : -1,
            imageRendering: 'pixelated'
          }}
        >

        </div>
      )}

      {isPixelPage ? (
        <div style={{
          position: 'absolute',
          width: '105px',
          height: '170px',
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          backgroundImage: isWalking 
            ? ((Math.floor(walkFrame / 2) % 2) === 0 ? 'url(/mov1.png)' : 'url(/mov2.png)')
            : ((Math.floor(walkFrame / 2) % 2) === 0 ? 'url(/fly1.png)' : 'url(/fly2.png)'),
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          imageRendering: 'pixelated',
          opacity: isDissolvingOut ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }} />
      ) : (
        <div className="hand-wrapper" style={{ 
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate(-14px, -4px) ${isHovering ? 'scale(1.2)' : 'scale(1)'}`,
          opacity: (isTransitioning || isFadingOut) ? 0 : 1,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease'
        }}>
          <svg viewBox="0 0 52 64" width="36" height="44" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(52, 0) scale(-1, 1)">
              <g className="hand-shape" stroke="#1a1a1a" strokeWidth="1.5" fill="#FAF5EE" strokeLinejoin="round" strokeLinecap="round">
                <path d="M 20 64 C 18 54, 12 46, 10 40 L 10 32 C 10 28, 16 28, 16 30 C 16 26, 22 26, 22 28 C 22 24, 28 24, 28 26 L 28 8 C 28 2, 34 2, 34 8 L 34 35 C 40 33, 44 29, 48 31 C 50 33, 48 37, 44 39 C 40 41, 32 54, 32 64 Z" />
              </g>
              <path d="M 29.5 12 L 29.5 7 C 29.5 4, 32.5 4, 32.5 7 L 32.5 12 C 32.5 13, 29.5 13, 29.5 12 Z" fill="#FAF5EE" strokeWidth="1" />
              <path d="M 44 32 L 46 30 C 48 29, 49 31, 48 32 L 45 35 C 44 36, 43 33, 44 32 Z" fill="#FAF5EE" strokeWidth="1" />
            </g>
            <g className="botanicals" opacity={isGrabbing ? 0.5 : 0.85}>
              <path className="vine vine-main" d="M 26 64 C 28 50 30 42 31 34 C 32 26 31 20 31 12" stroke={themeColor.vine} strokeWidth="0.8" fill="none" />
              <path className="vine vine-branch" d="M 28 46 C 24 44 18 40 14 36" stroke={themeColor.vine} strokeWidth="0.7" fill="none" />
              <ellipse className="leaf" cx="31" cy="30" rx="2.5" ry="4" transform="rotate(-20 31 30)" fill={themeColor.leaf} />
              <ellipse className="leaf" cx="33" cy="20" rx="2" ry="3.5" transform="rotate(30 33 20)" fill={themeColor.leaf} />
              <ellipse className="leaf" cx="22" cy="42" rx="2.5" ry="4" transform="rotate(45 22 42)" fill={themeColor.leaf} />
              <ellipse className="leaf" cx="16" cy="38" rx="2" ry="3.5" transform="rotate(60 16 38)" fill={themeColor.leaf} />
              <g className="flower flower-index" transform="translate(31, 10)">
                {[0, 72, 144, 216, 288].map(deg => (
                  <ellipse key={deg} cx="0" cy="-3.5" rx="1.5" ry="3" fill={themeColor.petal} opacity="0.9" transform={`rotate(${deg})`} />
                ))}
                <circle cx="0" cy="0" r="1.5" fill="#f5e642"/>
              </g>
              <g className="flower flower-palm" transform="translate(24, 46)">
                {[0, 72, 144, 216, 288].map(deg => (
                  <ellipse key={deg} cx="0" cy="-2.5" rx="1.2" ry="2.2" fill={themeColor.petal} opacity="0.9" transform={`rotate(${deg})`} />
                ))}
                <circle cx="0" cy="0" r="1" fill="#f5e642"/>
              </g>
              <g className="flower flower-wrist" transform="translate(26, 58)">
                {[0, 72, 144, 216, 288].map(deg => (
                  <ellipse key={deg} cx="0" cy="-2" rx="1" ry="1.8" fill={themeColor.petal} opacity="0.9" transform={`rotate(${deg})`} />
                ))}
                <circle cx="0" cy="0" r="0.8" fill="#f5e642"/>
              </g>
            </g>
          </svg>
        </div>
      )}
    </div>
    </>
  );
}
