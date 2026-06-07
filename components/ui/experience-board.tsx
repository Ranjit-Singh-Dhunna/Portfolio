"use client";

import React, { useState } from 'react';

// High-fidelity pixelated wood texture assets
const woodBgH = 'url("/pixel_wood_horizontal.png")';
const woodBgV = 'url("/pixel_wood_vertical.png")';

export default function ExperienceBoard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const jobs = [
    {
      id: '1',
      company: 'Immense Star Solutions',
      title: 'Software Intern',
      date: 'May 2026 – Aug 2026',
      bullets: [
        'Contributed to developing and maintaining web APIs using Django and Django REST Framework, supporting seamless communication between backend and frontend teams.',
        'Collaborated with senior developers to troubleshoot bugs and write unit tests, improving codebase stability and reducing production errors.',
        'Gained hands-on experience in version control with Git and participated in agile ceremonies, ensuring efficient task tracking and timely delivery of features.'
      ]
    },
    {
      id: '2',
      company: 'NexaGen Innovators',
      title: 'Frontend Developer',
      date: 'Jan 2025 – Dec 2025',
      bullets: [
        'Built responsive web interfaces using React and Next.js, optimizing performance and SEO to increase user engagement metrics by 20%.',
        'Implemented state management with Redux to streamline data flow across complex UI components.',
        'Collaborated directly with designers in Figma to translate mockups into pixel-perfect, accessible components.'
      ]
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'var(--font-pixelify), monospace',
      transform: 'perspective(1400px) rotateY(25deg) rotateX(2deg) rotateZ(-2deg) scale(0.60)',
      transformStyle: 'preserve-3d',
      width: '100%',
      maxWidth: '1380px',
      userSelect: 'none',
      marginTop: '-5vh',
      filter: 'drop-shadow(20px 30px 20px rgba(15, 25, 10, 0.7)) saturate(0.65)',
      color: '#cfa448',
    }}>
      
      {/* ── 3 WOODEN STANDS (POSTS) BEHIND EVERYTHING ── */}
      <div style={{
        position: 'absolute',
        top: '20%',
        bottom: '-250px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 12%',
        zIndex: -5,
      }}>
        {/* Side pillars are minutely shorter (98%) than the middle pillar (100%) */}
        <div style={{ 
          width: '56px', 
          height: '98%', 
          backgroundImage: woodBgV, 
          backgroundColor: '#9c8a7b',
          backgroundBlendMode: 'multiply',
          backgroundSize: '128px 128px', 
          imageRendering: 'pixelated', 
          borderLeft: '6px solid #1a1610', 
          borderRight: '6px solid #1a1610',
          boxShadow: 'inset 6px 0 0 rgba(215, 175, 135, 0.08), inset -6px 0 0 rgba(0,0,0,0.5), 0 0 0 4px #1a1610'
        }} />
        <div style={{ 
          width: '56px', 
          height: '100%', 
          backgroundImage: woodBgV, 
          backgroundColor: '#9c8a7b',
          backgroundBlendMode: 'multiply',
          backgroundSize: '128px 128px', 
          imageRendering: 'pixelated', 
          borderLeft: '6px solid #1a1610', 
          borderRight: '6px solid #1a1610',
          boxShadow: 'inset 6px 0 0 rgba(215, 175, 135, 0.08), inset -6px 0 0 rgba(0,0,0,0.5), 0 0 0 4px #1a1610'
        }} />
        <div style={{ 
          width: '56px', 
          height: '98%', 
          backgroundImage: woodBgV, 
          backgroundColor: '#9c8a7b',
          backgroundBlendMode: 'multiply',
          backgroundSize: '128px 128px', 
          imageRendering: 'pixelated', 
          borderLeft: '6px solid #1a1610', 
          borderRight: '6px solid #1a1610',
          boxShadow: 'inset 6px 0 0 rgba(215, 175, 135, 0.08), inset -6px 0 0 rgba(0,0,0,0.5), 0 0 0 4px #1a1610'
        }} />
      </div>

      {/* ── MAIN BOARD ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
        marginBottom: '20px',
      }}>
        {/* Top Decorative Crest */}
        <div style={{
          position: 'absolute',
          top: '-68px',
          width: '420px',
          height: '75px',
          zIndex: -1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 420 75"
            style={{ imageRendering: 'pixelated' }}
          >
            <defs>
              <pattern id="wood-h-pattern" width="256" height="256" patternUnits="userSpaceOnUse">
                <image href="/pixel_wood_horizontal.png" width="256" height="256" />
                <rect width="256" height="256" fill="#9c8a7b" style={{ mixBlendMode: 'multiply' }} />
              </pattern>
            </defs>
            {/* Shadow/Border Outline - Smooth Curved Low Dome */}
            <path
              d="M 30 75 C 100 75 140 52 185 45 C 200 42 205 42 210 42 C 215 42 220 42 235 45 C 270 52 330 74 400 75 Z"
              fill="#1a1610"
              stroke="#1a1610"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Main Crest Wood - Smooth Curved Low Dome */}
            <path
              d="M 30 75 C 100 75 140 52 185 45 C 200 42 205 42 210 42 C 215 42 220 42 235 45 C 270 52 330 74 400 75 Z"
              fill="url(#wood-h-pattern)"
            />
            {/* Highlight (top/left wood-colored bevel, no white shine) */}
            <path
              d="M 33 75 C 101 75 141 53 186 47 C 201 44 204 44 210 44 C 216 44 219 44 234 47 C 279 53 319 75 387 75"
              stroke="rgba(215, 175, 135, 0.12)"
              strokeWidth="3"
              fill="none"
            />
            {/* Center Gold Ornament (Wings/scrolls and stick figure from Image 2) */}
            <g stroke="#1a1610" strokeWidth="3.5" strokeLinecap="round" fill="none">
              {/* Left outer scroll outline */}
              <path d="M 175 60 C 168 62 166 54 172 50 C 178 46 182 54 178 56" />
              {/* Left inner scroll outline */}
              <path d="M 192 60 C 185 62 183 54 189 50 C 195 46 199 54 195 56" />
              {/* Central Figure limbs outline */}
              <path d="M 210 54 L 198 46" />
              <path d="M 210 54 L 222 46" />
              <path d="M 210 54 L 210 64" />
              <path d="M 210 64 L 204 70" />
              <path d="M 210 64 L 216 70" />
              {/* Right inner scroll outline */}
              <path d="M 228 60 C 235 62 237 54 231 50 C 225 46 221 54 225 56" />
              {/* Right outer scroll outline */}
              <path d="M 245 60 C 252 62 254 54 248 50 C 242 46 238 54 242 56" />
            </g>
            <g fill="#9c8465" stroke="none">
              {/* Head */}
              <circle cx="210" cy="50" r="4.5" />
              {/* Left outer scroll gold */}
              <path d="M 175 60 C 168 62 166 54 172 50 C 178 46 182 54 178 56" stroke="#9c8465" strokeWidth="1.8" fill="none" />
              {/* Left inner scroll gold */}
              <path d="M 192 60 C 185 62 183 54 189 50 C 195 46 199 54 195 56" stroke="#9c8465" strokeWidth="1.8" fill="none" />
              {/* Right inner scroll gold */}
              <path d="M 228 60 C 235 62 237 54 231 50 C 225 46 221 54 225 56" stroke="#9c8465" strokeWidth="1.8" fill="none" />
              {/* Right outer scroll gold */}
              <path d="M 245 60 C 252 62 254 54 248 50 C 242 46 238 54 242 56" stroke="#9c8465" strokeWidth="1.8" fill="none" />
              {/* Central figure limbs gold */}
              <path d="M 210 54 L 198 46 M 210 54 L 222 46 M 210 54 L 210 64 M 210 64 L 204 70 M 210 64 L 216 70" stroke="#9c8465" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        {/* Outer Wooden Frame (Pixelated Border Wrapper) */}
        <div style={{
          width: '100%',
          backgroundColor: '#1a1610',
          padding: '8px', // Outer black outline thickness
          clipPath: `polygon(
            0px 20px, 4px 20px, 4px 16px, 8px 16px, 8px 12px, 12px 12px, 12px 8px, 16px 8px, 16px 4px, 20px 4px, 20px 0px,
            calc(100% - 20px) 0px, calc(100% - 20px) 4px, calc(100% - 16px) 4px, calc(100% - 16px) 8px, calc(100% - 12px) 8px, calc(100% - 12px) 12px, calc(100% - 8px) 12px, calc(100% - 8px) 16px, calc(100% - 4px) 16px, calc(100% - 4px) 20px, 100% 20px,
            100% calc(100% - 20px), calc(100% - 4px) calc(100% - 20px), calc(100% - 4px) calc(100% - 16px), calc(100% - 8px) calc(100% - 16px), calc(100% - 8px) calc(100% - 12px), calc(100% - 12px) calc(100% - 12px), calc(100% - 12px) calc(100% - 8px), calc(100% - 16px) calc(100% - 8px), calc(100% - 16px) calc(100% - 4px), calc(100% - 20px) calc(100% - 4px), calc(100% - 20px) 100%,
            20px 100%, 20px calc(100% - 4px), 16px calc(100% - 4px), 16px calc(100% - 8px), 12px calc(100% - 8px), 12px calc(100% - 12px), 8px calc(100% - 12px), 8px calc(100% - 16px), 4px calc(100% - 16px), 4px calc(100% - 20px), 0px calc(100% - 20px)
          )`,
          filter: 'drop-shadow(0px 12px 0px rgba(0, 0, 0, 0.45))',
          position: 'relative',
        }}>
          {/* Inner Textured Wood Body */}
          <div style={{
            width: '100%',
            backgroundImage: woodBgH,
            backgroundColor: '#9c8a7b',
            backgroundBlendMode: 'multiply',
            backgroundSize: '256px 256px',
            imageRendering: 'pixelated',
            padding: '20px',
            boxShadow: `
              inset 8px 8px 0 rgba(215, 175, 135, 0.1), 
              inset -8px -8px 0 rgba(0,0,0,0.55)
            `,
            clipPath: `polygon(
              0px 16px, 4px 16px, 4px 12px, 8px 12px, 8px 8px, 12px 8px, 12px 4px, 16px 4px, 16px 0px,
              calc(100% - 16px) 0px, calc(100% - 16px) 4px, calc(100% - 12px) 4px, calc(100% - 12px) 8px, calc(100% - 8px) 8px, calc(100% - 8px) 12px, calc(100% - 4px) 12px, calc(100% - 4px) 16px, 100% 16px,
              100% calc(100% - 16px), calc(100% - 4px) calc(100% - 16px), calc(100% - 4px) calc(100% - 12px), calc(100% - 8px) calc(100% - 12px), calc(100% - 8px) calc(100% - 8px), calc(100% - 12px) calc(100% - 8px), calc(100% - 12px) calc(100% - 4px), calc(100% - 16px) calc(100% - 4px), calc(100% - 16px) 100%,
              16px 100%, 16px calc(100% - 4px), 12px calc(100% - 4px), 12px calc(100% - 8px), 8px calc(100% - 8px), 8px calc(100% - 12px), 4px calc(100% - 12px), 4px calc(100% - 16px), 0px calc(100% - 16px)
            )`,
          }}>
          {/* Inner Green Board */}
          <div style={{
            backgroundColor: '#1d2115',
            boxShadow: `
              inset 14px 14px 0px 0px #12100a,
              inset -14px -14px 0px 0px #12100a,
              inset 0 0 0 16px #2d2719
            `,
            padding: '4rem 6rem',
            textAlign: 'center',
            width: '100%',
            height: '450px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {/* Fancy Ornate Inner Chalkboard Border */}
            <div style={{ position: 'absolute', top: '25px', left: '25px', right: '25px', bottom: '25px', pointerEvents: 'none' }}>
              {/* Straight border lines */}
              <div style={{ position: 'absolute', top: '10px', left: '40px', right: '40px', height: '2px', backgroundColor: '#cfa448', opacity: 0.6 }} />
              <div style={{ position: 'absolute', bottom: '10px', left: '40px', right: '40px', height: '2px', backgroundColor: '#cfa448', opacity: 0.6 }} />
              <div style={{ position: 'absolute', left: '10px', top: '40px', bottom: '40px', width: '2px', backgroundColor: '#cfa448', opacity: 0.6 }} />
              <div style={{ position: 'absolute', right: '10px', top: '40px', bottom: '40px', width: '2px', backgroundColor: '#cfa448', opacity: 0.6 }} />

              {/* Top-Left Corner */}
              <svg width="40" height="40" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.6 }} viewBox="0 0 40 40">
                <path d="M 40 10 L 20 10 L 10 20 L 10 40" fill="none" stroke="#cfa448" strokeWidth="2" strokeLinecap="square" />
                <path d="M 15 15 L 23 15 L 23 23 L 15 23 Z" fill="none" stroke="#cfa448" strokeWidth="2" />
                <rect x="4" y="4" width="4" height="4" fill="#cfa448" />
              </svg>

              {/* Top-Right Corner */}
              <svg width="40" height="40" style={{ position: 'absolute', top: 0, right: 0, opacity: 0.6 }} viewBox="0 0 40 40">
                <path d="M 0 10 L 20 10 L 30 20 L 30 40" fill="none" stroke="#cfa448" strokeWidth="2" strokeLinecap="square" />
                <path d="M 25 15 L 17 15 L 17 23 L 25 23 Z" fill="none" stroke="#cfa448" strokeWidth="2" />
                <rect x="32" y="4" width="4" height="4" fill="#cfa448" />
              </svg>

              {/* Bottom-Left Corner */}
              <svg width="40" height="40" style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.6 }} viewBox="0 0 40 40">
                <path d="M 40 30 L 20 30 L 10 20 L 10 0" fill="none" stroke="#cfa448" strokeWidth="2" strokeLinecap="square" />
                <path d="M 15 25 L 23 25 L 23 17 L 15 17 Z" fill="none" stroke="#cfa448" strokeWidth="2" />
                <rect x="4" y="32" width="4" height="4" fill="#cfa448" />
              </svg>

              {/* Bottom-Right Corner */}
              <svg width="40" height="40" style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.6 }} viewBox="0 0 40 40">
                <path d="M 0 30 L 20 30 L 30 20 L 30 0" fill="none" stroke="#cfa448" strokeWidth="2" strokeLinecap="square" />
                <path d="M 25 25 L 17 25 L 17 17 L 25 17 Z" fill="none" stroke="#cfa448" strokeWidth="2" />
                <rect x="32" y="32" width="4" height="4" fill="#cfa448" />
              </svg>
            </div>
          
            {expandedId ? (() => {
              const activeJob = jobs.find(j => j.id === expandedId);
              return (
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  color: '#d2ab5c',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  width: '100%'
                }}>
                  <h3 style={{
                    fontSize: '2.5rem',
                    margin: 0,
                    textShadow: '2px 2px 0 #1c140a, -2px -2px 0 #1c140a, 2px -2px 0 #1c140a, -2px 2px 0 #1c140a, 0 4px 0 #1c140a',
                    lineHeight: 1.1,
                    letterSpacing: '0.05em'
                  }}>
                    {activeJob?.company}
                  </h3>
                  <div style={{
                    fontSize: '1.4rem',
                    opacity: 0.9,
                    textShadow: '2px 2px 0 #1c140a',
                    color: '#d2ab5c'
                  }}>
                    {activeJob?.title} <span style={{ opacity: 0.5, margin: '0 0.5rem' }}>|</span> {activeJob?.date}
                  </div>
                  <ul style={{
                    margin: '0.5rem 0 0 0',
                    paddingLeft: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    fontSize: '1.3rem',
                    fontFamily: 'monospace',
                    textShadow: '1px 1px 0 #1c140a',
                    color: '#a0aa96'
                  }}>
                    {activeJob?.bullets.map((bullet, idx) => (
                      <li key={idx} style={{ opacity: 0.95, lineHeight: 1.4 }}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              );
            })() : (
              <h2 style={{
                fontSize: '6.5rem',
                margin: '0',
                letterSpacing: '0.08em',
                fontWeight: 'normal',
                lineHeight: '1.25',
                position: 'relative',
                zIndex: 2,
                textShadow: `
                  3px 3px 0 #1c140a, -3px -3px 0 #1c140a, 3px -3px 0 #1c140a, -3px 3px 0 #1c140a,
                  0 6px 0 #1c140a,
                  0 0 16px rgba(255, 202, 40, 0.45)
                `,
                color: '#ffca28', // Brighter glowing amber gold
              }}>
                EXPERIENCE<br/>
                STATION
              </h2>
            )}
        </div>
      </div>
    </div>
  </div>

    {/* ── PLANKS CONTAINER ── */}
      <div style={{
        position: 'relative',
        width: '92%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        {jobs.map((job) => {
          const isExpanded = expandedId === job.id;
          return (
            <div key={job.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 5, marginBottom: '20px' }}>
              
              {/* The Plank itself (Pixelated border and corners) */}
              <button 
                onClick={() => toggleExpand(job.id)}
                style={{
                  width: '100%',
                  backgroundColor: '#303424', // Dusty olive
                  border: '8px solid #1c1e14', // Dark olive/black instead of brown
                  boxShadow: `
                    inset 4px 4px 0px 0px #4a5238, 
                    inset -4px -4px 0px 0px #1c1e14,
                    inset 8px 8px 0px 0px #1a1610,
                    inset -8px -8px 0px 0px #1a1610,
                    0 6px 0 0px #1a1610
                  `,
                  clipPath: `polygon(
                    0px 12px, 4px 12px, 4px 8px, 8px 8px, 8px 4px, 12px 4px, 12px 0px,
                    calc(100% - 12px) 0px, calc(100% - 12px) 4px, calc(100% - 8px) 4px, calc(100% - 8px) 8px, calc(100% - 4px) 8px, calc(100% - 4px) 12px, 100% 12px,
                    100% calc(100% - 12px), calc(100% - 4px) calc(100% - 12px), calc(100% - 4px) calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) calc(100% - 4px), calc(100% - 12px) calc(100% - 4px), calc(100% - 12px) 100%,
                    12px 100%, 12px calc(100% - 4px), 8px calc(100% - 4px), 8px calc(100% - 8px), 4px calc(100% - 8px), 4px calc(100% - 12px), 0px calc(100% - 12px)
                  )`,
                  padding: '1.2rem 2.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'none',
                  outline: 'none',
                  color: isExpanded ? '#fff' : '#d2ab5c',
                  fontFamily: 'inherit',
                  textShadow: `
                    2px 2px 0 #1c140a, -2px -2px 0 #1c140a, 2px -2px 0 #1c140a, -2px 2px 0 #1c140a,
                    0 3px 0 #1c140a
                  `,
                  transition: 'all 0.2s ease',
                  transform: isExpanded ? 'translateZ(20px) scale(1.02)' : 'translateZ(0)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#383e29'; // Slightly lighter on hover
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#303424';
                  e.currentTarget.style.color = isExpanded ? '#fff' : '#e6b964';
                }}
              >
                <div style={{ fontSize: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span>{job.id}.</span>
                  <span>{job.title}</span>
                </div>
                <div style={{ fontSize: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ opacity: 0.7 }}>|</span>
                  <span>{job.date}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
