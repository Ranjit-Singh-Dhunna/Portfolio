"use client";

import { useState } from 'react';
import { PromptingIsAllYouNeed } from "@/components/ui/animated-hero-section";
import TextRoll, { TextRollParagraph } from "@/components/ui/text-roll";


import ChangeArtstyleButton from "@/components/ui/change-artstyle-button";
import ExperienceBoard from "@/components/ui/experience-board";
import ProjectsLake from "@/components/ui/projects-lake";

export default function PixelPage() {
  const [activeCategory, setActiveCategory] = useState<'ctf' | 'hackathon'>('ctf');
  const sections = [
    { id: 0, bg: "/px1.png" },
    { id: 2, bg: "/px2.png" },
    { id: 3, bg: "/px3.png" },
    { id: 4, bg: "/px4.png" },
    { id: 5, bg: "/px5.png" },
    { id: 6, bg: "/px6.png" },
  ];

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#0f0', maxWidth: '100vw', overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 100 }}>
        <ChangeArtstyleButton />
      </div>

      {sections.map((section) => (
        <section 
          key={section.id}
          data-section-id={section.id}
          style={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'visible', 
            zIndex: section.id === 4 ? 6 : section.id,
            // Only apply standard background for sections > 7 (none in this list)
            ...(section.id > 7 ? {
              backgroundImage: `url(${section.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : {})
          }}
        >
          {/* Section 0: Hero Pong with Section 1's Background */}
          {section.id === 0 && (
            <>
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />
              <PromptingIsAllYouNeed />
            </>
          )}

          {/* Section 2: Brown Mountain Continued (px1-2) and Green Cliff (px2) */}
          {section.id === 2 && (
            <>
              {/* px1-2: Brown mountain continued at the junction (behind px2) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px1-2.png)',
                backgroundSize: '150%',
                backgroundPosition: 'center 100%',
                zIndex: -2
              }} />
              {/* px2: Green cliff at the bottom, placed over px1-2 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />

              {/* ── TEXT CONTENT OVERLAY ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                pointerEvents: 'none',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: 'auto auto',
                  gap: '4rem 3rem',
                  width: '100%',
                  maxWidth: '1100px',
                }}>

                  {/* ── MY JOURNEY (spans both columns) ── */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      <TextRoll
                        center
                        style={{
                          fontFamily: 'var(--font-pixelify), monospace',
                          fontSize: 'clamp(2rem, 5vw, 3rem)',
                          fontWeight: 'bold',
                          color: '#00ff41',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          WebkitTextStroke: '2px black',
                          textShadow: '2px 4px 0 #003300',
                        }}
                      >
                        MY JOURNEY
                      </TextRoll>
                    </div>
                    <TextRollParagraph
                      style={{
                        fontFamily: 'var(--font-pixelify), monospace',
                        fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                        fontWeight: 'bold',
                        color: '#e0fff0',
                        lineHeight: '2',
                        WebkitTextStroke: '1px black',
                        textShadow: '2px 2px 0 rgba(0,0,0,1)',
                      }}
                    >
                      My journey began in 4th grade when I discovered HTML & CSS, realizing a blank screen held endless possibilities. By 6th grade, I was solving algorithmic puzzles for fun, which naturally led me to master Java, JavaScript, Python, React, and Express. What started as childhood tinkering has evolved into a relentless drive to build impactful, full-stack products. Today, that same curiosity fuels my active participation in tech clubs, hackathons, and competitive programming, constantly pushing me to build things that matter.
                    </TextRollParagraph>
                  </div>

                </div>
              </div>
            </>
          )}

          {/* Section 3: Transition (px2-3) and New Layer (px3) */}
          {section.id === 3 && (
            <>
              {/* px2-3: Transition from section 2 (behind px3) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px2-3.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                transform: 'scaleX(-1)',
                zIndex: -2
              }} />
              {/* px3: Base layer for section 3 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px3.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />

              {/* ── EXPERIENCE BOARD OVERLAY ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'flex-start', // Lift the board up
                justifyContent: 'center',
                // We don't use pointerEvents: 'none' here because the board is interactive
              }}>
                <ExperienceBoard />
              </div>
            </>
          )}

          {/* Section 4: Transition (px3-4) and New Layer (px4) */}
          {section.id === 4 && (
            <>
              {/* px3-4: Transition from section 3 (behind px4) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px3-4.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                zIndex: -2
              }} />
              {/* px4: Base layer for section 4 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px4.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />

              {/* project-rock.png at the top left */}
              <img 
                src="/project-rock.png" 
                alt="Project Rock"
                style={{
                  position: 'absolute',
                  top: '5%',
                  left: '3%',
                  zIndex: 8,
                  maxWidth: '400px',
                  height: 'auto',
                  imageRendering: 'pixelated',
                  pointerEvents: 'none',
                  transform: 'rotate(5deg)',
                  transformOrigin: 'right center',
                }}
              />

              {/* ── SECTION TITLE ── */}
              <div style={{
                position: 'absolute',
                top: '6.7rem',
                left: '10%',
                zIndex: 15,
                pointerEvents: 'none',
                transform: 'rotate(-6deg)',
                transformOrigin: 'right center',
              }}>
                <span
                  style={{
                    fontFamily: 'var(--font-pixelify), monospace',
                    fontSize: 'clamp(1.05rem, 2.47vw, 1.52rem)',
                    fontWeight: 'bold',
                    color: '#5deeff',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    WebkitTextStroke: '1px black',
                    textShadow: '2px 2px 0 #003366',
                    display: 'inline-block',
                  }}
                >
                  Project Pool
                </span>
              </div>

              {/* ── PROJECTS LAKE OVERLAY ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <ProjectsLake />
              </div>
            </>
          )}

          {/* Section 5: Transition (px4-5) and New Layer (px5) */}
          {section.id === 5 && (
            <>
              {/* px4-5: Transition from section 4 (behind px5) */}
              <div style={{
                position: 'absolute',
                top: '-41vh',
                bottom: 0,
                left: '-4vw',
                right: 0,
                backgroundImage: 'url(/px4-5.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                filter: 'brightness(1.8)',
                zIndex: -2
              }} />
              {/* px5: Base layer for section 5 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px5.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />

              {/* ── ANIMATED RETRO HELICOPTER ── */}
              <div style={{
                position: 'absolute',
                width: '670px',
                height: '750px',
                zIndex: 4,
                pointerEvents: 'none',
                overflow: 'visible',
                filter: 'brightness(3.0)'
              }} className="heli-fly-container">
                <div className="heli-bob-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <img 
                    src="/he1-removebg-preview.png" 
                    alt="Helicopter Frame 1" 
                    className="heli-frame-1"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      imageRendering: 'pixelated'
                    }}
                  />
                  <img 
                    src="/he2-removebg-preview.png" 
                    alt="Helicopter Frame 2" 
                    className="heli-frame-2"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      imageRendering: 'pixelated',
                      transform: 'translateY(2.367%)'
                    }}
                  />
                </div>
              </div>

              {/* ── HELICOPTER KEYFRAME ANIMATIONS ── */}
              <style>{`
                @keyframes heliFly {
                  0% { left: 100vw; top: 15%; }
                  49.9% { left: -680px; top: 15%; animation-timing-function: step-end; }
                  50% { left: 100vw; top: 32%; }
                  99.9% { left: -680px; top: 32%; animation-timing-function: step-end; }
                  100% { left: 100vw; top: 15%; }
                }
                @keyframes heliBob {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-30px); }
                }
                @keyframes heliFrameToggle {
                  0%, 49.9% { opacity: 1; }
                  50%, 100% { opacity: 0; }
                }
                @keyframes heliFrameToggleInverse {
                  0%, 49.9% { opacity: 0; }
                  50%, 100% { opacity: 1; }
                }
                
                .heli-fly-container {
                  animation: heliFly 70s linear infinite;
                }
                .heli-bob-container {
                  animation: heliBob 18s ease-in-out infinite;
                }
                .heli-frame-1 {
                  animation: heliFrameToggle 0.38s steps(1) infinite;
                }
                .heli-frame-2 {
                  animation: heliFrameToggleInverse 0.38s steps(1) infinite;
                }
              `}</style>
            </>
          )}

          {/* Section 6: Base Layer for Section 6 */}
          {section.id === 6 && (
            <>
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px6.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />

              {/* ── CTF & HACK IMAGES OVERLAY ── */}
              <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'flex-start',
                paddingTop: '16vh',
                justifyContent: 'center',
                gap: '8%',
                paddingLeft: '2rem',
                paddingRight: '2rem',
                flexWrap: 'wrap',
              }}>
                {/* ctf.png Container */}
                <div 
                  onClick={() => setActiveCategory('ctf')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '250px',
                    transform: 'translate(45px, -180px)',
                    cursor: 'pointer',
                    opacity: 1,
                    transition: 'all 0.3s ease',
                    filter: activeCategory === 'ctf' ? 'drop-shadow(0 0 14px rgba(223, 182, 93, 0.8))' : 'none',
                  }}
                >
                  <img
                    src="/ctf.png"
                    alt="Capture The Flag"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '200px',
                      objectFit: 'contain',
                      imageRendering: 'pixelated',
                    }}
                  />
                </div>

                {/* hack.png Container */}
                <div 
                  onClick={() => setActiveCategory('hackathon')}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '220px',
                    cursor: 'pointer',
                    opacity: 1,
                    transition: 'all 0.3s ease',
                    filter: activeCategory === 'hackathon' ? 'drop-shadow(0 0 14px rgba(223, 182, 93, 0.8))' : 'none',
                  }}
                >
                  <img
                    src="/hack.png"
                    alt="Ethical Hacking"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '170px',
                      objectFit: 'contain',
                      imageRendering: 'pixelated',
                    }}
                  />
                </div>
              </div>

              {/* ── COMPETITIONS & HACKATHONS LOG PANEL (RETRO RPG QUEST JOURNAL THEME) ── */}
              <div style={{
                position: 'absolute',
                bottom: '8.5vh',
                right: '3vw',
                width: 'min(1200px, 94vw)',
                zIndex: 20,
                transition: 'all 0.3s ease',
                filter: 'drop-shadow(0 10px 24px rgba(0, 0, 0, 0.8))',
              }}>
                {/* Gold Bezel Panel Outer Frame */}
                <div style={{
                  backgroundColor: '#c89d4c', // Gilded gold border frame
                  padding: '3px',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease',
                  clipPath: `polygon(
                    0px 10px, 4px 10px, 4px 6px, 6px 6px, 6px 4px, 10px 4px, 10px 0px,
                    calc(100% - 10px) 0px, calc(100% - 10px) 4px, calc(100% - 6px) 4px, calc(100% - 6px) 6px, calc(100% - 4px) 6px, calc(100% - 4px) 10px, 100% 10px,
                    100% calc(100% - 10px), calc(100% - 4px) calc(100% - 10px), calc(100% - 4px) calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) calc(100% - 4px), calc(100% - 10px) calc(100% - 4px), calc(100% - 10px) 100%,
                    10px 100%, 10px calc(100% - 4px), 6px calc(100% - 4px), 6px calc(100% - 6px), 4px calc(100% - 6px), 4px calc(100% - 10px), 0px calc(100% - 10px)
                  )`,
                }}>
                  {/* Slate Screen Inner Body */}
                  <div style={{
                    backgroundColor: 'rgba(20, 26, 35, 0.93)', // Semi-translucent dark slate
                    boxShadow: `
                      inset 3px 3px 0 0 #5a421b,
                      inset -3px -3px 0 0 #181d26
                    `,
                    clipPath: `polygon(
                      0px 10px, 4px 10px, 4px 6px, 6px 6px, 6px 4px, 10px 4px, 10px 0px,
                      calc(100% - 10px) 0px, calc(100% - 10px) 4px, calc(100% - 6px) 4px, calc(100% - 6px) 6px, calc(100% - 4px) 6px, calc(100% - 4px) 10px, 100% 10px,
                      100% calc(100% - 10px), calc(100% - 4px) calc(100% - 10px), calc(100% - 4px) calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) calc(100% - 4px), calc(100% - 10px) calc(100% - 4px), calc(100% - 10px) 100%,
                      10px 100%, 10px calc(100% - 4px), 6px calc(100% - 4px), 6px calc(100% - 6px), 4px calc(100% - 6px), 4px calc(100% - 10px), 0px calc(100% - 10px)
                    )`,
                    padding: '1.1rem 1.4rem',
                    maxHeight: '45vh',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    fontFamily: 'var(--font-pixelify), monospace',
                    fontSize: '0.85rem',
                    color: '#f4ebd0',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                  }}>
                    {/* Header */}
                    <div style={{
                      borderBottom: '2px solid #5a421b',
                      paddingBottom: '0.5rem',
                      marginBottom: '0.8rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-pixel), monospace',
                        fontSize: '11px',
                        color: '#dfb65d', // Gilded Gold Title
                        textShadow: '2px 2px 0 #181d26',
                        letterSpacing: '1.5px',
                      }}>
                        {activeCategory === 'ctf' ? '🏆 CTF QUEST LOG' : '🏆 HACKATHON QUEST LOG'}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-pixelify), monospace',
                        fontSize: '10px',
                        color: '#8e7a63', // Soft warm brown/tan
                        fontWeight: 'bold',
                      }}>
                        ❖ ADVENTURER JOURNAL
                      </span>
                    </div>

                    {/* Content Container (Scrollable) */}
                    <div 
                      style={{
                        flex: 1,
                        overflowY: 'auto',
                        paddingRight: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      className="pixel-panel-scroll"
                    >
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(345px, 1fr))', 
                        gap: '0.8rem 2.5rem',
                        marginTop: '0.2rem',
                        paddingRight: '4px',
                        paddingBottom: '4px',
                      }}>
                        {activeCategory === 'ctf' ? (
                          /* CTFs */
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                                <span style={{ color: '#dfb65d', marginRight: '8px', fontSize: '12px', width: '18px', textAlign: 'center', display: 'inline-block', flexShrink: 0 }}>✦</span>
                                <strong style={{ color: '#eedfb8', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>CyberSci Canada CTF</strong>
                                <span style={{ flex: 1, borderBottom: '1px dashed #5a421b', margin: '0 8px', position: 'relative', top: '-3px' }}></span>
                                <span style={{ color: '#a68a67', fontSize: '13px', fontFamily: 'var(--font-desktop), monospace', whiteSpace: 'nowrap' }}>Nov 2025</span>
                              </div>
                              <p style={{ margin: '3px 0 0 26px', color: '#b8c0af', fontSize: '13px', lineHeight: '1.45' }}>
                                Earned an award{' '}
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-1px', imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}>
                                  <rect x="5" y="2" width="2" height="2" fill="#ffd84d" />
                                  <rect x="9" y="2" width="2" height="2" fill="#ffd84d" />
                                  <rect x="7" y="3" width="2" height="2" fill="#dfb65d" />
                                  <rect x="2" y="5" width="12" height="3" fill="#d01010" />
                                  <rect x="7" y="5" width="2" height="3" fill="#ffd84d" />
                                  <rect x="3" y="8" width="10" height="7" fill="#a00808" />
                                  <rect x="7" y="8" width="2" height="7" fill="#ffd84d" />
                                  <rect x="2" y="5" width="1" height="3" fill="#500000" />
                                  <rect x="13" y="5" width="1" height="3" fill="#500000" />
                                  <rect x="3" y="14" width="10" height="1" fill="#500000" />
                                </svg>{' '}
                                from event sponsor Cineplex and represented Concordia University.
                              </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                                <span style={{ color: '#dfb65d', marginRight: '8px', fontSize: '12px', width: '18px', textAlign: 'center', display: 'inline-block', flexShrink: 0 }}>✦</span>
                                <strong style={{ color: '#eedfb8', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>@hack <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '14px', fontWeight: 'normal' }}>2025</span> CTF</strong>
                                <span style={{ flex: 1, borderBottom: '1px dashed #5a421b', margin: '0 8px', position: 'relative', top: '-3px' }}></span>
                                <span style={{ color: '#a68a67', fontSize: '13px', fontFamily: 'var(--font-desktop), monospace', whiteSpace: 'nowrap' }}>Mar 2025</span>
                              </div>
                              <p style={{ margin: '3px 0 0 26px', color: '#b8c0af', fontSize: '13px', lineHeight: '1.45' }}>
                                Ranked <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>6th</span>{' '}
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-1px', imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}>
                                  <rect x="6" y="4" width="4" height="11" fill="#94a3b8" />
                                  <rect x="7" y="4" width="2" height="11" fill="#cbd5e1" />
                                  <rect x="2" y="7" width="4" height="8" fill="#64748b" />
                                  <rect x="3" y="7" width="2" height="8" fill="#94a3b8" />
                                  <rect x="10" y="9" width="4" height="6" fill="#475569" />
                                  <rect x="11" y="9" width="2" height="6" fill="#64748b" />
                                  <rect x="1" y="14" width="14" height="1" fill="#1e293b" />
                                </svg>{' '}
                                in Quebec’s largest CTF, exceeding <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>36</span> hours while competing against over <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>600</span> participants.
                              </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                                <span style={{ color: '#dfb65d', marginRight: '8px', fontSize: '12px', width: '18px', textAlign: 'center', display: 'inline-block', flexShrink: 0 }}>✦</span>
                                <strong style={{ color: '#eedfb8', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>CS Games <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '14px', fontWeight: 'normal' }}>2026</span></strong>
                                <span style={{ flex: 1, borderBottom: '1px dashed #5a421b', margin: '0 8px', position: 'relative', top: '-3px' }}></span>
                                <span style={{ color: '#a68a67', fontSize: '13px', fontFamily: 'var(--font-desktop), monospace', whiteSpace: 'nowrap' }}>Mar 2026</span>
                              </div>
                              <p style={{ margin: '3px 0 0 26px', color: '#b8c0af', fontSize: '13px', lineHeight: '1.45' }}>
                                Won <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>3rd</span> place{' '}
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-1px', imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}>
                                  <rect x="4" y="1" width="3" height="5" fill="#d01010" />
                                  <rect x="9" y="1" width="3" height="5" fill="#1010d0" />
                                  <rect x="7" y="3" width="2" height="3" fill="#b45309" />
                                  <rect x="3" y="7" width="10" height="8" fill="#78350f" />
                                  <rect x="4" y="8" width="8" height="6" fill="#b45309" />
                                  <rect x="3" y="7" width="1" height="1" fill="#451a03" />
                                  <rect x="12" y="7" width="1" height="1" fill="#451a03" />
                                  <rect x="3" y="14" width="1" height="1" fill="#451a03" />
                                  <rect x="12" y="14" width="1" height="1" fill="#451a03" />
                                  <rect x="7" y="9" width="2" height="4" fill="#ffffff" />
                                  <rect x="6" y="10" width="4" height="2" fill="#ffffff" />
                                </svg>{' '}
                                in the CTF and represented Concordia University.
                              </p>
                            </div>
                          </>
                        ) : (
                          /* Hackathons */
                          <>
                            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                                <span style={{ color: '#dfb65d', marginRight: '8px', fontSize: '12px', width: '18px', textAlign: 'center', display: 'inline-block', flexShrink: 0 }}>✦</span>
                                <strong style={{ color: '#eedfb8', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>CS Games <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '14px', fontWeight: 'normal' }}>2026</span></strong>
                                <span style={{ flex: 1, borderBottom: '1px dashed #5a421b', margin: '0 8px', position: 'relative', top: '-3px' }}></span>
                                <span style={{ color: '#a68a67', fontSize: '13px', fontFamily: 'var(--font-desktop), monospace', whiteSpace: 'nowrap' }}>Mar 2026</span>
                              </div>
                              <p style={{ margin: '3px 0 0 26px', color: '#b8c0af', fontSize: '13px', lineHeight: '1.45' }}>
                                Won <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>1st</span> place{' '}
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-1px', imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}>
                                  <rect x="4" y="1" width="3" height="5" fill="#d01010" />
                                  <rect x="9" y="1" width="3" height="5" fill="#1010d0" />
                                  <rect x="7" y="3" width="2" height="3" fill="#dfb65d" />
                                  <rect x="3" y="7" width="10" height="8" fill="#a97c2c" />
                                  <rect x="4" y="8" width="8" height="6" fill="#ffd84d" />
                                  <rect x="3" y="7" width="1" height="1" fill="#201a0e" />
                                  <rect x="12" y="7" width="1" height="1" fill="#201a0e" />
                                  <rect x="3" y="14" width="1" height="1" fill="#201a0e" />
                                  <rect x="12" y="14" width="1" height="1" fill="#201a0e" />
                                  <rect x="7" y="9" width="2" height="4" fill="#ffffff" />
                                  <rect x="6" y="10" width="4" height="2" fill="#ffffff" />
                                </svg>{' '}
                                in the Web Challenge and <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>2nd</span> place{' '}
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-1px', imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}>
                                  <rect x="4" y="1" width="3" height="5" fill="#d01010" />
                                  <rect x="9" y="1" width="3" height="5" fill="#1010d0" />
                                  <rect x="7" y="3" width="2" height="3" fill="#cbd5e1" />
                                  <rect x="3" y="7" width="10" height="8" fill="#64748b" />
                                  <rect x="4" y="8" width="8" height="6" fill="#cbd5e1" />
                                  <rect x="3" y="7" width="1" height="1" fill="#1e293b" />
                                  <rect x="12" y="7" width="1" height="1" fill="#1e293b" />
                                  <rect x="3" y="14" width="1" height="1" fill="#1e293b" />
                                  <rect x="12" y="14" width="1" height="1" fill="#1e293b" />
                                  <rect x="7" y="9" width="2" height="4" fill="#ffffff" />
                                  <rect x="6" y="10" width="4" height="2" fill="#ffffff" />
                                </svg>{' '}
                                in AI, representing Concordia University.
                              </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                                <span style={{ color: '#dfb65d', marginRight: '8px', fontSize: '12px', width: '18px', textAlign: 'center', display: 'inline-block', flexShrink: 0 }}>✦</span>
                                <strong style={{ color: '#eedfb8', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>ConUHacks X Hackathon</strong>
                                <span style={{ flex: 1, borderBottom: '1px dashed #5a421b', margin: '0 8px', position: 'relative', top: '-3px' }}></span>
                                <span style={{ color: '#a68a67', fontSize: '13px', fontFamily: 'var(--font-desktop), monospace', whiteSpace: 'nowrap' }}>Jan 2026</span>
                              </div>
                              <p style={{ margin: '3px 0 0 26px', color: '#b8c0af', fontSize: '13px', lineHeight: '1.45' }}>
                                Participated in Quebec’s largest hackathon, exceeding <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>36</span> hours while competing against over <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>850</span> participants.
                              </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                                <span style={{ color: '#dfb65d', marginRight: '8px', fontSize: '12px', width: '18px', textAlign: 'center', display: 'inline-block', flexShrink: 0 }}>✦</span>
                                <strong style={{ color: '#eedfb8', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>ConUHacks IX Hackathon</strong>
                                <span style={{ flex: 1, borderBottom: '1px dashed #5a421b', margin: '0 8px', position: 'relative', top: '-3px' }}></span>
                                <span style={{ color: '#a68a67', fontSize: '13px', fontFamily: 'var(--font-desktop), monospace', whiteSpace: 'nowrap' }}>Feb 2025</span>
                              </div>
                              <p style={{ margin: '3px 0 0 26px', color: '#b8c0af', fontSize: '13px', lineHeight: '1.45' }}>
                                Participated in Quebec’s largest hackathon, exceeding <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>24</span> hours while competing against over <span style={{ fontFamily: 'var(--font-desktop), monospace', fontSize: '15px', color: '#eedfb8' }}>800</span> participants.
                              </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                                <span style={{ color: '#dfb65d', marginRight: '8px', fontSize: '12px', width: '18px', textAlign: 'center', display: 'inline-block', flexShrink: 0 }}>✦</span>
                                <strong style={{ color: '#eedfb8', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>Hack the Mountain</strong>
                                <span style={{ flex: 1, borderBottom: '1px dashed #5a421b', margin: '0 8px', position: 'relative', top: '-3px' }}></span>
                                <span style={{ color: '#a68a67', fontSize: '13px', fontFamily: 'var(--font-desktop), monospace', whiteSpace: 'nowrap' }}>May 2026</span>
                              </div>
                              <p style={{ margin: '3px 0 0 26px', color: '#b8c0af', fontSize: '13px', lineHeight: '1.45' }}>
                                Participated in a hackathon hosted by Polytechnique Montréal and Université de Montréal.
                              </p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'baseline', width: '100%' }}>
                                <span style={{ color: '#dfb65d', marginRight: '8px', fontSize: '12px', width: '18px', textAlign: 'center', display: 'inline-block', flexShrink: 0 }}>✦</span>
                                <strong style={{ color: '#eedfb8', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>MPC Hacks</strong>
                                <span style={{ flex: 1, borderBottom: '1px dashed #5a421b', margin: '0 8px', position: 'relative', top: '-3px' }}></span>
                                <span style={{ color: '#a68a67', fontSize: '13px', fontFamily: 'var(--font-desktop), monospace', whiteSpace: 'nowrap' }}>May 2026</span>
                              </div>
                              <p style={{ margin: '3px 0 0 26px', color: '#b8c0af', fontSize: '13px', lineHeight: '1.45' }}>
                                Participated in a hackathon hosted by Polytechnique Montréal, Concordia University, and McGill University.
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <style dangerouslySetInnerHTML={{ __html: `
                      .pixel-panel-scroll::-webkit-scrollbar {
                        width: 8px;
                      }
                      .pixel-panel-scroll::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.25);
                        border-radius: 4px;
                      }
                      .pixel-panel-scroll::-webkit-scrollbar-thumb {
                        background: #5a421b;
                        border-radius: 4px;
                      }
                      .pixel-panel-scroll::-webkit-scrollbar-thumb:hover {
                        background: #dfb65d;
                      }
                    ` }} />
                  </div>
                </div>
              </div>
            </>
          )}


          {/* Dull Overlay Layer over all images in the section */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.58)', // Duller layer
            zIndex: 5,
            pointerEvents: 'none'
          }} />
        </section>
      ))}
    </div>
  );
}
