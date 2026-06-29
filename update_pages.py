import re

with open('app/book/page.tsx', 'r') as f:
    content = f.read()

# 1. Update Page 10 button
old_button = r"""                    <button onClick={(e) => { 
                      e.stopPropagation(); 
                      setCurrentSpread(1); 
                      setTimeout(() => setBookOpen(false), 600); 
                    }} className="close-bookmark-btn">
                      <span>Close Bookmark</span>
                      <span className="close-bookmark-ribbon" />
                    </button>"""
new_button = r"""                    <button onClick={(e) => { 
                      e.stopPropagation(); 
                      setStamps([]); 
                    }} className="close-bookmark-btn" style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '4px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', color: '#4b5563', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                      <span>Clear Stamps</span>
                    </button>"""
content = content.replace(old_button, new_button)

# 2. Update Page 9 title and content
old_page9 = r"""                    <h2 className="journal-header"><span style={{ color: '#0f766e' }}>The Arsenal</span><span className="journal-page-num">Page 9</span></h2>
                    
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#4b5563', fontStyle: 'italic' }}>
                        "A craftsman is only as good as their tools, but an engineer is defined by how they adapt them."
                      </p>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                          <h4 style={{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}>Frontend</h4>
                          <p style={{ fontSize: '10px', color: '#6b7280' }}>React, Next.js, Tailwind, Framer Motion, Three.js</p>
                        </div>
                        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                          <h4 style={{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}>Backend</h4>
                          <p style={{ fontSize: '10px', color: '#6b7280' }}>Python, Node, Express, FastAPI, Django, PostgreSQL</p>
                        </div>
                        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                          <h4 style={{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}>Applied AI</h4>
                          <p style={{ fontSize: '10px', color: '#6b7280' }}>PyTorch, LangChain, OpenCV, Ollama, Whisper</p>
                        </div>
                        <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                          <h4 style={{ fontSize: '12px', color: '#111827', marginBottom: '4px' }}>Cloud & Ops</h4>
                          <p style={{ fontSize: '10px', color: '#6b7280' }}>Docker, AWS, Vercel, Supabase, Git, Linux</p>
                        </div>
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dashed #d1d5db' }}>
                        <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#4b5563' }}>
                          I believe in blending rigorous engineering with delightful user experiences. Whether it's training a neural network or polishing a micro-interaction, every detail matters.
                        </p>
                      </div>
                    </div>"""
new_page9 = r"""                    <h2 className="journal-header"><span style={{ color: '#0f766e' }}>Philosophy</span><span className="journal-page-num">Page 9</span></h2>
                    
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#4b5563', fontStyle: 'italic', paddingLeft: '8px', borderLeft: '2px solid #0f766e' }}>
                        "A craftsman is only as good as their tools, but an engineer is defined by how they adapt them."
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                          <h4 style={{ fontSize: '10px', color: '#0f766e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Frontend</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {['React', 'Next.js', 'Tailwind', 'Framer Motion', 'Three.js'].map(t => (
                              <span key={t} style={{ backgroundColor: '#ccfbf1', color: '#115e59', padding: '4px 8px', borderRadius: '100px', fontSize: '9px', fontWeight: '600' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 style={{ fontSize: '10px', color: '#0f766e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Backend</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {['Python', 'Node', 'Express', 'FastAPI', 'Django', 'PostgreSQL'].map(t => (
                              <span key={t} style={{ backgroundColor: '#ccfbf1', color: '#115e59', padding: '4px 8px', borderRadius: '100px', fontSize: '9px', fontWeight: '600' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 style={{ fontSize: '10px', color: '#0f766e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Applied AI</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {['PyTorch', 'LangChain', 'OpenCV', 'Ollama', 'Whisper'].map(t => (
                              <span key={t} style={{ backgroundColor: '#ccfbf1', color: '#115e59', padding: '4px 8px', borderRadius: '100px', fontSize: '9px', fontWeight: '600' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 style={{ fontSize: '10px', color: '#0f766e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>Cloud & Ops</h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {['Docker', 'AWS', 'Vercel', 'Supabase', 'Git', 'Linux'].map(t => (
                              <span key={t} style={{ backgroundColor: '#ccfbf1', color: '#115e59', padding: '4px 8px', borderRadius: '100px', fontSize: '9px', fontWeight: '600' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px dashed #d1d5db' }}>
                        <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#4b5563' }}>
                          I believe in blending rigorous engineering with delightful user experiences. Whether it's training a neural network or polishing a micro-interaction, every detail matters.
                        </p>
                      </div>
                    </div>"""
content = content.replace(old_page9, new_page9)

# 3. Update right hotzone
old_right_hotzone = r"""              {currentSpread < 5 && bookOpen && (
                <div 
                  style={{ position: 'absolute', right: 0, top: 0, width: '20%', height: '100%', zIndex: 60, cursor: 'pointer' }}
                  onMouseEnter={() => setHoverFlipRight(true)}
                  onMouseLeave={() => setHoverFlipRight(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoverFlipRight(false);
                    setCurrentSpread(currentSpread + 1);
                  }}
                />
              )}"""
new_right_hotzone = r"""              {bookOpen && (
                <div 
                  style={{ position: 'absolute', right: 0, top: 0, width: '20%', height: '100%', zIndex: 60, cursor: 'pointer' }}
                  onMouseEnter={() => { if (currentSpread < 5) setHoverFlipRight(true); }}
                  onMouseLeave={() => setHoverFlipRight(false)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHoverFlipRight(false);
                    if (currentSpread < 5) {
                      setCurrentSpread(currentSpread + 1);
                    } else {
                      setCurrentSpread(1); 
                      setTimeout(() => setBookOpen(false), 600);
                    }
                  }}
                />
              )}"""
content = content.replace(old_right_hotzone, new_right_hotzone)

with open('app/book/page.tsx', 'w') as f:
    f.write(content)

