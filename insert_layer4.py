import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# 1. Update hotzones: {currentSpread < 4  -> {currentSpread < 5
content = re.sub(r'\{currentSpread < 4 && bookOpen && \(', r'{currentSpread < 5 && bookOpen && (', content)

# 2. Extract current Page 8 content to put in Layer 4
page8_match = re.search(r'(<div className="journal-content" style={{ height: \'100%\', display: \'flex\', flexDirection: \'column\' }}>.*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
if page8_match:
    page8_inner = page8_match.group(1)
else:
    print("Could not find Page 8")
    exit(1)

# Remove the 'Close Bookmark' footer from page8_inner since it belongs on Page 10 (Base Right) now
# The footer starts with <div style={{ flex: 1 }} />\n                  <div className="open-book-footer"
page8_inner = re.sub(r'<div style={{ flex: 1 }} />\s*<div className="open-book-footer".*?</button>\s*</div>', '', page8_inner, flags=re.DOTALL)

# Also update the title color on Page 7 and Page 8 to #c2410c
content = content.replace("<span style={{ color: '#7c2d12' }}>Competitions & Events</span>", "<span style={{ color: '#c2410c' }}>Competitions & Events</span>")
page8_inner = page8_inner.replace("<span style={{ color: '#7c2d12' }}>Competitions & Events</span>", "<span style={{ color: '#c2410c' }}>Competitions & Events</span>")

# Create Layer 4 HTML
layer4_html = f"""              {{/* ── 3D TURNING PAGE LAYER 4 (Pages 8 & 9) ── */}}
              <motion.div
                className="turning-page-layer"
                initial={{false}}
                animate={{{{ 
                  rotateY: currentSpread > 4
                    ? (bookOpen && currentSpread === 5 && hoverFlipLeft ? -170 : -180)
                    : (bookOpen && currentSpread === 4 && hoverFlipRight ? -10 : 0),
                  ...(currentSpread > 4 ? {{ transitionEnd: {{ zIndex: 34 }} }} : {{ zIndex: 36 }})
                }}}}
                transition={{{{ duration: 0.6, ease: "easeInOut", zIndex: {{ duration: 0 }} }}}}
                style={{{{
                  position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
                  transformOrigin: 'left center', transformStyle: 'preserve-3d', pointerEvents: 'none'
                }}}}
              >
                {{/* FRONT FACE (Page 8) */}}
                <div style={{{{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '0 12px 12px 0', overflow: 'hidden', boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.05)', padding: '24px', paddingLeft: '32px', pointerEvents: 'auto' }}}}>
                  {page8_inner}
                </div>
                {{/* BACK FACE (Page 9) */}}
                <div style={{{{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f5ee', borderRadius: '12px 0 0 12px', overflow: 'hidden', transform: 'rotateY(180deg)', boxShadow: 'inset -4px 0 10px rgba(0,0,0,0.05)', padding: '24px', pointerEvents: 'auto' }}}}>
                  <div className="journal-content" style={{{{ height: '100%', display: 'flex', flexDirection: 'column' }}}}>
                    <h2 className="journal-header"><span style={{{{ color: '#0f766e' }}}}>The Arsenal</span><span className="journal-page-num">Page 9</span></h2>
                    
                    <div style={{{{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}}}>
                      <p style={{{{ fontSize: '11px', lineHeight: '1.5', color: '#4b5563', fontStyle: 'italic' }}}}>
                        "A craftsman is only as good as their tools, but an engineer is defined by how they adapt them."
                      </p>
                      
                      <div style={{{{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}}}>
                        <div style={{{{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}}}>
                          <h4 style={{{{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}}}>Frontend</h4>
                          <p style={{{{ fontSize: '10px', color: '#6b7280' }}}}>React, Next.js, Tailwind, Framer Motion, Three.js</p>
                        </div>
                        <div style={{{{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}}}>
                          <h4 style={{{{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}}}>Backend</h4>
                          <p style={{{{ fontSize: '10px', color: '#6b7280' }}}}>Python, Node, Express, FastAPI, Django, PostgreSQL</p>
                        </div>
                        <div style={{{{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}}}>
                          <h4 style={{{{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}}}>Applied AI</h4>
                          <p style={{{{ fontSize: '10px', color: '#6b7280' }}}}>PyTorch, LangChain, OpenCV, Ollama, Whisper</p>
                        </div>
                        <div style={{{{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}}}>
                          <h4 style={{{{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}}}>Cloud & Ops</h4>
                          <p style={{{{ fontSize: '10px', color: '#6b7280' }}}}>Docker, AWS, Vercel, Supabase, Git, Linux</p>
                        </div>
                      </div>

                      <div style={{{{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dashed #d1d5db' }}}}>
                        <p style={{{{ fontSize: '11px', lineHeight: '1.5', color: '#4b5563' }}}}>
                          I believe in blending rigorous engineering with delightful user experiences. Whether it's training a neural network or polishing a micro-interaction, every detail matters.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
"""

# New Base Right (Page 10)
page10_html = """<div className="journal-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  
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
                      setCurrentSpread(1); 
                      setTimeout(() => setBookOpen(false), 600); 
                    }} className="close-bookmark-btn">
                      <span>Close Bookmark</span>
                      <span className="close-bookmark-ribbon" />
                    </button>
                  </div>
                </div>"""

# Replace Base Right inner content with Page 10
content = re.sub(r'<div className="journal-content" style={{ height: \'100%\', display: \'flex\', flexDirection: \'column\' }}>.*?</div>\s*</div>\s*</div>\s*\{/\* ── 3D TURNING PAGE LAYER 3', page10_html + '\n              </div>\n\n' + layer4_html + '\n              {/* ── 3D TURNING PAGE LAYER 3', content, flags=re.DOTALL)


with open('app/book/page.tsx', 'w') as f:
    f.write(content)
