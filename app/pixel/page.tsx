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
    { id: 7, bg: "/px7.png" },
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
                    filter: activeCategory === 'ctf' ? 'drop-shadow(0 0 10px rgba(93, 238, 255, 0.4))' : 'none',
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
                    filter: activeCategory === 'hackathon' ? 'drop-shadow(0 0 10px rgba(124, 255, 155, 0.4))' : 'none',
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

              {/* ── COMPETITIONS & HACKATHONS LOG PANEL ── */}
              <div style={{
                position: 'absolute',
                bottom: '10vh',
                right: '4vw',
                width: 'min(900px, 92vw)',
                maxHeight: '28vh',
                backgroundColor: 'rgba(10, 15, 35, 0.85)',
                border: `3px solid ${activeCategory === 'ctf' ? '#5deeff' : '#7cff9b'}`,
                borderRadius: '8px',
                padding: '1.2rem',
                fontFamily: 'var(--font-pixelify), monospace',
                fontSize: '0.85rem',
                color: '#f8f8f2',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: `0 0 15px ${activeCategory === 'ctf' ? 'rgba(93, 238, 255, 0.2)' : 'rgba(124, 255, 155, 0.2)'}`,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}>
                {/* Header */}
                <div style={{
                  borderBottom: `2px solid ${activeCategory === 'ctf' ? '#5deeff' : '#7cff9b'}`,
                  paddingBottom: '0.5rem',
                  marginBottom: '0.8rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-pixel), monospace',
                    fontSize: '11px',
                    color: '#ffd84d',
                    textShadow: '1px 1px 0 #000',
                  }}>
                    ❖ LOGS // {activeCategory === 'ctf' ? 'CTF_RECORD' : 'HACK_RECORD'}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#7cff9b', borderRadius: '50%' }} />
                    <span style={{ width: '6px', height: '6px', backgroundColor: '#ffd84d', borderRadius: '50%' }} />
                  </div>
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
                  {activeCategory === 'ctf' ? (
                    /* CTF Section */
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-pixel), monospace',
                        fontSize: '10px',
                        color: '#5deeff',
                        marginBottom: '0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <span>►</span> CTFs
                      </h4>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(345px, 1fr))', 
                        gap: '1rem 1.5rem',
                        marginTop: '0.4rem',
                      }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <strong style={{ color: '#ffd84d' }}>CyberSci Canada CTF</strong>
                            <span style={{ color: '#8da592', fontSize: '11px' }}>Nov 2025</span>
                          </div>
                          <p style={{ margin: '4px 0 0', color: '#f8f8f2', fontSize: '13px', lineHeight: '1.4' }}>
                            Earned an award from event sponsor Cineplex and represented Concordia University.
                          </p>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <strong style={{ color: '#ffd84d' }}>@hack 2025 CTF</strong>
                            <span style={{ color: '#8da592', fontSize: '11px' }}>Mar 2025</span>
                          </div>
                          <p style={{ margin: '4px 0 0', color: '#f8f8f2', fontSize: '13px', lineHeight: '1.4' }}>
                            Ranked 6th in Quebec’s largest CTF, exceeding 36 hours while competing against over 600 participants.
                          </p>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <strong style={{ color: '#ffd84d' }}>CS Games 2026</strong>
                            <span style={{ color: '#8da592', fontSize: '11px' }}>Mar 2026</span>
                          </div>
                          <p style={{ margin: '4px 0 0', color: '#f8f8f2', fontSize: '13px', lineHeight: '1.4' }}>
                            Won 3rd place in the CTF and represented Concordia University.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Hackathons Section */
                    <div>
                      <h4 style={{
                        fontFamily: 'var(--font-pixel), monospace',
                        fontSize: '10px',
                        color: '#7cff9b',
                        marginBottom: '0.6rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <span>►</span> HACKATHONS
                      </h4>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(345px, 1fr))', 
                        gap: '1rem 1.5rem',
                        marginTop: '0.4rem',
                      }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <strong style={{ color: '#ffd84d' }}>CS Games 2026</strong>
                            <span style={{ color: '#8da592', fontSize: '11px' }}>Mar 2026</span>
                          </div>
                          <p style={{ margin: '4px 0 0', color: '#f8f8f2', fontSize: '13px', lineHeight: '1.4' }}>
                            Won 1st place in the Web Challenge and 2nd place in AI, representing Concordia University.
                          </p>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <strong style={{ color: '#ffd84d' }}>ConUHacks X Hackathon</strong>
                            <span style={{ color: '#8da592', fontSize: '11px' }}>Jan 2026</span>
                          </div>
                          <p style={{ margin: '4px 0 0', color: '#f8f8f2', fontSize: '13px', lineHeight: '1.4' }}>
                            Participated in Quebec’s largest hackathon, exceeding 36 hours while competing against over 850 participants.
                          </p>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <strong style={{ color: '#ffd84d' }}>ConUHacks IX Hackathon</strong>
                            <span style={{ color: '#8da592', fontSize: '11px' }}>Feb 2025</span>
                          </div>
                          <p style={{ margin: '4px 0 0', color: '#f8f8f2', fontSize: '13px', lineHeight: '1.4' }}>
                            Participated in Quebec’s largest hackathon, exceeding 24 hours while competing against over 800 participants.
                          </p>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <strong style={{ color: '#ffd84d' }}>Hack the Mountain</strong>
                            <span style={{ color: '#8da592', fontSize: '11px' }}>May 2026</span>
                          </div>
                          <p style={{ margin: '4px 0 0', color: '#f8f8f2', fontSize: '13px', lineHeight: '1.4' }}>
                            Participated in a hackathon hosted by Polytechnique Montréal and Université de Montréal.
                          </p>
                        </div>

                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                            <strong style={{ color: '#ffd84d' }}>MPC Hacks</strong>
                            <span style={{ color: '#8da592', fontSize: '11px' }}>May 2026</span>
                          </div>
                          <p style={{ margin: '4px 0 0', color: '#f8f8f2', fontSize: '13px', lineHeight: '1.4' }}>
                            Participated in a hackathon hosted by Polytechnique Montréal, Concordia University, and McGill University.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                  .pixel-panel-scroll::-webkit-scrollbar {
                    width: 6px;
                  }
                  .pixel-panel-scroll::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                  }
                  .pixel-panel-scroll::-webkit-scrollbar-thumb {
                    background: ${activeCategory === 'ctf' ? '#5deeff' : '#7cff9b'};
                    border-radius: 3px;
                  }
                  .pixel-panel-scroll::-webkit-scrollbar-thumb:hover {
                    background: #ffd84d;
                  }
                ` }} />
              </div>
            </>
          )}

          {/* Section 7: Transition (px6-7) and New Layer (px7) */}
          {section.id === 7 && (
            <>
              {/* px6-7: Transition from section 6 (behind px7) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px6-7.png)',
                backgroundSize: '108%',
                backgroundPosition: 'center 360%',
                zIndex: -2
              }} />
              {/* px7: Base layer for section 7 */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/px7.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                zIndex: -1
              }} />
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
