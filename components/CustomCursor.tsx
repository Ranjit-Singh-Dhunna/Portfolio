"use client";

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [themeColor, setThemeColor] = useState({
    petal: '#e8c4b8',
    vine: '#2d4a1e',
    leaf: '#4a7a35'
  });

  useEffect(() => {
    let mx = 0, prevMx = 0, currentTilt = 0;
    let idleTimer: NodeJS.Timeout;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      clearTimeout(idleTimer);
      setIsIdle(false);
      
      const dx = e.clientX - prevMx;
      currentTilt += (dx * 0.35 - currentTilt) * 0.08;
      currentTilt = Math.max(-10, Math.min(10, currentTilt));
      
      prevMx = mx;
      mx = e.clientX;

      if (cursorRef.current) {
        if (cursorRef.current.style.opacity !== '1') {
          cursorRef.current.style.opacity = '1';
        }
        cursorRef.current.style.left = `${e.clientX - 21}px`;
        cursorRef.current.style.top = `${e.clientY - 6}px`;
        cursorRef.current.style.transform = `scale(0.7) rotate(${currentTilt - 22}deg)`;
      }

      idleTimer = setTimeout(() => setIsIdle(true), 2000);
    };

    const updateTilt = () => {
      const prevTilt = currentTilt;
      currentTilt += (0 - currentTilt) * 0.05;
      if (cursorRef.current && Math.abs(prevTilt) > 0.01) {
        cursorRef.current.style.transform = `scale(0.7) rotate(${currentTilt - 22}deg)`;
      }
      animationFrameId = requestAnimationFrame(updateTilt);
    };

    updateTilt();

    const onMouseDown = () => setIsGrabbing(true);
    const onMouseUp = () => setIsGrabbing(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .style-btn, .project-item')) {
        setIsHovering(true);
        
        const themeBtn = target.closest('.style-btn') as HTMLElement;
        if (themeBtn) {
          const theme = themeBtn.getAttribute('data-theme');
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
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  const cursorClass = `custom-cursor ${isHovering ? 'hovering' : ''} ${isGrabbing ? 'grabbing' : ''} ${isIdle ? 'idle' : ''}`;

  return (
    <div id="hand-cursor" ref={cursorRef} className={cursorClass}>
      <svg viewBox="0 0 52 64" width="52" height="64" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(52, 0) scale(-1, 1)">
        {/* Hand Silhouette */}
        <g className="hand-shape" stroke="#1a1a1a" strokeWidth="1.5" fill="#FAF5EE" strokeLinejoin="round" strokeLinecap="round">
          {/* Main outline */}
          <path d="
            M 20 64
            C 18 54, 12 46, 10 40
            L 10 32
            C 10 28, 16 28, 16 30
            C 16 26, 22 26, 22 28
            C 22 24, 28 24, 28 26
            L 28 8
            C 28 2, 34 2, 34 8
            L 34 35
            C 40 33, 44 29, 48 31
            C 50 33, 48 37, 44 39
            C 40 41, 32 54, 32 64 Z
          " />
          
          {/* Fingernails */}
          <path d="M 29.5 12 L 29.5 7 C 29.5 4, 32.5 4, 32.5 7 L 32.5 12 C 32.5 13, 29.5 13, 29.5 12 Z" fill="#FAF5EE" strokeWidth="1" />
          <path d="M 44 32 L 46 30 C 48 29, 49 31, 48 32 L 45 35 C 44 36, 43 33, 44 32 Z" fill="#FAF5EE" strokeWidth="1" />
        </g>

        {/* Botanicals Overlay */}
        <g className="botanicals" opacity={isGrabbing ? 0.5 : 0.85}>
          {/* Main Vine */}
          <path className="vine vine-main" d="M 26 64 C 28 50 30 42 31 34 C 32 26 31 20 31 12" stroke={themeColor.vine} strokeWidth="0.8" fill="none" strokeDasharray="60" />
          {/* Branch Vine */}
          <path className="vine vine-branch" d="M 28 46 C 24 44 18 40 14 36" stroke={themeColor.vine} strokeWidth="0.7" fill="none" strokeDasharray="30" />
          
          {/* Leaves */}
          <ellipse className="leaf" cx="31" cy="30" rx="2.5" ry="4" transform="rotate(-20 31 30)" fill={themeColor.leaf} />
          <ellipse className="leaf" cx="33" cy="20" rx="2" ry="3.5" transform="rotate(30 33 20)" fill={themeColor.leaf} />
          <ellipse className="leaf" cx="22" cy="42" rx="2.5" ry="4" transform="rotate(45 22 42)" fill={themeColor.leaf} />
          <ellipse className="leaf" cx="16" cy="38" rx="2" ry="3.5" transform="rotate(60 16 38)" fill={themeColor.leaf} />

          {/* Index Flower (Bloom on Hover) */}
          <g className="flower flower-index" transform="translate(31, 10)">
            {[0, 72, 144, 216, 288].map(deg => (
              <ellipse key={deg} cx="0" cy="-3.5" rx="1.5" ry="3" fill={themeColor.petal} opacity="0.9" transform={`rotate(${deg})`} className="petal"/>
            ))}
            <circle cx="0" cy="0" r="1.5" fill="#f5e642"/>
          </g>

          {/* Palm Flower */}
          <g className="flower flower-palm" transform="translate(24, 46)">
            {[0, 72, 144, 216, 288].map(deg => (
              <ellipse key={deg} cx="0" cy="-2.5" rx="1.2" ry="2.2" fill={themeColor.petal} opacity="0.9" transform={`rotate(${deg})`} className="petal"/>
            ))}
            <circle cx="0" cy="0" r="1" fill="#f5e642"/>
          </g>

          {/* Wrist Flower */}
          <g className="flower flower-wrist" transform="translate(26, 58)">
            {[0, 72, 144, 216, 288].map(deg => (
              <ellipse key={deg} cx="0" cy="-2" rx="1" ry="1.8" fill={themeColor.petal} opacity="0.9" transform={`rotate(${deg})`} className="petal"/>
            ))}
            <circle cx="0" cy="0" r="0.8" fill="#f5e642"/>
          </g>
        </g>
        </g>
      </svg>
    </div>
  );
}
